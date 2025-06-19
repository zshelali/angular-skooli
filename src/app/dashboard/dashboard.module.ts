import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { UeComponent } from '../ue/ue.component';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';


@NgModule({
  declarations: [
    DashboardComponent,
    UeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'ue', component: UeComponent, canActivate: [AuthGuard]},
    ])
  ]
})
export class DashboardModule { }
