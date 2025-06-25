import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css']
})
export class DevoirComponent {
  devoir = {
    titre: '',
    etudiant: { name: 'Jean Dupont', email: 'jean@example.com' } // à adapter selon l’utilisateur connecté
  };

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

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
      next: res => console.log('✅ Devoir soumis', res),
      error: err => console.error('❌ Erreur envoi devoir', err)
    });
  }
}
