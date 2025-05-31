import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ue',
  templateUrl: './ue.component.html',
  styleUrls: ['./ue.component.css']
})
export class UeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  activeTab: 'posts' | 'users' = 'posts';
  ue = {
    code: 'IT41', name: 'Sample UE',
  };

  users = [
    { name: 'Alice Martin', email: 'alice@example.com', role: 'Étudiant' },
    { name: 'Jean Dupont', email: 'jean@example.com', role: 'Enseignant' },
    { name: 'Claire Dubois', email: 'claire@example.com', role: 'Étudiant' }
  ];

  posts = [
    {
      title: 'Bienvenue sur le forum',
      content: 'Ce forum est dédié aux échanges autour du cours.',
      author: 'Jean Dupont',
      date: new Date('2025-05-01T10:15:00')
    },
    {
      title: 'Question sur le TP 1',
      content: 'Quelqu’un a-t-il réussi à faire marcher la base de données MongoDB ?',
      author: 'Alice Martin',
      date: new Date('2025-05-30T18:42:00')
    }
  ];

}
