import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { ProjetService } from '../../services/projet.service';

import { BacklogComponent } from '../backlog/backlog/backlog.component';


@Component({
  selector: 'app-projet-workspace',
  standalone: true,
  imports: [CommonModule, BacklogComponent],
  templateUrl: './projet-workspace.component.html',
  styleUrls: ['./projet-workspace.component.css']
})
export class ProjetWorkspaceComponent implements OnDestroy {
  projet: any = null;
  loading = false;
  private sub?: Subscription;

  constructor(private route: ActivatedRoute, private api: ProjetService) {
    this.loadProjet();
  }

  loadProjet(): void {
    this.sub = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || isNaN(id)) return of(null);
        this.loading = true;
        return this.api.getById(id).pipe(
          catchError(() => { this.loading = false; return of(null); })
        );
      })
    ).subscribe((projet: any) => {
      this.projet = projet ? {
        id: projet.id,
        nom: projet.nom || projet.name || 'Sans nom',
        description: projet.description || '',
        type: projet.type || ''
      } : null;
      this.loading = false;
    });
  }

  ngOnDestroy() { this.sub?.unsubscribe(); }
}
