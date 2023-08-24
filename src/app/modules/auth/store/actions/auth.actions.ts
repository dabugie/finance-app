import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const setUserLoading = createAction('[Auth] Load User');

export const setUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User }>()
);

export const setUserError = createAction(
  '[Auth] Load User Error',
  props<{ payload: any }>()
);

export const unSetUser = createAction('[Auth] Unset User');
