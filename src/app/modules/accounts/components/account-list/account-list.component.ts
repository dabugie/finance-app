import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { AppStateWithAuth } from 'src/app/modules/auth/store/reducers';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import * as accountActions from '../../store/actions/accounts.actions';
import { Account } from '../../models/account.model';
import { AppStateWithAccounts } from '../../store/reducers/accounts.reducer';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit, OnDestroy {

  accounts: Account[] = [];
  accountsSubs: Subscription = new Subscription();

  constructor(
    private store: Store<AppStateWithAccounts>,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.accountsSubs = this.store.select('accounts').subscribe(({ accounts }) => (this.accounts = accounts));
  }

  ngOnDestroy(): void {
    this.accountsSubs?.unsubscribe();
  }


}
