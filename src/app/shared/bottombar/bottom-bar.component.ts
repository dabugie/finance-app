import { Component } from '@angular/core';
import { SidebarItem } from '../models/sidebar.model';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent {
  bottomBarData: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'fa fa-home',
      route: 'statistics',
    },
    {
      label: 'Accounts',
      icon: 'fa-solid fa-wallet',
      route: 'accounts',
    },
    {
      label: 'Transactions',
      icon: 'fa-solid fa-arrow-right-arrow-left',
      route: 'transactions',
    },
  ];

}
