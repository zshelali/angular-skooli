import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { UeComponent } from '../ue/ue.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent,
    UeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent},
      {path: 'ue', component: UeComponent},
    ])
  ]
})
export class DashboardModule { }
