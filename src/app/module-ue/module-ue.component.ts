import { Component, Input, OnInit } from '@angular/core';
import { Module } from 'src/class/Module'

@Component({
  selector: 'app-module-ue',
  templateUrl: './module-ue.component.html',
  styleUrls: ['./module-ue.component.css']
})


export class ModuleUEComponent implements OnInit {

  @Input() module !: Module

  constructor() { }

  ngOnInit(): void {
  }

  toggleModule(module: any): void {
    module.isOpen = !module.isOpen;
  }

}
