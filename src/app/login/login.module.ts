import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { LoggedinNologinGuard } from '../guards/loggedin-nologin.guard';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: LoginComponent, canActivate: [LoggedinNologinGuard]}
    ])
  ]
})
export class LoginModule { }
