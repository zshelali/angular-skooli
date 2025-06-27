import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showAddUeForm = false;

  newUe = {
    title: '',
    description: '',
    image: '',
    date_updated: new Date()
  };

  courses = [
    {
      title: 'Mathématiques Avancées',
      description: 'Introduction aux bases de la logique mathématique',
      date_updated: new Date('2025-04-03'),
      image: 'assets/img/it41_gpt.png'
    },
    {
      title: 'Physique Quantique',
      description: 'Les fondements de la mécanique quantique',
      date_updated: new Date('2025-05-01'),
      image: 'assets/img/it44_gpt.png'
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newUe.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addCourse(): void {
    this.courses.push({
      title: this.newUe.title,
      description: this.newUe.description,
      image: this.newUe.image,
      date_updated: new Date()
    });

    this.newUe = {
      title: '',
      description: '',
      image: '',
      date_updated: new Date()
    };
    this.showAddUeForm = false;
  }
}
