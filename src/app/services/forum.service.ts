import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Message {
  author: { name: string; email: string };
  text: string;
  createdAt?: string;
}

interface Forum {
  _id?: string;
  title: string;
  creator: { name: string; email: string };
  messages: Message[];
  createdAt?: string;
  showMessages?: boolean;
  newMessage?: string;
  ueCode?: string; // optionnel pour l’instant
}


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

  getForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.apiUrl);
  }

  addTopic(forum: Partial<Forum>): Observable<Forum> {
    return this.http.post<Forum>(this.apiUrl, forum);
  }

  addMessage(forumId: string, topicIndex: number, message: Message): Observable<Topic> {
    return this.http.post<Topic>(`${this.apiUrl}/${forumId}/topics/${topicIndex}/messages`, message);
  }
}
