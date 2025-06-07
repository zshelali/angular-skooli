import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ue',
  templateUrl: './ue.component.html',
  styleUrls: ['./ue.component.css']
})
export class UeComponent implements OnInit {

  activeTab: 'posts' | 'users' = 'posts';

  ue = {
    code: 'IT41',
    name: 'Classical and Quantum Algorithms'
  };

  users = [
    { name: 'Alice Martin', email: 'alice@example.com', role: 'Étudiant' },
    { name: 'Jean Dupont', email: 'jean@example.com', role: 'Enseignant' },
    { name: 'Claire Dubois', email: 'claire@example.com', role: 'Étudiant' }
  ];

  posts = [
    {
      type: 'file',
      title: 'À IMPRIMER',
      content: 'a ne pas oublier',
      fileUrl: 'assets/files/doc.pdf',
      author: 'Jean Dupont',
      date: new Date('2025-04-28T11:43:00')
    },
    {
      type: 'text',
      title: 'WW',
      content: 'wwwwwwwwwwwq',
      author: 'Alice Martin',
      date: new Date('2025-04-27T14:40:00')
    }
  ];

  modules = [
  {
    title: 'Module 1 : Introduction',
    description: 'Ce module introduit les concepts fondamentaux.',
    files: [
      { name: 'Plan du cours.pdf', url: 'assets/files/plan.pdf', type: 'pdf' },
      { name: 'image-exemple.png', url: 'assets/files/image.png', type: 'image' }
    ],
    isOpen: false
  },
  {
    title: 'Module 2 : Théorie Quantique',
    description: 'Focus sur les algorithmes quantiques.',
    files: [],
    isOpen: false
  }
];
toggleModule(module: any) {
  module.isOpen = !module.isOpen;
}

  constructor() { }

  ngOnInit(): void {}

}
