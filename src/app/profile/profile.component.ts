import { Component, OnInit } from '@angular/core';
import { UserService} from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { User } from "../models/user.interface";

declare var bootstrap: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEditing = false;
  newEmail = '';

  user: User = {
    firstName: 'Ali',
    lastName: 'Hajeri',
    email: 'ali.hajeri@utbm.fr',
    role: "student",
    createdAt: new Date(),
    profilePicture: 'assets/img/it41_gpt.png'
  }

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userInfo = this.authService.getCurrentUser();
    this.userService.getSpecificUser(userInfo.email).subscribe((data: User) => this.user = data);
  }

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
