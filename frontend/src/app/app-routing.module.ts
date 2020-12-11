import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageListComponent } from './components/messages/message-list/message-list.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserListComponent } from './components/users/user-list/user-list.component';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'messages', component: MessageListComponent },
  { path: '**', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
