import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
  error: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateWithAuth>
  ) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.subscribe(({ ui, auth }) => {
      this.loading = ui.isLoading;
      this.error = auth.error?.message ? true : false;
    });

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  onSubmit() {

    this.error = false;

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
