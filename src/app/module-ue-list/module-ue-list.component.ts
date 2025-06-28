// src/app/module-ue-list/module-ue-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Module } from '../models/module.interface';
import { ModuleService } from '../services/module.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-module-ue-list',
  templateUrl: './module-ue-list.component.html',
  styleUrls: ['./module-ue-list.component.css']
})
export class ModuleUEListComponent implements OnInit {

  ModuleArray: Module[] = [];

  constructor(private moduleService: ModuleService,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const ueId = this.route.snapshot.paramMap.get('id');
    this.moduleService.getModules(ueId).subscribe((data) => {
      this.ModuleArray = data;
    }, (error) => {
      console.error('Erreur lors du chargement des modules :', error);
    });
  }
}
