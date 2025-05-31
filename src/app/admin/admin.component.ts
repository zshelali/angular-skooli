import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  activeTab: string = 'ues';

  setTab(tab: 'ues' | 'users' | 'assignation'): void {
    this.activeTab = tab;
  }

  users = [
    {
      name: 'Ali Hajeri',
      email: 'ali.hajeri24@gmail.com',
      role: 'Étudiant',
      ues: [
        { code: 'IT41', name: 'Systèmes d’exploitation' },
        { code: 'WE4A', name: 'Projet Symfony' }
      ]
    },
    {
      name: 'Clara Dupont',
      email: 'clara.dupont@utbm.fr',
      role: 'Enseignant',
      ues: [
        { code: 'SI40', name: 'Réseaux avancés' }
      ]
    }
  ];
  
  ues = [
    { code: 'IT41', name: 'Systèmes d’exploitation' },
    { code: 'SI40', name: 'Réseaux avancés' },
    { code: 'WE4A', name: 'Projet Symfony' }
  ];

}
