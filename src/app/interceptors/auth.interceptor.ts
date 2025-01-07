// auth.interceptor.ts
import { 
  HttpRequest, 
  HttpEvent, 
  HttpErrorResponse 
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const AuthInterceptor = (req: HttpRequest<any>, next: (request: HttpRequest<any>) => Observable<HttpEvent<any>>) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.token;
  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 && (error.error === 'Token expirado.' || error.error === 'Token inválido.')) {
        authService.removeToken();
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};