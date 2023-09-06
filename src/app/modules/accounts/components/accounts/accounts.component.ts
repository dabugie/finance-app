import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription, filter } from 'rxjs';
import { AppStateWithAuth } from 'src/app/modules/auth/store/reducers';
import { AccountService } from '../../services/account.service';
import * as accountActions from '../../store/actions/accounts.actions';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit, OnDestroy {
  isDialogVisible: boolean = false;

  userSubs: Subscription = new Subscription();
  accountsSubs: Subscription = new Subscription();

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private accountService: AccountService,
    private store: Store<AppStateWithAuth>,
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => {
        this.accountsSubs = this.accountService.getAccounts(user!.uid).subscribe((accounts: any) => {
          this.store.dispatch(accountActions.setAccountsSuccess({ accounts }));
        })
      });
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe();
    this.accountsSubs?.unsubscribe();
  }
}
