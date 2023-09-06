import { Injectable, OnInit } from '@angular/core';
import {
  Firestore,
  collection,
  collectionSnapshots,
  doc,
  onSnapshot,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { Observable, Subscription, map } from 'rxjs';
import { AuthService } from '../../auth/services';
import { Account } from '../models/account.model';
import { Store } from '@ngrx/store';
import { AppStateWithAuth } from '../../auth/store/reducers';
import * as accountActions from '../store/actions/accounts.actions';

@Injectable({
  providedIn: 'root',
})
export class AccountService implements OnInit {
  private _account!: Account;
  private userData: any = {};

  userSubs: Subscription = new Subscription();

  $accounts: Observable<any> = new Observable();

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private store: Store<AppStateWithAuth>
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').subscribe(({ user }) => {
      this.userData = user;
    });
  }

  async createAccount(account: Account) {
    const { uid } = this.authService?.user;
    const accountRef = collection(this.firestore, 'accounts');

    await setDoc(doc(accountRef), { createdBy: uid, ...account });
    this._account = { ...account };
    return this._account;
  }

  getAccounts(uid: string) {
    const accountRef = collection(this.firestore, 'accounts');
    const q = query(accountRef, where('createdBy', '==', uid));

    return collectionSnapshots(q).pipe(
      map((snapshot) => snapshot.map((doc) => ({ uid: doc.id, ...doc.data() })))
    );
  }
}
