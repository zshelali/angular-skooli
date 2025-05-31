import { Component, OnInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { 
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
  }

  user = {
    name: 'Ali',
    lastname: 'Hajeri',
    email: 'ali.hajeri@utbm.fr',
    role: 'Student',
    inscription_date: '2025-05-30',
    profile_picture: 'assets/img/it41_gpt.png'
  }

}
