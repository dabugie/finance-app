import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services';
import { AppStateWithAuth } from 'src/app/modules/auth/store/reducers';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, OnDestroy {
  userData: any = {};
  showMenu = false;
  userSubs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppStateWithAuth>
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('auth')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => {
        this.userData = user;
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logoutUser().then(() => {
      this.router.navigate(['/auth']);
    });
  }
}
