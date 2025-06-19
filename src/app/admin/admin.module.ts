import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';

import { AdminOnlyGuard } from '../guards/admin-only.guard';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminComponent, canActivate: [AdminOnlyGuard]},
    ])
  ]
})
export class AdminModule { }
