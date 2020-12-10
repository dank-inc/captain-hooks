import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CRUDService<T> {
  public API = '';
  constructor(private http: HttpClient) {}

  create(body: Partial<T>): Observable<string> {
    return this.http.post<string>(`${this.API}`, {
      ...body,
    });
  }
  get(): Observable<T[]> {
    return this.http.get<T[]>(this.API);
  }
  update(id: string, body: Partial<T>): Observable<string> {
    return this.http.put<string>(`${this.API}/${id}`, {
      ...body,
    });
  }
  delete(id: string): Observable<string> {
    return this.http.delete<string>(`${this.API}/${id}`);
  }
}
