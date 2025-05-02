import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = '';
      switch (error.status) {
        case 500:
          message = 'Internal server error';
          break;
        default:
          message = 'error fetching data, please contact support'
      }

      snackbar.open(message, '', { duration: 3000 });
      return throwError(() => error);
    })
  );
};
