import { createReducer, on } from '@ngrx/store';
import { Account } from '../../models/account.model';
import * as accountActions from '../actions/accounts.actions';
import { AppState } from 'src/app/store/app-state.model';

export interface AccountError {
    url: string;
    name: string;
    message: string;
}

export interface AccountState {
    readonly accounts: Account[];
    readonly isLoading: boolean;
    readonly error: AccountError | null;
}

export interface AppStateWithAccounts extends AppState {
    accounts: AccountState;
}

export const initialAccountState: AccountState = {
    accounts: [],
    isLoading: false,
    error: null,
};

export const AccountReducer = createReducer(
    initialAccountState,

    on(accountActions.setAccountsLoading, (state) => ({
        ...state,
        isLoading: true,
        error: null,
    })),

    on(accountActions.unSetAccountsLoading, (state) => ({
        ...state,
        isLoading: false,
    })),

    on(accountActions.setAccountsSuccess, (state, { accounts }) => ({
        ...state,
        isLoading: false,
        accounts: [...accounts],
        error: null,
    })),

    on(accountActions.setAccountsError, (state, { payload }) => {
        const { url, name, message } = payload;
        return {
            ...state,
            isLoading: false,
            error: { url, name, message },
        };
    }),

    on(accountActions.unSetAccounts, (state) => ({
        ...state,
        accounts: [],
        isLoading: false,
        error: null,
    }))
);
