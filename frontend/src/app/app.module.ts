import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageChipComponent } from './components/message-chip/message-chip.component';
import { HeaderComponent } from './components/header/header.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserChipComponent } from './components/users/user-chip/user-chip.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { UserListEditComponent } from './components/users/user-list-edit/user-list-edit.component';

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
  ],
  imports: [FormsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
