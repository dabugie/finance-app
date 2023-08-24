import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { SidebarItem, SidebarToggle } from '../models/sidebar.model';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // @ViewChild('cm') cm!: ContextMenu;
  @ViewChild('sidenav') sidenav!: ElementRef;

  @Output() onToggleSidenav: EventEmitter<SidebarToggle> = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.isCollapsed = true;
    }

    this.onToggleSidenav.emit({
      screenWidth: this.screenWidth,
      collapsed: this.isCollapsed,
    });
  }

  isContextMenuOpen: boolean = false;

  isCollapsed: boolean = false;
  screenWidth: number = 0;

  sidebarData: SidebarItem[] = [
    {
      label: 'Dashboard',
      icon: 'fa fa-home',
      route: 'dashboard',
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
    {
      label: 'Settings',
      icon: 'fa-solid fa-cog',
      route: 'settings',
    },
  ];

  contextMenuData: SidebarItem[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.contextMenuData.push(
      {
        label: 'Profile',
        icon: 'fa-solid fa-user',
        route: 'profile',
      },
      {
        label: 'Logout',
        icon: 'fa-solid fa-sign-out',
        onClick: (event: any) => {
          this.authService.logoutUser();
          this.router.navigate(['/login']);
        },
      }
    );
  }

  logout() {
    this.authService.logoutUser().then(() => {
      this.router.navigate(['/auth']);
    });
  }

  showContextMenu() {
    this.isContextMenuOpen = !this.isContextMenuOpen;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.onToggleSidenav.emit({
      screenWidth: this.screenWidth,
      collapsed: this.isCollapsed,
    });
  }

  closeSidenav() {
    this.isCollapsed = true;
    this.onToggleSidenav.emit({
      screenWidth: this.screenWidth,
      collapsed: this.isCollapsed,
    });
  }
}
