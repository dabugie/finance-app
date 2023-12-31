import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeExpensesComponent } from './components/income-expenses/income-expenses.component';

const routes: Routes = [
  {
    path: '', component: IncomeExpensesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsRoutingModule { }
