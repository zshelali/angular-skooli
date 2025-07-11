import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../services/module.service';
import { UserService } from '../services/user.service';
import {User} from '../models/user.interface'
import { ForumService } from '../services/forum.service';
import {UeService} from "../services/ue.service";
import {ActivatedRoute} from "@angular/router";
import {Ue} from "../models/ue.interface";
import { Module } from "../models/module.interface"
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-ue',
  templateUrl: './ue.component.html',
  styleUrls: ['./ue.component.css']
})
export class UeComponent implements OnInit {

  activeTab: 'cours' | 'users' | 'forum' | 'devoirs' = 'cours';
  // Tu pourras plus tard peupler ce champ dynamiquement depuis une route /api/ues/:id
  ue: Ue = {
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
    private userService: UserService,
    private ueService: UeService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUe()
    this.loadUsers();
    this.loadModules();
    this.loadUeAndUsers();

  }

  loadUeAndUsers(): void {
  const ueId = this.route.snapshot.paramMap.get('id');

  this.ueService.getCurrent(ueId).subscribe({
    next: (data) => {
      this.ue = data;
      console.log('✅ UE chargée :', this.ue);

      // Appelle loadUsers maintenant que this.ue.code est prêt
      this.loadUsers();
    },
    error: (err) => {
      console.error('❌ Erreur chargement UE :', err);
    }
  });
}


  getUserRole(): string {
    return this.authService.getUserRole() || "student";
  }

  loadUe(): void {
    const ueId = this.route.snapshot.paramMap.get('id');
    this.ueService.getCurrent(ueId).subscribe({
      next: (data) => this.ue = data,
    })
    console.log(this.ue.code)
  }

  loadUsers(): void {
  const ueCode = this.ue.code;
  if (!ueCode) return;

  console.log('UE Code utilisé pour filtrer les utilisateurs :', ueCode);

  this.userService.getUsersByUE(ueCode).subscribe({
    next: (data) => {
      console.log('✅ Utilisateurs reçus :', data);
      this.users = data;
    },
    error: (err) => console.error('❌ Erreur chargement utilisateurs :', err)
  });
}


  loadModules(): void {
    const ueId = this.route.snapshot.paramMap.get('id');
    this.moduleService.getModules(ueId).subscribe({
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
    const mappedModule: Module = {
      title: this.newModule.title,
      description: this.newModule.description,
      codeUe: this.route.snapshot.paramMap.get('id') || "0",
      files: this.newModule.files.map(file => ({
        name: file.name,
        url: 'assets/files/' + file.name,
        type: file.type.includes('pdf') ? 'pdf' :
              file.type.includes('image') ? 'image' : 'other'
      })),
      creationDate: new Date(),
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
