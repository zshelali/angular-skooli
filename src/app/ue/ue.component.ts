  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-ue',
    templateUrl: './ue.component.html',
    styleUrls: ['./ue.component.css']
  })
  export class UeComponent implements OnInit {

    activeTab: 'cours' | 'users' = 'cours';

    ue = {
      code: 'IT41',
      name: 'Quantum Computing Basics'
    };

    modules = [
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
    

    users = [
      { name: 'Alice Martin', email: 'alice@example.com', role: 'Étudiant' },
      { name: 'Jean Dupont', email: 'jean@example.com', role: 'Enseignant' },
      { name: 'Claire Dubois', email: 'claire@example.com', role: 'Étudiant' }
    ];

    showAddForm = false;

    newModule = {
      title: '',
      description: '',
      files: [] as File[]
    };

    constructor() {}

    ngOnInit(): void {}

    toggleModule(module: any): void {
      module.isOpen = !module.isOpen;
    }

    onFileSelected(event: any): void {
      this.newModule.files = Array.from(event.target.files);
    }

    addModule(): void {
      this.modules.push({
        title: this.newModule.title,
        description: this.newModule.description,
        files: this.newModule.files.map(file => ({
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type.includes('pdf') ? 'pdf' :
                file.type.includes('image') ? 'image' : 'other'
        })),
        isOpen: false,
      });

      this.newModule = { title: '', description: '', files: [] };
      this.showAddForm = false;
    }
  }
