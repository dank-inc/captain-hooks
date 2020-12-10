import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from 'src/app/models/message.model';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService extends CRUDService<Message> {
  // API points to resource
  API = `${environment.api_host}/messages`;
}
