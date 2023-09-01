import { createReducer, on } from '@ngrx/store';
import { Account } from '../../models/account.model';
import * as accountActions from '../actions/create-account.actions';

export interface AccountError {
    url: string;
    name: string;
    message: string;
}

export interface AccountState {
    readonly uid: string;
    readonly account: Account | null;
    readonly loaded: boolean;
    readonly error: AccountError | null;
}

export const initialAccountState: AccountState = {
    uid: '',
    account: null,
    loaded: false,
    error: null,
};

export const accountReducer = createReducer(
    initialAccountState,

    on(accountActions.setCreateAccountSuccess, (state, { account }) => ({
        ...state,
        loaded: true,
        account: { ...account },
        uid: account.uid!,
        error: null,
    })),

    on(accountActions.setCreateAccountError, (state, { payload }) => {
        const { url, name, message } = payload;
        return {
            ...state,
            loaded: false,
            uid: '',
            account: null,
            error: { url, name, message },
        };
    }),

    on(accountActions.unSetCreateAccount, (state) => ({
        ...state,
        loaded: false,
        uid: '',
        account: null,
        error: null,
    }))
);


