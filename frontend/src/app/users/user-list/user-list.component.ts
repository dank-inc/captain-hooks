import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // GET USER LIST
    this.getUsers();
  }

  getUsers() {
    this.http
      .get<User[]>(`${environment.api_host}/users`)
      .subscribe((users) => {
        console.log('Users Gotten', users);
        this.users = users.map((u) => new User(u));
      });
  }
}
