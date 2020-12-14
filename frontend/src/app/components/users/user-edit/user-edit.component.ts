import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  private id!: number;
  metadataFieldName: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.params.id ? 'editing user' : 'new user');

    this.userForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      admin: new FormControl({ value: false }),
      twitch_username: new FormControl(''),
      discord_username: new FormControl(''),
      notes: new FormControl(''),
    });

    this.userService.getOne(this.route.snapshot.params.id).subscribe((user) => {
      console.log('editing =>', user);

      this.id = user.id;

      this.userForm.patchValue({
        ...user,
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
      .updateUser(this.id, {
        ...this.userForm.value,
        admin: this.userForm.value.admin ? 1 : 0,
      })
      .subscribe((id) => {
        // form resets from internal datastore
      });
  }
}
