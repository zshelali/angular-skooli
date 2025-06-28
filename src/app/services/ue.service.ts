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

  getAll(): Observable<UE[]> {
    return this.http.get<UE[]>(this.apiUrl);
  }

  add(ue: UE): Observable<UE> {
    return this.http.post<UE>(this.apiUrl, ue);
  }

  getCurrent(codeUE: any): Observable<UE> {
    return this.http.get<UE>(`${this.apiUrl}/${codeUE}`);
  }

  update(id: string, ue:Partial<Ue>): Observable<Ue> {
    return this.http.put<Ue>(`${this.apiUrl}/${id}`, ue);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
