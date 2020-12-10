import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { LoggingService } from 'src/app/services/logging.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(
    private messageService: MessageService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.messageService.get().subscribe((messages) => {
      this.messages = messages;
      this.logger.log(`Message Count => ${messages.length}`);
    });
  }
}
