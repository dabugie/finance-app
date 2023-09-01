import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers/create-account.reducer';

export interface AccountState {
  createAccount: reducers.AccountState;
}

export const accountReducers: ActionReducerMap<AccountState> = {
  createAccount: reducers.accountReducer,
};
