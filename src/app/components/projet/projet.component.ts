import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent {
  @Input() projets: any[] = [];
  @Output() projetCreated = new EventEmitter<any>();
  @Output() projetDeleted = new EventEmitter<number>();

  showForm = false;
  form: any = { nom: '', description: '', type: 'Web Application' };

  constructor(private router: Router) {}

  trackById = (_: number, p: any) => p?.id ?? _;

  toggleForm() { this.showForm = !this.showForm; }

  createProjet() {
    if (!this.form.nom) return;
    this.projetCreated.emit({ ...this.form, name: this.form.nom });
    this.form = { nom: '', description: '', type: 'Web Application' };
    this.showForm = false;
  }

  onDeleteClick(id: number, e: Event) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Supprimer ce projet ?')) this.projetDeleted.emit(id);
  }

  
}