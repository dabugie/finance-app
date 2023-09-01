import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [CommonModule, ContextMenuModule, DropdownModule, DynamicDialogModule, ToastModule, DialogModule, InputTextareaModule, InputTextModule],
  exports: [ContextMenuModule, DropdownModule, DynamicDialogModule, ToastModule, DialogModule, InputTextareaModule, InputTextModule],
})
export class PrimeNgModule { }
