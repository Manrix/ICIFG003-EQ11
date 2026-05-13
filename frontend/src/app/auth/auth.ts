import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  
  private baseUrl = 'http://localhost:8080/api/v1/usuarios';

  // Usamos un BehaviorSubject para que los componentes puedan reaccionar a cambios de estado
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => {
        // Asumiendo que el login simple solo devuelve un HTTP 200 si es exitoso
        localStorage.setItem('isLoggedIn', 'true');
        this.loggedIn.next(true);
      })
    );
  }

  register(data: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.baseUrl, {
      ...data,
      rol: 'DOCENTE',
    });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }
}
