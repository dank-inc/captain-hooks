import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CRUDService } from './crud.service';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CRUDService<User, 'name'> {
  API = `${environment.api_host}/users`;
  userCreated = new Subject<string>();

  getUsers() {
    return this.get();
  }

  getUser(id: string) {
    return this.getOne(id);
  }

  createUser(username: string) {
    const ob = this.create({
      name: username,
    });
    ob.subscribe(() => {
      // update datastore
      console.log('updating datastore');
    });
    return ob;
  }
}
