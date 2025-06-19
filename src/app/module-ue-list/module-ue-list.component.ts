// src/app/module-ue-list/module-ue-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Module } from 'src/class/Module';
import { ModuleService } from '../services/module.service';

@Component({
  selector: 'app-module-ue-list',
  templateUrl: './module-ue-list.component.html',
  styleUrls: ['./module-ue-list.component.css']
})
export class ModuleUEListComponent implements OnInit {

  ModuleArray: Module[] = [];

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.moduleService.getModules().subscribe((data) => {
      this.ModuleArray = data;
    }, (error) => {
      console.error('Erreur lors du chargement des modules :', error);
    });
  }
}
