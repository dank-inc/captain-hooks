import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user?: User;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  setUser(id: string) {
    this.userService.getOne(id).subscribe((user) => {
      this.user = user;
      this.loading = false;
    });
  }

  ngOnInit(): void {
    this.setUser(this.route.snapshot.params.id);

    this.route.params.subscribe((params) => {
      // to change to next user!
      this.setUser(params.id);
    });
  }
}
