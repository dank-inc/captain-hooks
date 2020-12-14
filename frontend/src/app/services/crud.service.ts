import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MutationResponse } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CRUDService<T, Fields extends keyof T> {
  public RESOURCE_ENDPOINT = '';
  constructor(private http: HttpClient) {}

  create(body: Pick<T, Fields>): Observable<MutationResponse> {
    return this.http.post<MutationResponse>(`${this.RESOURCE_ENDPOINT}`, {
      ...body,
    });
  }

  get(): Observable<T[]> {
    return this.http.get<T[]>(this.RESOURCE_ENDPOINT);
  }

  getOne(id: string): Observable<T> {
    return this.http.get<T>(`${this.RESOURCE_ENDPOINT}/${id}`);
  }

  update(id: number, body: Partial<T>): Observable<MutationResponse> {
    return this.http.put<MutationResponse>(`${this.RESOURCE_ENDPOINT}/${id}`, {
      ...body,
    });
  }

  delete(id: string): Observable<MutationResponse> {
    return this.http.delete<MutationResponse>(
      `${this.RESOURCE_ENDPOINT}/${id}`
    );
  }
}
