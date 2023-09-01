import { createAction, props } from '@ngrx/store';
import { Account } from '../../models/account.model';

export const setCreateAccount = createAction(
    '[CreateAccount] Set create account',
    props<{ account: Account }>()
);

export const setCreateAccountSuccess = createAction(
    '[CreateAccount] Set create account success',
    props<{ account: Account }>()
);

export const setCreateAccountError = createAction(
    '[CreateAccount] Set create account error',
    props<{ payload: any }>()
);

export const unSetCreateAccount = createAction('[CreateAccount] Unset create account');


