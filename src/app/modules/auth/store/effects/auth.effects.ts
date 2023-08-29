import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';
import * as uiActions from 'src/app/store/actions/ui.actions';
import { AppState } from 'src/app/store/app-state.model';
import { User } from '../../models';
import { AuthService } from '../../services';
import * as authActions from '../actions/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  signin$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(authActions.setSignIn),
      tap(() => this.store.dispatch(uiActions.setLoading())),
      switchMap((action) =>
        from(this.authService.signinUser(action.email, action.password)).pipe(
          switchMap(() => this.router.navigate(['/'])),
          catchError((error) =>
            of(
              authActions.setUserError({ payload: error }),
              uiActions.unsetLoading()
            )
          )
        )
      )
    );
  });

  signup$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(authActions.setSignUp),
      tap(() => this.store.dispatch(uiActions.setLoading())),
      switchMap((action) =>
        from(this.authService.signup(action)).pipe(
          switchMap(() => this.router.navigate(['/'])),
          catchError((error) =>
            of(
              authActions.setUserError({ payload: error }),
              uiActions.unsetLoading()
            )
          )
        )
      )
    );
  });
}
