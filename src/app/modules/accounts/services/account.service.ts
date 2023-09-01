import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../../auth/services';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _account!: Account;

  constructor(private firestore: Firestore, private authService: AuthService) {}

  async createAccount(account: Account) {
    const { uid } = this.authService?.user;

    const accountRef = collection(this.firestore, 'accounts');

    await setDoc(doc(accountRef), { user_id: uid, ...account });

    this._account = { ...account };

    return this._account;
  }
}
