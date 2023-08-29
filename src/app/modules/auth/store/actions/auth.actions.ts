import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const setSignIn = createAction(
  '[Auth] Set signin',
  props<{ email: string; password: string }>()
);

export const setSignUp = createAction(
  '[Auth] Set signup',
  props<{ name: string, email: string; password: string }>()
);

export const setUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User }>()
);

export const setUserError = createAction(
  '[Auth] Load User Error',
  props<{ payload: any }>()
);

export const unSetUser = createAction('[Auth] Unset User');
