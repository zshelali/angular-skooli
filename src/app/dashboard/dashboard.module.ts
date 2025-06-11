import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { UeComponent } from '../ue/ue.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent},
      {path: 'ue', component: UeComponent},
    ])
  ]
})
export class DashboardModule { }
