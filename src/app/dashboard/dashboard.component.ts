import {Component, OnInit} from '@angular/core';
import { Ue } from '../models/ue.interface'
import { UeService} from "../services/ue.service";
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit {




  showAddUeForm = false;

  newUe: Ue = {
    code:'',
    name: '',
    description: '',
    credits: 0,
    illustration: '',
    createdAt: new Date()
  };

  selectedFile: File | null = null;



  constructor(
    private ueService: UeService,
    private dashboardService: DashboardService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
  }

  onImageSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onCreditsSelected(value: any): void {
    if (value) {
      this.newUe.credits = value;
    }else{
      this.newUe.credits = 0;
    }

  }

  addCourse(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image',this.selectedFile, this.selectedFile.name)
    }
    formData.append('code',this.newUe.code)
    formData.append('name',this.newUe.name);
    if (!this.newUe.description) {
      this.newUe.description = '';
    }
    formData.append('description', this.newUe.description);
    if (!this.newUe.credits) {
      this.newUe.credits = 1;
    }
    formData.append('credits',this.newUe.credits.toString());
    const currentUser = this.authService.getCurrentUser()
    console.log(currentUser.email);
    this.dashboardService.addUeToUser(currentUser.email,this.newUe.code).subscribe();
    this.ueService.createUe(formData).subscribe(response => {
      alert('UE saved');
    });



    this.newUe = {
      code:'',
      name: '',
      description: '',
      credits: 0,
      illustration: '',
      lastUpdateDate: new Date()
    };
    this.showAddUeForm = false;

  }
}
