import { Component, OnInit } from '@angular/core';
import { Ue } from 'src/app/models/ue.interface'
import{ DashboardService} from "../services/dashboard.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-ue-card-list',
  templateUrl: './ue-card-list.component.html',
  styleUrls: ['./ue-card-list.component.css']
})
export class UeCardListComponent implements OnInit {

  UeCardArray: Ue[] = [];

  constructor(private dashboardService: DashboardService, private authService: AuthService) { }

  ngOnInit(): void {
    const userInfo = this.authService.getCurrentUser();
    this.dashboardService.getUserUe(userInfo.email).subscribe(data => this.UeCardArray = data);
  }

}
