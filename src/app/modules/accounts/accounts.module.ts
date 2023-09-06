import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AccountReducer } from './store/reducers/accounts.reducer';

@NgModule({
  declarations: [AccountsComponent, CreateAccountComponent, AccountListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountsRoutingModule,
    StoreModule.forFeature('accounts', AccountReducer),
    RouterModule,
    PrimeNgModule
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class AccountsModule { }
