import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers/auth.reducer';

export interface AuthState {
    auth: reducers.authState;
}

export const authReducers: ActionReducerMap<AuthState> = {
    auth: reducers.authReducer,
};
