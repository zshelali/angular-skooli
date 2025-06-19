import { Component, OnInit } from '@angular/core';


declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEditing = false;
  newEmail = '';

  user = {
    name: 'Ali',
    lastname: 'Hajeri',
    email: 'ali.hajeri@utbm.fr',
    role: 'Student',
    inscription_date: '2025-05-30',
    profile_picture: 'assets/img/it41_gpt.png'
  }

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
  }

  enableEdit() {
    this.isEditing = true;
    this.newEmail = ''; // Champ vide à l’ouverture
  }

  cancelEdit() {
    this.isEditing = false;
    this.newEmail = '';
  }

  saveChanges() {
    if (this.newEmail.trim()) {
      this.user.email = this.newEmail.trim();
    }
    this.isEditing = false;
    this.newEmail = '';
  }
}
