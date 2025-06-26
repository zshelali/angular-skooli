import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { UeComponent } from '../ue/ue.component';
import { RouterModule } from '@angular/router';
import {UeCardListComponent} from "../ue-card-list/ue-card-list.component";
import {UeCardComponent} from "../ue-card/ue-card.component";

import { AuthGuard } from '../guards/auth.guard';


@NgModule({
  declarations: [
    DashboardComponent,
    UeCardListComponent,
    UeCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'ue', component: UeComponent, canActivate: [AuthGuard]},
    ])
  ]
})
export class DashboardModule { }
