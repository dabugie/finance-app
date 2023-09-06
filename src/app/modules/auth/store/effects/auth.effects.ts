import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, catchError, from, map, mergeMap, of, switchMap, tap } from 'rxjs';
import * as uiActions from 'src/app/store/actions/ui.actions';
import { AppState } from 'src/app/store/app-state.model';
import { AuthService } from '../../services';
import * as authActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) { }

  signin$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(authActions.setSignIn),
      tap(() => this.setLoading()),
      mergeMap((action) => this.signInEffectHandler(action.email, action.password))
    );
  });

  signup$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(authActions.setSignUp),
      tap(() => this.setLoading()),
      mergeMap((action) => this.signUpEffectHandler(action.name, action.email, action.password))
    );
  });

  private signInEffectHandler(email: string, password: string): Observable<Action> {
    return from(this.authService.signinUser(email, password)).pipe(
      map(() => authActions.unsetLoading()),
      tap(() => this.navigateHome()),
      catchError((error) => this.handleAuthError(error))
    );
  }

  private signUpEffectHandler(name: string, email: string, password: string): Observable<Action> {
    return from(this.authService.signupUser(name, email, password)).pipe(
      map(() => authActions.unsetLoading()),
      tap(() => this.navigateHome()),
      catchError((error) => this.handleAuthError(error))
    );
  }

  private setLoading(): void {
    this.store.dispatch(authActions.setLoading());
  }

  private navigateHome(): void {
    this.router.navigate(['/']);
  }

  private handleAuthError(error: any): Observable<Action> {
    return of(
      authActions.authError({ payload: error }),
      authActions.unsetLoading()
    );
  }
}
