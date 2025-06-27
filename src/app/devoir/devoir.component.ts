import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css']
})
export class DevoirComponent implements OnInit {
  devoir = {
    titre: '',
    etudiant: { name: 'Jean Dupont', email: 'jean@example.com' } // à adapter selon l’utilisateur connecté
  };

  selectedFile: File | null = null;
  devoirsSoumis: any[] = [];
  user: any ;

  // Champs temporaires pour noter
  tempNotes: { [key: string]: number } = {};
  tempCommentaires: { [key: string]: string } = {};

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadDevoirs();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitDevoir(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('titre', this.devoir.titre);
    formData.append('etudiant', JSON.stringify(this.devoir.etudiant));

    this.http.post('http://localhost:3000/api/devoirs', formData).subscribe({
      next: res => {
        console.log('✅ Devoir soumis', res);
        this.devoir.titre = '';
        this.selectedFile = null;
        this.loadDevoirs();
      },
      error: err => console.error('❌ Erreur envoi devoir', err)
    });
  }

  loadDevoirs(): void {
    this.http.get<any[]>('http://localhost:3000/api/devoirs').subscribe({
      next: data => {
        this.devoirsSoumis = data;
        // Initialiser les champs de correction temporaires
        data.forEach(d => {
          this.tempNotes[d._id] = d.note || 0;
          this.tempCommentaires[d._id] = d.commentaire || '';
        });
      },
      error: err => console.error('❌ Erreur chargement devoirs', err)
    });
  }
  
  corrigerDevoir(devoir: any): void {
    const correction = {
      note: this.tempNotes[devoir._id],
      commentaire: this.tempCommentaires[devoir._id]
    };

    this.http.patch(`http://localhost:3000/api/devoirs/${devoir._id}`, correction).subscribe({
      next: () => {
        console.log('✅ Devoir corrigé');
        this.loadDevoirs();
      },
      error: err => console.error('❌ Erreur correction', err)
    });
  }
}
