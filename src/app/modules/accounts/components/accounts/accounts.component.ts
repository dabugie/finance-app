import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements AfterViewInit {
  ref: DynamicDialogRef | undefined;

  isDialogVisible: boolean = false;

  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private cdRef: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  show() {
    this.zone.run(() => {
      this.ref = this.dialogService.open(CreateAccountComponent, {
        header: 'Create a new account',
        width: '350px',
        contentStyle: {
          overflow: 'auto',
          'box-shadow': '0px 0px 0px 0px transparent',
        },
        baseZIndex: 10000,
        maximizable: false,
        styleClass: 'shadow-none widthCustom md:w-1/3 md:max-w-md',
      });
    });
  }
}
