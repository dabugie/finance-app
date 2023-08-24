import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  return inject(AuthService)
    .isAuth()
    .pipe(
      tap((isAuth) => {
        !isAuth ? router.navigate(['/auth']) : true;
      }),
      take(1)
    );
};
