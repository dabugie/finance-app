import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth.reducer';
import * as authActions from '../../store/actions/auth.actions';
import { Subscription } from 'rxjs';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppStateWithAuth>
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
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
    if (this.signupForm.invalid) {
      return;
    }


    const { name, email, password } = this.signupForm.value;

    this.store.dispatch(authActions.setSignUp({ name, email, password }));


    // this.authService
    //   .createUser(name, email, password)
    //   .then((credentials: any) => {
    //     this.router.navigate(['/']);
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
  }

  signInWithGoogle() {
    // this.store.dispatch(authActions.setUserLoading());

    // this.authService.SigninWithGoogle().then(() => {
    //   this.router.navigate(['/']);
    // });
  }
}
