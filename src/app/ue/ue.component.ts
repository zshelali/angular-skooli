import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../services/module.service';
import { UserService, User } from '../services/user.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-ue',
  templateUrl: './ue.component.html',
  styleUrls: ['./ue.component.css']
})
export class UeComponent implements OnInit {

  activeTab: 'cours' | 'users' | 'forum' = 'cours';

  // Tu pourras plus tard peupler ce champ dynamiquement depuis une route /api/ues/:id
  ue = {
    code: 'IT41',
    name: 'Quantum Computing Basics'
  };

  users: User[] = [];
  modules: any[] = [];

  showAddForm = false;

  newModule = {
    title: '',
    description: '',
    files: [] as File[]
  };

  constructor(
    private moduleService: ModuleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadModules();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur chargement utilisateurs :', err)
    });
  }

  loadModules(): void {
    this.moduleService.getModules().subscribe({
      next: (data) => this.modules = data,
      error: (err) => console.error('Erreur chargement modules :', err)
    });
  }

  toggleModule(module: any): void {
    module.isOpen = !module.isOpen;
  }

  onFileSelected(event: any): void {
    this.newModule.files = Array.from(event.target.files);
  }

  addModule(): void {
    const mappedModule = {
      title: this.newModule.title,
      description: this.newModule.description,
      files: this.newModule.files.map(file => ({
        name: file.name,
        url: 'assets/files/' + file.name,
        type: file.type.includes('pdf') ? 'pdf' :
              file.type.includes('image') ? 'image' : 'other'
      })),
      isOpen: false
    };

    console.log('Module envoyé au backend :', mappedModule);

    this.moduleService.addModule(mappedModule).subscribe({
      next: (res) => {
        console.log('Module reçu en retour :', res);
        this.modules.push(res);
        this.newModule = { title: '', description: '', files: [] };
        this.showAddForm = false;
      },
      error: (err) => {
        console.error('Erreur ajout module :', err);
      }
    });
  }
  
}
