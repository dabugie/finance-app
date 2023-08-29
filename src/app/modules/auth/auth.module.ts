import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { signinComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { authReducer } from './store/reducers';
import { EffectsArray } from './store/auth.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [signinComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature(EffectsArray),
  ],
  exports: [signinComponent, SignupComponent],
})
export class AuthModule { }
