import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
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
import { AppState } from 'src/app/store/app-state.model';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppStateWithAuth } from 'src/app/modules/auth/store/reducers';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
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

  isCollapsed: boolean = true;
  screenWidth: number = 0;

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

  contextMenuData: SidebarItem[] = [];

  userData: any = {};
  userSubs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<AppStateWithAuth>
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.userSubs = this.store
      .select('auth')
      .pipe(filter(({ user }) => user != null))
      .subscribe((user) => {
        this.userData = user.user;

        this.sidebarData.push({
          label: user.user!.name,
          icon: 'fa-solid fa-cog',
        });
      });

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

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
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
