import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'statistics', loadChildren: () => import('../statistics/statistics.module').then(m => m.StatisticsModule) },
      { path: 'accounts', loadChildren: () => import('../accounts/accounts.module').then(m => m.AccountsModule) },
      { path: 'transactions', loadChildren: () => import('../transactions/transactions.module').then(m => m.TransactionsModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
