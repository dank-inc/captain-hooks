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

  ngOnInit(): void {}

  createUser() {
    if (!this.username.length) return;

    this.userService.createUser(this.username).subscribe(({ id }) => {
      this.userService.userCreated.next(id);
    });
  }
}
