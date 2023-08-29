import { createReducer, on } from '@ngrx/store';
import * as uiActions from '../actions/ui.actions';

export interface UiState {
    readonly isLoading: boolean;
}

export const initialUiState: UiState = {
    isLoading: false
};

export const uiReducer = createReducer(
    initialUiState,
    on(uiActions.setLoading, (state) => ({ ...state, isLoading: true })),
    on(uiActions.unsetLoading, (state) => ({ ...state, isLoading: false }))
);