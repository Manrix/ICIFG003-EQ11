import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  private readonly loggedIn = signal<boolean>(this.hasToken());
  readonly isLoggedIn = this.loggedIn.asReadonly();

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/usuarios/login`, credentials).pipe(
      tap(() => {
        localStorage.setItem('isLoggedIn', 'true');
        this.loggedIn.set(true);
      }),
    );
  }

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/usuarios`, {
      ...data,
      rol: 'DOCENTE',
    });
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.set(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }
}
