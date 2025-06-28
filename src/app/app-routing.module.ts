import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './guards/auth.guard';
import {UeComponent} from "./ue/ue.component";


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginModule)
  },
  {path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: 'ue/:id', component: UeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
