import { Component, OnInit } from '@angular/core';

import { UeService } from 'src/app/services/ue.service';
import { Ue } from 'src/app/models/ue.interface';

@Component({
  selector: 'app-ue-management',
  templateUrl: './ue-management.component.html',
  styleUrls: ['./ue-management.component.css']
})
export class UeManagementComponent implements OnInit {

  ues: Ue[] = [];

  constructor(private ueService: UeService) { }

  ngOnInit(): void {
    this.ueService.getAll().subscribe(data => this.ues = data)
  }

}
