import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-message-chip',
  templateUrl: './message-chip.component.html',
  styleUrls: ['./message-chip.component.scss'],
})
export class MessageChipComponent {
  @Input() message!: Message;
}
