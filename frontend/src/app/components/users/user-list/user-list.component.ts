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
    this.userService.users.subscribe((users) => {
      console.log('user list updated', users);
      return (this.users = users);
    });

    this.userService.fetchUsers();
  }
}
