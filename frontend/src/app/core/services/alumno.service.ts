import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import type { Alumno, AlumnoCreate } from '../../shared/models/alumno.model';
import { MOCK_ALUMNOS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class AlumnoService {
  private readonly http = inject(HttpClient);

  private readonly _alumnos = signal<Alumno[]>([]);
  readonly alumnos = this._alumnos.asReadonly();

  private readonly _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  loadAlumnos(cursoId?: number): void {
    this._isLoading.set(true);
    this.fetchAlumnos(cursoId).subscribe({
      next: (data) => {
        this._alumnos.set(data);
        this._isLoading.set(false);
      },
      error: () => {
        this._isLoading.set(false);
      },
    });
  }

  createAlumno(alumno: AlumnoCreate): Observable<Alumno> {
    if (environment.useMockData) {
      const nuevo: Alumno = { ...alumno, id: Date.now() };
      return of(nuevo).pipe(
        delay(300),
        tap((a) => this._alumnos.update((list) => [...list, a])),
      );
    }
    return this.http
      .post<Alumno>(`${environment.apiUrl}/alumnos`, alumno)
      .pipe(tap((a) => this._alumnos.update((list) => [...list, a])));
  }

  updateAlumno(id: number, alumno: AlumnoCreate): Observable<Alumno> {
    if (environment.useMockData) {
      const actualizado: Alumno = { ...alumno, id };
      return of(actualizado).pipe(
        delay(300),
        tap((a) => this._alumnos.update((list) => list.map((x) => (x.id === id ? a : x)))),
      );
    }
    return this.http
      .put<Alumno>(`${environment.apiUrl}/alumnos/${id}`, alumno)
      .pipe(tap((a) => this._alumnos.update((list) => list.map((x) => (x.id === id ? a : x)))));
  }

  deleteAlumno(id: number): Observable<void> {
    if (environment.useMockData) {
      return of(undefined).pipe(
        delay(300),
        tap(() => this._alumnos.update((list) => list.filter((x) => x.id !== id))),
      );
    }
    return this.http
      .delete<void>(`${environment.apiUrl}/alumnos/${id}`)
      .pipe(tap(() => this._alumnos.update((list) => list.filter((x) => x.id !== id))));
  }

  private fetchAlumnos(cursoId?: number): Observable<Alumno[]> {
    if (environment.useMockData) {
      let data = [...MOCK_ALUMNOS];
      if (cursoId !== undefined) {
        data = data.filter((a) => a.cursoId === cursoId);
      }
      return of(data).pipe(delay(300));
    }
    const url =
      cursoId !== undefined
        ? `${environment.apiUrl}/alumnos?cursoId=${cursoId}`
        : `${environment.apiUrl}/alumnos`;
    return this.http.get<Alumno[]>(url);
  }
}
