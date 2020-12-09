import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list-edit',
  templateUrl: './user-list-edit.component.html',
  styleUrls: ['./user-list-edit.component.scss'],
})
export class UserListEditComponent implements OnInit {
  constructor(private userService: UserService) {}
  username = '';

  ngOnInit(): void {}

  createUser() {
    if (!this.username.length) return;

    this.userService.createUser({
      name: this.username,
    });
  }
}
