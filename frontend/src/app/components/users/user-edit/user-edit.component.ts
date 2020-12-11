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
  @ViewChild('data') userForm!: NgForm;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('user edit');
    this.userService.getOne(this.route.snapshot.params.id).subscribe((user) => {
      console.log('editing =>', user);
      this.userForm.setValue({ id: user.id, name: user.name });
    });
  }

  onSubmit() {
    console.log('form values', this.userForm.value);
    console.log('dirty?', this.userForm.dirty);
    console.log('valid?', this.userForm.valid);
    // update record
  }
}
