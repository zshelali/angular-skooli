import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ModuleData {
  title: string;
  description: string;
  files: {
    name: string;
    url: string;
    type: string;
  }[];
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:3000/api/modules';

  constructor(private http: HttpClient) {}

  addModule(module: ModuleData): Observable<ModuleData> {
    return this.http.post<ModuleData>(this.apiUrl, module);
  }

  getModules(): Observable<ModuleData[]> {
    return this.http.get<ModuleData[]>(this.apiUrl);
  }
}
