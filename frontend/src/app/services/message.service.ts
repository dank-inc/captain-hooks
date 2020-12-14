import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/models/message.model';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends CRUDService<Message, 'body' | 'user_id'> {
  // API points to resource
  RESOURCE_ENDPOINT = 'messages';
}
