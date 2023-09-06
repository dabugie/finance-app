import { Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as authActions from '../../store/actions/auth.actions';
import { AppStateWithAuth } from '../../store/reducers/auth.reducer';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class signinComponent implements OnInit, OnDestroy {
  signinForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  uiSubscription: Subscription = new Subscription();
  error: boolean = false;
  isAuthenticated: boolean = false;
  errorMessage: string = '';


  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateWithAuth>,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.subscribe(({ auth }) => {
      this.loading = auth.isLoading;
      this.error = auth.error?.message ? true : false;
      this.isAuthenticated = auth.isAuthenticated ? true : false;
      if (this.isAuthenticated) {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      }

      if (auth.error) {
        const formattedError = this.formatFirebaseError(auth.error.message);
        this.error = true;
        this.errorMessage = formattedError || '';
      }
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  onSubmit() {
    this.error = false;
    this.errorMessage = '';

    if (this.signinForm.invalid) {
      return;
    }

    const { email, password } = this.signinForm.value;

    this.store.dispatch(authActions.setLoading());

    this.authService
      .signinUser(email, password)
      .then(() => { })
      .catch((error) => {
        this.store.dispatch(authActions.authError({ payload: error }));
      });
  }

  signInWithGoogle() {
    this.store.dispatch(authActions.setLoading());
    this.authService
      .signinUserWithGoogle()
      .then(() => { })
      .catch((error) => {
        this.store.dispatch(authActions.authError({ payload: error }));
      });
  }

  forgotPassword() {
    console.log('forgotPassword');
  }

  formatFirebaseError(error: string): string {
    const splitError = error.split('/');
    if (splitError.length === 2) {
      let formattedError = splitError[1].replace(/-/g, ' ');
      formattedError = formattedError.replace(/[.).]/g, '');
      return formattedError;
    }
    return error;
  }
}
