import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessageChipComponent } from './components/messages/message-chip/message-chip.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserChipComponent } from './components/users/user-chip/user-chip.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserListEditComponent } from './components/users/user-list-edit/user-list-edit.component';
import { MessageListComponent } from './components/messages/message-list/message-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserListComponent,
    UserDetailsComponent,
    UserChipComponent,
    MessageChipComponent,
    HeaderComponent,
    UserListEditComponent,
    MessageListComponent,
  ],

  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
