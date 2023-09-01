import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers/ui.reducer';
import * as authReducers from 'src/app/modules/auth/store/reducers/auth.reducer';

export interface AppState {
    auth: authReducers.AuthState;
    ui: reducers.UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
    auth: authReducers.authReducer,
    ui: reducers.uiReducer,
};
