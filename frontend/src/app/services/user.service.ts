import { ComponentFactoryResolver, Injectable, ViewChild } from '@angular/core';
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
    const observer = this.create({
      name: username,
    });

    observer.subscribe(() => {
      this.fetchUsers();
    });

    return observer;
  }

  updateUser(id: number, body: Partial<User>) {
    return this.update(id, body);
  }
}
