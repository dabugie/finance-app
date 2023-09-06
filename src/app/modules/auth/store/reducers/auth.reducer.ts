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
  readonly isAuthenticated: boolean;
  readonly user: User | null;
  readonly isLoading: boolean;
  readonly error: AuthError | null;
}

export interface AppStateWithAuth extends AppState {
  auth: AuthState;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,

  on(authActions.setLoading, (state) => ({ ...state, isLoading: true, error: null })),

  on(authActions.unsetLoading, (state) => ({ ...state, isLoading: false })),

  on(authActions.authSuccess, (state, { user }) => ({
    ...state,
    isAuthenticated: true,
    user: User.fromFirebase({ ...user }),
    isLoading: false,
    error: null
  })),

  on(authActions.authError, (state, { payload }) => {
    const { url, name, message } = payload;
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: { url, name, message },
    };
  }),

  on(authActions.unSetUser, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  }))
);
