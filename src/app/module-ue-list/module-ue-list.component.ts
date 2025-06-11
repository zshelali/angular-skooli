import { Component, OnInit } from '@angular/core';
import { Module} from 'src/class/Module'

@Component({
  selector: 'app-module-ue-list',
  templateUrl: './module-ue-list.component.html',
  styleUrls: ['./module-ue-list.component.css']
})
export class ModuleUEListComponent implements OnInit {

  ModuleArray !: Module[]


  constructor() { }

  ngOnInit(): void {
    this.ModuleArray =[
      {
        title: 'Introduction',
        description: 'Présentation du cours et des objectifs pédagogiques.',
        files: [
          { name: 'Intro.pdf', url: 'assets/files/intro.pdf', type: 'pdf' },
          { name: 'Schéma.png', url: 'assets/files/schema.png', type: 'image' }
        ],
        isOpen: false
      },
      {
        title: 'Qubits et logique',
        description: 'Notions de superposition et de portes quantiques.',
        files: [],
        isOpen: false
      }
    ];
  }

}
