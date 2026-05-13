import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        router.navigate(['/login']);
      } else if (err.status === 403) {
        console.error('Acceso denegado');
      } else if (err.status >= 500) {
        console.error('Error del servidor. Intentá de nuevo más tarde.');
      }
      return throwError(() => err);
    }),
  );
};
