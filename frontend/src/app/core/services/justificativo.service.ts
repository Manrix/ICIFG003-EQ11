import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import type { Justificativo, JustificativoCreate } from '../../shared/models/justificativo.model';
import { EstadoJustificativo } from '../../shared/models/justificativo.model';
import { MOCK_JUSTIFICATIVOS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class JustificativoService {
  private readonly http = inject(HttpClient);

  private readonly _justificativosMap = signal<Map<number, Justificativo[]>>(new Map());
  readonly justificativosMap = this._justificativosMap.asReadonly();

  private readonly _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  loadJustificativos(registroId?: number): void {
    this._isLoading.set(true);
    this.fetchJustificativos(registroId).subscribe({
      next: (data) => {
        const map = new Map<number, Justificativo[]>();
        for (const j of data) {
          const list = map.get(j.registroAsistenciaId) ?? [];
          list.push(j);
          map.set(j.registroAsistenciaId, list);
        }
        this._justificativosMap.set(map);
        this._isLoading.set(false);
      },
      error: () => {
        this._isLoading.set(false);
      },
    });
  }

  createJustificativo(justificativo: JustificativoCreate): Observable<Justificativo> {
    if (environment.useMockData) {
      const nuevo: Justificativo = {
        ...justificativo,
        id: Date.now(),
        fechaEnvio: new Date().toISOString(),
        estado: EstadoJustificativo.PENDIENTE,
      };
      return of(nuevo).pipe(
        delay(300),
        tap((j) =>
          this._justificativosMap.update((map) => {
            const next = new Map(map);
            const list = next.get(j.registroAsistenciaId) ?? [];
            next.set(j.registroAsistenciaId, [...list, j]);
            return next;
          }),
        ),
      );
    }
    return this.http
      .post<Justificativo>(`${environment.apiUrl}/justificativos`, justificativo)
      .pipe(
        tap((j) =>
          this._justificativosMap.update((map) => {
            const next = new Map(map);
            const list = next.get(j.registroAsistenciaId) ?? [];
            next.set(j.registroAsistenciaId, [...list, j]);
            return next;
          }),
        ),
      );
  }

  deleteJustificativo(id: number): Observable<void> {
    if (environment.useMockData) {
      return of(undefined).pipe(
        delay(300),
        tap(() =>
          this._justificativosMap.update((map) => {
            const next = new Map<number, Justificativo[]>();
            for (const [regId, list] of map) {
              const filtered = list.filter((j) => j.id !== id);
              if (filtered.length > 0) {
                next.set(regId, filtered);
              }
            }
            return next;
          }),
        ),
      );
    }
    return this.http.delete<void>(`${environment.apiUrl}/justificativos/${id}`).pipe(
      tap(() =>
        this._justificativosMap.update((map) => {
          const next = new Map<number, Justificativo[]>();
          for (const [regId, list] of map) {
            const filtered = list.filter((j) => j.id !== id);
            if (filtered.length > 0) {
              next.set(regId, filtered);
            }
          }
          return next;
        }),
      ),
    );
  }

  private fetchJustificativos(registroId?: number): Observable<Justificativo[]> {
    if (environment.useMockData) {
      let data = [...MOCK_JUSTIFICATIVOS];
      if (registroId !== undefined) {
        data = data.filter((j) => j.registroAsistenciaId === registroId);
      }
      return of(data).pipe(delay(300));
    }
    const url =
      registroId !== undefined
        ? `${environment.apiUrl}/justificativos?registroAsistenciaId=${registroId}`
        : `${environment.apiUrl}/justificativos`;
    return this.http.get<Justificativo[]>(url);
  }
}
