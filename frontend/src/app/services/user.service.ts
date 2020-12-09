import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // TODO: EMITTER?
  constructor(private http: HttpClient) {}

  createUser(user: Pick<User, 'name'>) {
    this.http
      .post<[string]>(`${environment.api_host}/users`, {
        ...user,
      })
      .subscribe((res) => {
        console.log('USER CREATED =>', res[0]);
        // EMIT change?
      });
  }

  getUsers(): Observable<User[]> {
    // caching in here?
    return this.http.get<User[]>(`${environment.api_host}/users`);
  }
}
