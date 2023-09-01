import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as authActions from '../../store/actions/auth.actions';
import { AppStateWithAuth } from '../../store/reducers';

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

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateWithAuth>
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this.store.subscribe(({ ui, auth }: any) => {
      this.loading = ui.isLoading;

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
    if (this.signupForm.invalid) {
      return;
    }

    const { name, email, password } = this.signupForm.value;

    this.store.dispatch(authActions.setSignUp({ name, email, password }));
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



