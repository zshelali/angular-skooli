import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import {AuthService} from '../services/auth.service';
import { Forum } from '../models/forum.interface';
import { Message } from '../models/messages.interface'
import {ActivatedRoute} from "@angular/router";





@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})

export class ForumComponent implements OnInit {

  //currentUser = { name: 'Jean Dupont', email: 'jean@example.com', role: 'etudiant' };
  forums: Forum[] = [];
  showAddForm = false;
  newTitle = '';

  constructor(
    private forumService: ForumService,
    private authService: AuthService,
    private route : ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadForums();
  }

  canCreateForum(): boolean {
  return this.authService.getUserRole() === 'prof';
}

  loadForums(): void {

  this.forumService.getForums(this.route.snapshot.paramMap.get('id')).subscribe({
    next: data => {
      this.forums = data
        .map(f => ({
          ...f,
          showMessages: false,
          newMessage: ''
        }));
    },
    error: err => console.error('Erreur chargement forums :', err)
  });
}


  createForum(): void {
    if (!this.newTitle.trim()) {
      console.warn('Titre vide, forum non créé');
      return;
    }

    const newForum: Forum = {
      title: this.newTitle,
      creatorName: this.authService.getLastName() || "John",
      creatorEmail: this.authService.getCurrentUser().email,
      messages: [],
      ueCode: this.route.snapshot.paramMap.get('id') || "",
      createdAt: new Date().toISOString()
    };

    this.forumService.addTopic(newForum).subscribe({
      next: (forum: any) => {
        const cleanForum: Forum = {
          ...forum,
          creator: typeof forum.creator === 'string'
            ? { name: forum.creator, email: '' }
            : forum.creator,
          showMessages: false,
          newMessage: ''
        };

        this.forums.push(cleanForum);
        this.newTitle = '';
        this.showAddForm = false;
      },
      error: err => console.error('Erreur création forum :', err)
    });
  }

  toggleMessages(forum: Forum): void {
    forum.showMessages = !forum.showMessages;
  }

  sendMessage(forum: Forum): void {
  if (!forum._id) {
    console.warn('❌ ID forum manquant');
    return;
  }

  if (forum.newMessage?.trim()) {
    const message: Message = {
      authorName: this.authService.getLastName() || "John",
      authorEmail: this.authService.getCurrentUser().email,
      text: forum.newMessage,
      createdAt: new Date().toISOString()
    };

    this.forumService.addMessage(forum._id, message).subscribe({
      next: () => {
        forum.messages.push(message);
        forum.newMessage = '';
      },
      error: err => console.error('❌ Erreur envoi message :', err)
    });
  }
}


}
