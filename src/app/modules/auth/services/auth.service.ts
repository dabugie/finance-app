import { Injectable, NgZone, OnDestroy } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  Unsubscribe,
  authState,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, map, takeUntil } from 'rxjs';
import { User } from '../models/user.model';
import * as authActions from '../store/actions/auth.actions';
import { AuthState } from '../store/auth.reducer';

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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.userUnsubscribe?.();
  }

  initAuthListener(): void {
    authState(this.auth)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (fbUser) => this.handleAuthStateChange(fbUser),
        error: (error) => this.handleError(error),
      });
  }

  private handleAuthStateChange(fbUser: any): void {
    if (fbUser) {
      this.handleAuthenticatedUser(fbUser);
    } else {
      this.handleUnauthenticatedUser();
    }
  }

  private handleAuthenticatedUser(fbUser: any): void {
    this.userUnsubscribe = onSnapshot(
      doc(this.firestore, 'users', fbUser.uid),
      {
        next: (doc: any) => {
          const user = User.fromFirebase(doc.data());
          this._user = user;
          this.store.dispatch(authActions.authSuccess({ user }));
        },
        error: (error) => this.handleError(error),
      }
    );
  }

  private handleUnauthenticatedUser(): void {
    this._user = null!;
    this.userUnsubscribe?.();
    this.store.dispatch(authActions.unSetUser());
  }

  private handleError(error: any): void {
    this.store.dispatch(authActions.authError({ payload: error }));
  }

  private async createOrUpdateUserInFirestore(user: any, data: any) {
    const userRef = collection(this.firestore, 'users');
    const docRef = doc(userRef, user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, { ...data });
    } else {
      await updateDoc(docRef, { photoURL: data.photoURL });
    }
  }

  async signupUser(name: string, email: string, password: string) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const newUser = new User(
        user.uid,
        name,
        user.email!,
        new Date(),
        new Date(),
        null!
      );

      await this.createOrUpdateUserInFirestore(user, newUser);
    } catch (error) {
      this.handleError(error);
    }
  }

  async signinUser(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      this.handleError(error);
    }
  }

  async signinUserWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(this.auth, provider);

      const newUser = new User(
        user.uid,
        user.displayName!,
        user.email!,
        new Date(),
        new Date(),
        user.photoURL!
      );

      await this.createOrUpdateUserInFirestore(user, newUser);
    } catch (error) {
      this.handleError(error);
    }
  }

  async signoutUser() {
    try {
      await this.auth.signOut();
    } catch (error) {
      this.handleError(error);
    }
  }

  isAuth() {
    return authState(this.auth).pipe(map((fbUser) => fbUser != null));
  }

  get user() {
    return { ...this._user };
  }
}
