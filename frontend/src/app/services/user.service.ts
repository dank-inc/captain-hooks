import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { CRUDService } from './crud.service';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CRUDService<User, 'name'> {
  RESOURCE_ENDPOINT = 'users';
  userCreated = new Subject<string>();

  error = new Subject<string>();
  users = new Subject<User[]>();

  fetchUsers() {
    return this.get().subscribe((users) => {
      this.users.next(users);
    });
  }

  getUser(id: string) {
    // get user from subject ?
    return this.getOne(id);
  }

  createUser(username: string) {
    const ob = this.create({
      name: username,
    });

    ob.subscribe(() => {
      // update datastore
      // reactive, push user
      this.fetchUsers();
    });
  }

  updateUser(id: number, body: Partial<User>) {
    return this.update(id, body);
  }
}
