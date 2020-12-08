import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { UserChipComponent } from './components/user-chip/user-chip.component';
import { MessageChipComponent } from './components/message-chip/message-chip.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserListEditComponent } from './users/user-list-edit/user-list-edit.component';

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
