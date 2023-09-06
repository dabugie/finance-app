import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as authActions from '../../store/actions/auth.actions';
import { AppStateWithAuth } from '../../store/reducers';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm: FormGroup = new FormGroup({});
  uiSubscription: Subscription = new Subscription();
  loading: boolean = false;

  error: boolean = false;
  errorMessage: string = '';

  isAuthenticated: boolean = false;


  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateWithAuth>,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.subscribe(({ auth }: any) => {
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

    if (this.signupForm.invalid) {
      return;
    }

    const { name, email, password } = this.signupForm.value;

    this.store.dispatch(authActions.setLoading());

    this.authService
      .signupUser(name, email, password)
      .then(() => { })
      .catch((error) => {
        this.store.dispatch(authActions.authError({ payload: error }));
      });
  }

  signInWithGoogle() { }

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
