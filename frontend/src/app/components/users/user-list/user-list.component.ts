import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserService],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        const users = data.map((u) => new User(u));
        this.users = users;
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('getUsers complete');
      }
    );
  }
}
