import { Component, OnInit } from '@angular/core';
import { UE } from 'src/app/models/ue.interface'
import{ DashboardService} from "../services/dashboard.service";

@Component({
  selector: 'app-ue-card-list',
  templateUrl: './ue-card-list.component.html',
  styleUrls: ['./ue-card-list.component.css']
})
export class UeCardListComponent implements OnInit {

  UeCardArray: UE[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getUserUe().subscribe((data) => {
      this.UeCardArray = data;
    }, (error) => {
      console.error('Erreur lors du chargement des UEs de l\'utilisateur', error);
    })
  }

}
