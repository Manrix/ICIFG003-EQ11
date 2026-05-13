import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import type { Curso, CursoCreate } from '../../shared/models/curso.model';
import { MOCK_CURSOS } from './mock-data';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private readonly http = inject(HttpClient);

  private readonly _cursos = signal<Curso[]>([]);
  readonly cursos = this._cursos.asReadonly();

  private readonly _isLoading = signal(false);
  readonly isLoading = this._isLoading.asReadonly();

  loadCursos(): void {
    this._isLoading.set(true);
    this.fetchCursos().subscribe({
      next: (data) => {
        this._cursos.set(data);
        this._isLoading.set(false);
      },
      error: () => {
        this._isLoading.set(false);
      },
    });
  }

  createCurso(curso: CursoCreate): Observable<Curso> {
    if (environment.useMockData) {
      const nuevo: Curso = { ...curso, id: Date.now() };
      return of(nuevo).pipe(
        delay(300),
        tap((c) => this._cursos.update((list) => [...list, c])),
      );
    }
    return this.http
      .post<Curso>(`${environment.apiUrl}/cursos`, curso)
      .pipe(tap((c) => this._cursos.update((list) => [...list, c])));
  }

  updateCurso(id: number, curso: CursoCreate): Observable<Curso> {
    if (environment.useMockData) {
      const actualizado: Curso = { ...curso, id };
      return of(actualizado).pipe(
        delay(300),
        tap((c) => this._cursos.update((list) => list.map((x) => (x.id === id ? c : x)))),
      );
    }
    return this.http
      .put<Curso>(`${environment.apiUrl}/cursos/${id}`, curso)
      .pipe(tap((c) => this._cursos.update((list) => list.map((x) => (x.id === id ? c : x)))));
  }

  deleteCurso(id: number): Observable<void> {
    if (environment.useMockData) {
      return of(undefined).pipe(
        delay(300),
        tap(() => this._cursos.update((list) => list.filter((x) => x.id !== id))),
      );
    }
    return this.http
      .delete<void>(`${environment.apiUrl}/cursos/${id}`)
      .pipe(tap(() => this._cursos.update((list) => list.filter((x) => x.id !== id))));
  }

  private fetchCursos(): Observable<Curso[]> {
    if (environment.useMockData) {
      return of([...MOCK_CURSOS]).pipe(delay(300));
    }
    return this.http.get<Curso[]>(`${environment.apiUrl}/cursos`);
  }
}
