import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-chip',
  templateUrl: './user-chip.component.html',
  styleUrls: ['./user-chip.component.scss'],
})
export class UserChipComponent implements OnInit {
  @Input() user!: User;

  constructor() {}

  ngOnInit(): void {}
}
