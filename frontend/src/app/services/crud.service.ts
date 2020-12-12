import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MutationResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CRUDService<T, Fields extends keyof T> {
  public API = '';
  constructor(private http: HttpClient) {}

  create(body: Pick<T, Fields>): Observable<MutationResponse> {
    return this.http.post<MutationResponse>(`${this.API}`, {
      ...body,
    });
  }

  get(): Observable<T[]> {
    return this.http.get<T[]>(this.API);
  }

  getOne(id: string): Observable<T> {
    return this.http.get<T>(`${this.API}/${id}`);
  }

  update(id: number, body: Partial<T>): Observable<MutationResponse> {
    return this.http.put<MutationResponse>(`${this.API}/${id}`, {
      ...body,
    });
  }

  delete(id: string): Observable<MutationResponse> {
    return this.http.delete<MutationResponse>(`${this.API}/${id}`);
  }
}
