import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ue } from '../models/ue.interface'

@Injectable({
  providedIn: 'root'
})



export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/dashboard';
  constructor(private http: HttpClient) { }

  getUserUe(email: string): Observable<Ue[]> {
    return this.http.get<Ue[]>(`${this.apiUrl}/${email}`);
  }

  addUeToUser(email: string, code: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${code}`, email);
  }


}


