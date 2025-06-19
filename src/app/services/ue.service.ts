import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ue {
  title: string;
  description: string;
  image: string;
  date_updated: Date;
}

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
}
