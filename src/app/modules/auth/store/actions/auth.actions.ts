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

export const setLoading = createAction('[Auth] Set Loading');

export const unsetLoading = createAction('[Auth] Unset Loading');

export const authSuccess = createAction('[Auth] Auth Success', props<{ user: User }>());

export const authError = createAction('[Auth] Auth Error', props<{ payload: any }>());

export const unSetUser = createAction('[Auth] Unset User');

