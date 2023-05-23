import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackMessage: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') !== null) {
      const cloneReq = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      });
      return next.handle(cloneReq).pipe(
        tap(
          (succ) => {},
          (err) => {
            if (err.status === 401) {
              this.router.navigateByUrl('login');
            }
          }
        )
      );
    } else {
      return next.handle(req.clone());
    }
  }
}
