import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminOnlyGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token){
      this.router.navigate(['/login']);
      return false;
    }
    if (user.role !== 'admin') {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
  
}
