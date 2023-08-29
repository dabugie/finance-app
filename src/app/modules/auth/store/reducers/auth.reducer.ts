import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions';
import { User } from '../../models/user.model';
import { AppState } from 'src/app/store/app-state.model';

export interface AuthError {
  url: string;
  name: string;
  message: string;
}

export interface AuthState {
  readonly uid: string;
  readonly user: User | null;
  readonly loaded: boolean;
  readonly error: AuthError | null;
}

export interface AppStateWithAuth extends AppState {
  auth: AuthState;
}

export const initialAuthState: AuthState = {
  uid: '',
  user: null,
  loaded: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(authActions.setUserSuccess, (state, { user }) => ({
    ...state,
    loaded: true,
    user: { ...user },
    uid: user.uid,
    error: null,
  })),

  on(authActions.setUserError, (state, { payload }) => {
    const { url, name, message } = payload;
    return {
      ...state,
      loaded: false,
      uid: '',
      user: null,
      error: { url, name, message },
    };
  }),

  on(authActions.unSetUser, (state) => ({
    ...state,
    loaded: false,
    uid: '',
    user: null,
    error: null,
  }))
);
