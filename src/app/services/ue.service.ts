import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ue } from '../models/ue.interface'; 

@Injectable({
  providedIn: 'root'
})
export class UeService {
  private apiUrl = 'http://localhost:3000/api/ues';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Ue[]> {
    return this.http.get<Ue[]>(this.apiUrl);
  }

  add(ue: Ue): Observable<Ue> {
    return this.http.post<Ue>(this.apiUrl, ue);
  }

  update(id: string, ue:Partial<Ue>): Observable<Ue> {
    return this.http.put<Ue>(`${this.apiUrl}/${id}`, ue);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
