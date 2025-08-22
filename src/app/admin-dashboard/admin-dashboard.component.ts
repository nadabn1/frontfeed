// src/app/admin-dashboard/admin-dashboard.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjetService } from '../services/projet.service';
import { ProjetComponent } from '../components/projet/projet.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProjetComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  projets: any[] = [];
  @ViewChild('projetComponent') projetComponent: any;

  constructor(private projetService: ProjetService, private router: Router) {}

  ngOnInit(): void { this.loadProjets(); }

  loadProjets(): void {
    this.projetService.getAll().subscribe(list => {
      this.projets = (list ?? []).map(p => ({
        id: p.id,
        nom: p.nom ?? p.name ?? 'Sans nom',
        description: p.description ?? '',
        type: p.type ?? ''
      }));
    });
  }

  toggleModal(): void { this.projetComponent?.toggleForm(); }

  // ✅ création: POST + navigate vers le projet créé
  handleProjetCreated = (payload: any) => {
    this.projetService.create(payload).subscribe(created => {
      // rafraîchir la liste
      this.projets = [...this.projets, {
        id: created.id,
        nom: created.nom ?? created.name ?? payload.name,
        description: created.description ?? payload.description ?? '',
        type: created.type ?? payload.type ?? ''
      }];

      this.router.navigate(['/admin/projets', created.id]);
    });
  };

  // ✅ suppression: DELETE + mise à jour + navigation sûre
  handleProjetDeleted = (id: number) => {
    this.projetService.delete(id).subscribe({
      next: () => {
        this.projets = this.projets.filter(p => p.id !== id);
        // si on regarde le projet supprimé → revenir au placeholder
        this.router.navigate(['/admin/projets']);
      },
      error: () => {
        // Option: message d’erreur UI
        alert('Suppression impossible (voir logs serveur).');
      }
    });
  };
}
