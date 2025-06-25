import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';

interface Message {
  author: { name: string; email: string };
  text: string;
  createdAt?: string;
}

interface Forum {
  _id?: string;
  title: string;
  creator: { name: string; email: string };
  messages: Message[];
  createdAt?: string;
  ueCode?: string;

  // Props front uniquement
  showMessages?: boolean;
  newMessage?: string;
}

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  currentUser = { name: 'Jean Dupont', email: 'jean@example.com', role: 'etudiant' };
  forums: Forum[] = [];
  showAddForm = false;
  newTitle = '';

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.loadForums();
  }

  canCreateForum(): boolean {
  return this.currentUser.role === 'prof';
}

  loadForums(): void {
  this.forumService.getForums().subscribe({
    next: data => {
      this.forums = data
        .filter(f => true)
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

    const newForum = {
      title: this.newTitle,
      creator: this.currentUser,
      messages: [],
      ueCode: 'IT41',
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
      author: this.currentUser,
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
