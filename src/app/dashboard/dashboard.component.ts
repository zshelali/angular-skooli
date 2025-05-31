import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  courses = [
    {
      title: 'Mathématiques Avancées',
      description: 'Introduction aux bases de la logique mathématique',
      date_updated: new Date('2025-04-03T00:00:00'),
      image: 'assets/img/it41_gpt.png'
    },
    {
      title: 'Physique Quantique',
      description: 'Les fondements de la mécanique quantique',
      date_updated: new Date('2025-05-01T00:00:00'),
      image: 'assets/img/it44_gpt.png'
    },
    {
      title: 'Informatique',
      description: 'Structures de données et algorithmes',
      date_updated: new Date('2025-05-15T00:00:00'),
      image: 'assets/img/lc00_gpt.png'
    },
    {
      title: 'Analyse Numérique',
      description: 'Étude des méthodes numériques pour la résolution d’équations différentielles.',
      date_updated: new Date('2025-05-10'),
      image: 'assets/img/si40_gpt.png'
    },
    {
      title: 'Systèmes d’Exploitation',
      description: 'Concepts fondamentaux des OS : processus, threads, mémoire, et systèmes de fichiers.',
      date_updated: new Date('2025-05-21'),
      image: 'assets/img/so04_gpt.png'
    },
    {
      title: 'Réseaux Informatiques',
      description: 'Introduction aux modèles OSI, TCP/IP et aux protocoles de communication réseau.',
      date_updated: new Date('2025-04-29'),
      image: 'assets/img/we4a_gpt.png'
    }
  ];

}
