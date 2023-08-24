import { Injectable, NgZone } from '@angular/core';
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
import { map } from 'rxjs';
import { AuthState } from '../store/auth.reducer';
import { Store } from '@ngrx/store';
import * as authActions from '../store/actions/auth.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: User;
  userUnsubscribe!: Unsubscribe;

  get user() {
    return { ...this._user };
  }

  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private store: Store<AuthState>,
    public ngZone: NgZone,
    public router: Router
  ) { }

  initAuthListener() {
    return authState(this.auth).subscribe(async (fbUser) => {
      if (fbUser) {
        this.userUnsubscribe = onSnapshot(
          doc(this.firestore, fbUser.uid, 'user'),
          (doc) => {
            const user = User.fromFirebase(doc.data());
            this._user = user;
            this.store.dispatch(authActions.setUserSuccess({ user }));
          }
        );
      } else {
        this._user = null!;
        this.userUnsubscribe?.();
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  async createUser(name: string, email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const newUser = new User(user.uid, name, user.email!);
    const userRef = collection(this.firestore, user.uid);
    return await setDoc(doc(userRef, 'user'), { ...newUser });
  }

  loginUser(email: string, password: string) {
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
