import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ue } from '../models/ue.interface';


@Injectable({
  providedIn: 'root'
})
export class UeService {
  private apiUrl = 'http://localhost:3000/api/ue';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ue[]> {
    return this.http.get<Ue[]>(this.apiUrl);
  }



  add(Ue: Ue): Observable<Ue> {
    return this.http.post<Ue>(this.apiUrl, Ue);
  }

  getCurrent(codeUe: any): Observable<Ue> {
    return this.http.get<Ue>(`${this.apiUrl}/${codeUe}`);
  }

  update(id: string, Ue:Partial<Ue>): Observable<Ue> {
    return this.http.put<Ue>(`${this.apiUrl}/${id}`, Ue);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createUe(formData: FormData): Observable<FormData> {
  return this.http.post<FormData>(this.apiUrl, formData);
  }

}
