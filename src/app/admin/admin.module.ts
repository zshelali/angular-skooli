import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';

import { AdminOnlyGuard } from '../guards/admin-only.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { UeManagementComponent } from './ue-management/ue-management.component';
import { UeFormModalComponent } from './ue-form-modal/ue-form-modal.component';

import { ReactiveFormsModule } from '@angular/forms';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';


@NgModule({
  declarations: [AdminComponent, UserManagementComponent, UeManagementComponent, UeFormModalComponent, UserFormModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: AdminComponent, canActivate: [AdminOnlyGuard]},
    ])
  ]
})
export class AdminModule { }
