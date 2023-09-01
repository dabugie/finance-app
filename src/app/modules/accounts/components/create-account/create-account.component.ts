import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  accountsForm: FormGroup = new FormGroup({});

  accountTypes: any[] = [
    { name: 'Checking', code: 'CHK' },
    { name: 'Savings', code: 'SAV' },
    { name: 'Credit Card', code: 'CC' },
    { name: 'Cash', code: 'CASH' },
    { name: 'Investment', code: 'INV' },
    { name: 'Loan', code: 'LOAN' },
    { name: 'Other', code: 'OTHER' },
  ];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.accountsForm = this.fb.group({
      accountName: ['', [Validators.required, Validators.minLength(3)]],
      accountType: ['', Validators.required],
      accountNumber: [''],
      accountCurrency: ['', Validators.required],
      accountNotes: [''],
    });

    this.cdRef.detectChanges();
  }

  onSubmit() {
    this.accountService
      .createAccount(this.accountsForm.value)
      .then((account) => {
        console.log(account);
      });
  }
}
