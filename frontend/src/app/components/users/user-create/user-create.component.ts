import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserListEditComponent implements OnInit {
  constructor(private userService: UserService) {}
  username = '';
  error: string | null = null;

  ngOnInit(): void {}

  createUser() {
    console.log('creating user', this.username);
    if (!this.username.length) return;

    this.userService.createUser(this.username);
  }

  handleError() {
    this.error = null;
  }
}
