import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  @Input() isCollapsed: boolean = false;
  @Input() screenWidth: number = 0;

  constructor() { }

  getBodyClass(): string {

    let styleClass = '';

    if (!this.isCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.isCollapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }

    return styleClass;
  }
}
