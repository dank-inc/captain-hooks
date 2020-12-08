import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/types/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  API = 'http://localhost:8882/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // GET USER LIST
    this.getUsers();
  }

  getUsers() {
    this.http.get<User[]>(`${this.API}/users`).subscribe((users) => {
      console.log('Users Gotten', users);
      this.users = users;
    });
  }
}
