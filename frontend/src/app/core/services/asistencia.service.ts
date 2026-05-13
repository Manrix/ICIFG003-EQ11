import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import type {
  RegistroAsistencia,
  RegistroAsistenciaCreate,
  BatchRegistroAsistenciaRequest,
  BatchRegistroAsistenciaResponse,
} from '../../shared/models/asistencia.model';
import { MOCK_REGISTROS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  private readonly http = inject(HttpClient);

  private readonly _registros = signal<RegistroAsistencia[]>([]);
  readonly registros = this._registros.asReadonly();

  private readonly _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  loadRegistros(cursoId: number, fecha: string): void {
    this._isLoading.set(true);
    this.fetchRegistros(cursoId, fecha).subscribe({
      next: (data) => {
        this._registros.set(data);
        this._isLoading.set(false);
      },
      error: () => {
        this._isLoading.set(false);
      },
    });
  }

  loadRegistrosByAlumno(alumnoId: number): void {
    this._isLoading.set(true);
    this.fetchRegistrosByAlumno(alumnoId).subscribe({
      next: (data) => {
        this._registros.set(data);
        this._isLoading.set(false);
      },
      error: () => {
        this._isLoading.set(false);
      },
    });
  }

  saveRegistro(
    registro: RegistroAsistenciaCreate | RegistroAsistencia,
  ): Observable<RegistroAsistencia> {
    const existing = this._registros().find(
      (r) => r.alumnoId === registro.alumnoId && r.fecha === registro.fecha,
    );
    if (existing) {
      return this.updateRegistro(existing.id, registro);
    }
    return this.createRegistro(registro);
  }

  saveRegistrosBatch(
    batch: BatchRegistroAsistenciaRequest,
  ): Observable<BatchRegistroAsistenciaResponse> {
    if (environment.useMockData) {
      const saved: RegistroAsistencia[] = batch.registros.map((r) => ({
        ...r,
        id: Date.now() + Math.floor(Math.random() * 1000),
      }));
      return of({ savedRecords: saved, totalSaved: saved.length }).pipe(
        delay(300),
        tap((response) => {
          this._registros.update((list) => {
            const filtered = list.filter(
              (l) => !response.savedRecords.some((s) => s.alumnoId === l.alumnoId && s.fecha === l.fecha),
            );
            return [...filtered, ...response.savedRecords];
          });
        }),
      );
    }
    return this.http
      .post<BatchRegistroAsistenciaResponse>(`${environment.apiUrl}/registros/batch`, batch)
      .pipe(
        tap((response) => {
          this._registros.update((list) => {
            const filtered = list.filter(
              (l) => !response.savedRecords.some((s) => s.alumnoId === l.alumnoId && s.fecha === l.fecha),
            );
            return [...filtered, ...response.savedRecords];
          });
        }),
      );
  }

  deleteRegistro(id: number): Observable<void> {
    if (environment.useMockData) {
      return of(undefined).pipe(
        delay(300),
        tap(() => this._registros.update((list) => list.filter((r) => r.id !== id))),
      );
    }
    return this.http
      .delete<void>(`${environment.apiUrl}/registros/${id}`)
      .pipe(tap(() => this._registros.update((list) => list.filter((r) => r.id !== id))));
  }

  private createRegistro(registro: RegistroAsistenciaCreate): Observable<RegistroAsistencia> {
    if (environment.useMockData) {
      const nuevo: RegistroAsistencia = { ...registro, id: Date.now() };
      return of(nuevo).pipe(
        delay(300),
        tap((r) => this._registros.update((list) => [...list, r])),
      );
    }
    return this.http
      .post<RegistroAsistencia>(`${environment.apiUrl}/registros`, registro)
      .pipe(tap((r) => this._registros.update((list) => [...list, r])));
  }

  private updateRegistro(
    id: number,
    registro: RegistroAsistenciaCreate | RegistroAsistencia,
  ): Observable<RegistroAsistencia> {
    if (environment.useMockData) {
      const actualizado: RegistroAsistencia = { ...(registro as RegistroAsistencia), id };
      return of(actualizado).pipe(
        delay(300),
        tap((r) => this._registros.update((list) => list.map((x) => (x.id === id ? r : x)))),
      );
    }
    return this.http
      .put<RegistroAsistencia>(`${environment.apiUrl}/registros/${id}`, registro)
      .pipe(tap((r) => this._registros.update((list) => list.map((x) => (x.id === id ? r : x)))));
  }

  private fetchRegistros(cursoId: number, fecha: string): Observable<RegistroAsistencia[]> {
    if (environment.useMockData) {
      const data = MOCK_REGISTROS.filter((r) => r.cursoId === cursoId && r.fecha === fecha);
      return of([...data]).pipe(delay(300));
    }
    return this.http.get<RegistroAsistencia[]>(
      `${environment.apiUrl}/registros?cursoId=${cursoId}&fecha=${fecha}`,
    );
  }

  private fetchRegistrosByAlumno(alumnoId: number): Observable<RegistroAsistencia[]> {
    if (environment.useMockData) {
      const data = MOCK_REGISTROS.filter((r) => r.alumnoId === alumnoId);
      return of([...data]).pipe(delay(300));
    }
    return this.http.get<RegistroAsistencia[]>(
      `${environment.apiUrl}/registros?alumnoId=${alumnoId}`,
    );
  }
}
