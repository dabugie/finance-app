import { createAction, props } from '@ngrx/store';
import { Account } from '../../models/account.model';

export const setAccounts = createAction('[Accounts] Set Accounts');

export const setAccountsLoading = createAction('[Accounts] Set Accounts Loading');

export const unSetAccountsLoading = createAction('[Accounts] Unset Accounts Loading');

export const setAccountsSuccess = createAction(
    '[Accounts] Set Accounts Success',
    props<{ accounts: Account[] }>()
);

export const setAccountsError = createAction(
    '[Accounts] Set Accounts Error',
    props<{ payload: any }>()
);

export const unSetAccounts = createAction('[Accounts] Unset Accounts');


