import { Injectable, NgZone, OnDestroy } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  Unsubscribe,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Subject, map, takeUntil } from 'rxjs';
import { AuthState } from '../store/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../store/actions/auth.actions';
import { Router } from '@angular/router';
import * as uiActions from 'src/app/store/actions/ui.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private _user!: User;
  private unsubscribe$: Subject<void> = new Subject();
  userUnsubscribe!: Unsubscribe;

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private store: Store<AuthState>,
    public ngZone: NgZone,
    public router: Router
  ) { }

  initAuthListener(): void {
    this.store.dispatch(uiActions.setLoading());
    authState(this.auth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: async (fbUser) => {
          if (fbUser) {
            this.userUnsubscribe = onSnapshot(
              doc(this.firestore,  'users',fbUser.uid),
              {
                next: (doc) => {
                  console.log(doc.data());
                  
                  const user = User.fromFirebase(doc.data());
                  this._user = user;
                  this.store.dispatch(authActions.setUserSuccess({ user }));
                  this.store.dispatch(uiActions.unsetLoading());
                },
                error: (error) => {
                  this.store.dispatch(
                    authActions.setUserError({ payload: error })
                  );
                  this.store.dispatch(uiActions.unsetLoading());
                },
              }
            );
          } else {
            this._user = null!;
            this.userUnsubscribe?.();
            this.store.dispatch(authActions.unSetUser());
            this.store.dispatch(uiActions.unsetLoading());
          }
        },
        error: (error) => {
          this.store.dispatch(authActions.setUserError({ payload: error }));
          this.store.dispatch(uiActions.unsetLoading());
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.userUnsubscribe?.();
  }

  get user() {
    return { ...this._user };
  }

  async signup({ name, email, password }: any) {
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const newUser = new User(user.uid, name, user.email!);
    const userRef = collection(this.firestore, 'users');
    await setDoc(doc(userRef, user.uid), { ...newUser });
    return newUser;
  }

  signinUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutUser() {
    return this.auth.signOut();
  }

  isAuth() {
    return authState(this.auth).pipe(map((fbUser) => fbUser != null));
  }

  async OAuthProvider(provider: any) {
    try {
      await signInWithPopup(this.auth, provider);
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
    } catch (error) {
      window.alert(error);
    }
  }

  async SigninWithGoogle() {
    try {
      await this.OAuthProvider(new GoogleAuthProvider());
      console.log('Successfully logged in!');
    } catch (error) {
      console.log(error);
    }
  }
}
