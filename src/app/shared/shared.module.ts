import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PrimeNgModule } from './prime-ng.module';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { BottomBarComponent } from './bottombar/bottom-bar.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    BottomBarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    RouterModule
  ],
  exports: [
    SidebarComponent,
    TopbarComponent,
    BottomBarComponent,
    ModalComponent
  ]
})
export class SharedModule { }
