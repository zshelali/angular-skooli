import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ModuleUEComponent } from './module-ue/module-ue.component';
import { ModuleUEListComponent } from './module-ue-list/module-ue-list.component';
import {UeComponent} from "./ue/ue.component";

import { HttpClientModule } from '@angular/common/http';
import { ForumComponent } from './forum/forum.component';
import { DevoirComponent } from './devoir/devoir.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    ModuleUEComponent,
    ModuleUEListComponent,
    UeComponent,
    DevoirComponent,
    ForumComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
