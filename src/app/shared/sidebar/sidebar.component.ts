import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { SidebarItem } from '../models/sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  sidebarData: SidebarItem[] = [
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

  constructor(private router: Router) { }

  isActive(url: string): boolean {
    let charPos = this.router.url.indexOf('?');
    let cleanUrl =
      charPos !== -1 ? this.router.url.slice(0, charPos) : this.router.url;
    return cleanUrl === url;
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}
