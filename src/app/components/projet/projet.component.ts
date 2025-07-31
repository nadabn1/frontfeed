import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projets: any[] = [];
  projet = {
    name: '',
    description: '',
    type: 'Web Application'
  };
  showForm = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllProjets();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  getAllProjets() {
    this.http.get<any[]>('http://localhost:8080/admin/projets')
      .subscribe(data => this.projets = data);
  }
createProjet() {
  console.log('Sending:', this.projet); // debug ici

  this.http.post('http://localhost:8080/admin/projets', this.projet)
    .subscribe({
      next: () => {
        alert("Projet créé avec succès !");
        this.getAllProjets();
        this.projet = { name: '', description: '', type: 'Web Application' };
        this.showForm = false;
      },
      error: (err) => {
        console.error(err); // ajoute ça
        alert("Erreur lors de l’enregistrement du projet.");
      }
    });
}

}
