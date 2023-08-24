import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeExpensesComponent } from './components/income-expenses/income-expenses.component';
import { TransactionsRoutingModule } from './transactions-routing.module';

@NgModule({
  declarations: [
    IncomeExpensesComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
