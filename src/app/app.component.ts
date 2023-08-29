import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from './modules/auth/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();

  constructor(private authService: AuthService) {
    this.authService.initAuthListener();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
