import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UE} from '../models/ue.interface'

@Injectable({
  providedIn: 'root'
})



export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/dashboard';
  constructor(private http: HttpClient) { }

  getUserUe(email: string): Observable<UE[]> {
    return this.http.get<UE[]>(`${this.apiUrl}/${email}`);
  }


}


