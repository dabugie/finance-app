import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import * as authActions from '../../store/actions/auth.actions';
import { AppStateWithAuth } from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class signinComponent implements OnInit, OnDestroy {
  signinForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();


  @HostListener('window:resize', ['$event'])
  onResize(event:any) {

    console.log({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppStateWithAuth>
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }
    const { email, password } = this.signinForm.value;
    this.store.dispatch(authActions.setSignIn({ email, password }));
  }

  signInWithGoogle() {
    // this.store.dispatch(authActions.setUserLoading());
    // this.authService.SigninWithGoogle().then(() => {
    //   this.router.navigate(['/']);
    // });
  }
}
