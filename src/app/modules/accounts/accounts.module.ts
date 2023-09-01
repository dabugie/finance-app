import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { PrimeNgModule } from 'src/app/shared/prime-ng.module';
import { StoreModule } from '@ngrx/store';
import { accountReducers } from './store/accounts.reducer';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [AccountsComponent, CreateAccountComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountsRoutingModule,
    StoreModule.forFeature('createAccounts', accountReducers),
    RouterModule,
    PrimeNgModule
  ],
  providers: [
    DialogService,
    MessageService
  ]
})
export class AccountsModule { }
