import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { currencies } from 'src/app/shared/currencies';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>(false);
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

  accountCurrencies: { code: string, country: string }[] = currencies;

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

    const account = {
      ...this.accountsForm.value,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.accountService
      .createAccount(account)
      .then((account) => {
        console.log(account);

        this.closeModal.emit(true);
      });
  }
}
