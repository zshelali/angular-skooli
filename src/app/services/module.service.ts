import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module } from '../models/module.interface'



@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:3000/api/modules';

  constructor(private http: HttpClient) {}

  addModule(module: Module): Observable<Module> {
    return this.http.post<Module>(this.apiUrl, module);
  }

  getModules(code: any): Observable<Module[]> {
    return this.http.get<Module[]>(`${this.apiUrl}/${code}`);
  }
}
