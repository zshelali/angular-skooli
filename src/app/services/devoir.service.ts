import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevoirService {
  private apiUrl = 'http://localhost:3000/api/devoirs';

  constructor(private http: HttpClient) {}

  submitDevoir(devoir: any): Observable<any> {
    return this.http.post(this.apiUrl, devoir);
  }

  getDevoirsByUe(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${code}`);
  }

  gradeDevoir(devoirId: string, note: number, commentaire: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${devoirId}`, { note, commentaire });
  }
}
