import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CRUDService<User> {
  API = `${environment.api_host}/users`;
  // emit events,
  //
  // or some watchable property?
  //

  getUsers() {
    return this.get();
  }
}
