import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum } from '../models/forum.interface'
import { Message } from '../models/messages.interface'





export interface Topic {
  title: string;
  author: { name: string; email: string };
  createdAt: string;
  messages: Message[];
}



@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:3000/api/forums';

  constructor(private http: HttpClient) {}

  getForums(ueId: any): Observable<Forum[]> {
    return this.http.get<Forum[]>(`${this.apiUrl}/${ueId}`);
  }

  addTopic(forum: Partial<Forum>): Observable<Forum> {
    return this.http.post<Forum>(this.apiUrl, forum);
  }

  addMessage(forumId: string, message: Message): Observable<any> {
  return this.http.post(`${this.apiUrl}/${forumId}`, message);
}


}
