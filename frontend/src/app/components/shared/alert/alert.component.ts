import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.scss'],
})
export class AlertComponent {
  @Input() message!: string;

  open(message: string) {
    this.message = message;
  }

  onClose() {
    // emit close event
  }
}
