import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/types/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Captain Hooks';
  API = 'http://localhost:8882/api';

  users: User[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('initialized client');
    this.getUsers();
  }

  async getUsers() {
    console.log('getting users');
    this.http.get<User[]>(`${this.API}/users`).subscribe((users) => {
      console.log('Users Gotten', users);
      this.users = users;
    });
  }
}
