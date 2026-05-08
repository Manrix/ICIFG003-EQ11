import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  
  // URL temporal para pruebas, luego se ajustará a la de Spring Boot
  private apiUrl = 'http://localhost:8080/api/auth/login';

  // Usamos un BehaviorSubject para que los componentes puedan reaccionar a cambios de estado
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((response) => {
        // Asumiendo que el login simple solo devuelve un HTTP 200 si es exitoso
        localStorage.setItem('isLoggedIn', 'true');
        this.loggedIn.next(true);
      })
    );
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
