import { Component, OnInit } from '@angular/core';



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

  constructor() { }

  ngOnInit(): void {
    
    }
  
}
