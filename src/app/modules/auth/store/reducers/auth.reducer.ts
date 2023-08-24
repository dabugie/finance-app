import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions';
import { User } from '../../models/user.model';
import { AppState } from 'src/app/store/app-state.model';

export interface authState {
  id: string;
  user: User | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export interface AappStateWithAuth extends AppState {
  auth: authState;
}

export const userInitialState: authState = {
  id: '',
  user: null,
  loaded: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  userInitialState,

  on(authActions.setUserLoading, (state) => ({
    ...state,
    loading: true,
  })),

  on(authActions.setUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    user: { ...user },
    id: user.uid,
    error: null,
  })),

  on(authActions.setUserError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    id: '',
    user: null,
    error: { url: payload.url, name: payload.name, message: payload.message },
  })),

  on(authActions.unSetUser, (state) => ({
    ...state,
    loading: false,
    loaded: false,
    id: '',
    user: null,
    error: null,
  }))
);
