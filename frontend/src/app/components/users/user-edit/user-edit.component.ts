import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  @ViewChild('userForm') userForm!: NgForm;

  private id!: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params.id ? 'editing user' : 'new user');

    this.userService.getOne(this.route.snapshot.params.id).subscribe((user) => {
      console.log('editing =>', user);

      this.id = user.id;

      this.userForm.form.patchValue({
        id: user.id,
        name: user.name,
      });
    });
  }

  onSubmit() {
    if (!this.id) {
      // create new
      return;
    }

    console.log('form values', this.userForm.value);
    console.log('dirty?', this.userForm.dirty);
    console.log('valid?', this.userForm.valid);

    // disable submit button
    this.userService
      .updateUser(this.id, this.userForm.value)
      .subscribe((id) => {
        // form resets from internal datastore
      });
  }
}