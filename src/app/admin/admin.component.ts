import { Component, OnInit } from '@angular/core';

import { UeService } from '../services/ue.service';
import { UserService } from '../services/user.service';

import { Ue } from '../models/ue.interface';
import { User } from '../models/user.interface';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  activeTab: string = 'ues';

  setTab(tab: 'ues' | 'users' | 'assignation'): void {
    this.activeTab = tab;
  }

  ues: Ue[] = [];
  users: User[] = [];

  constructor(private ueService: UeService, private userService: UserService) { }

  ngOnInit(): void {
    this.ueService.getAll().subscribe(data => this.ues = data)
    this.userService.getUsers().subscribe(data => this.users = data);
    }
  
}
