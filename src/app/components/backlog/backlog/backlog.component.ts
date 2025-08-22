import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// ⬇️ on remonte de 3 niveaux depuis components/backlog/backlog/… vers services/
import { BacklogService } from '../../../services/backlog.service';
import { SprintService, SprintPayload } from '../../../services/sprint.service';

type Counters = { all: number; notStarted: number; inProgress: number; done: number };

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css']
})
export class BacklogComponent implements OnInit {
  @Input({ required: true }) projetId!: number;

  backlog: any | null = null; // { id, sprints?: [] }
  sprints: any[] = [];
  counters: Counters = { all: 0, notStarted: 0, inProgress: 0, done: 0 };

  creatingBacklog = false;
  showNewSprint = false;
  sprintForm: SprintPayload = { name: '', startDate: '', endDate: '', statut: 'NOT_STARTED' };
  error: string | null = null;

  constructor(
    private backlogService: BacklogService,
    private sprintService: SprintService
  ) {}

  ngOnInit(): void {
    this.loadBacklog();
  }

  private computeCounters(): void {
    const all = this.sprints.length;
    const notStarted = this.sprints.filter((s: any) => s.statut === 'NOT_STARTED').length;
    const inProgress = this.sprints.filter((s: any) => s.statut === 'IN_PROGRESS').length;
    const done = this.sprints.filter((s: any) => s.statut === 'COMPLETED').length;
    this.counters = { all, notStarted, inProgress, done };
  }

  private loadSprints(backlogId: number, fromDto?: any[]): void {
    if (Array.isArray(fromDto)) {
      this.sprints = fromDto;
      this.computeCounters();
      return;
    }
    this.sprintService.listByBacklog(backlogId).subscribe((list: any[]) => {
      this.sprints = list ?? [];
      this.computeCounters();
    });
  }

  loadBacklog(): void {
    if (!this.projetId) return;
    this.error = null;
    this.backlogService.getByProjet(this.projetId).subscribe({
      next: (data: any) => {
        this.backlog = data;
        const dtoSprints = Array.isArray(data?.sprints) ? data.sprints : undefined;
        this.loadSprints(data.id, dtoSprints);
      },
      error: () => {
        this.backlog = null; // 404 → pas encore de backlog
        this.sprints = [];
        this.computeCounters();
      }
    });
  }

  createBacklog(): void {
    if (!this.projetId || this.creatingBacklog) return;
    this.creatingBacklog = true;
    this.backlogService.createForProjet(this.projetId, {}).subscribe({
      next: (b: any) => {
        this.backlog = b;
        this.loadSprints(b.id, b?.sprints);
        this.creatingBacklog = false;
      },
      error: () => {
        this.error = 'Impossible de créer le backlog.';
        this.creatingBacklog = false;
      }
    });
  }

  toggleNewSprint(): void {
    this.showNewSprint = !this.showNewSprint;
    if (this.showNewSprint) {
      this.sprintForm = { name: '', startDate: '', endDate: '', statut: 'NOT_STARTED' };
    }
  }

  addSprint(): void {
    if (!this.backlog?.id || !this.sprintForm.name?.trim()) return;
    this.sprintService.add(this.backlog.id, this.sprintForm).subscribe({
      next: (s: any) => {
        this.sprints.push(s);
        this.computeCounters();
        this.showNewSprint = false;
      },
      error: () => (this.error = 'Création du sprint impossible.')
    });
  }

  deleteSprint(id: number): void {
    if (!confirm('Supprimer ce sprint ?')) return;
    this.sprintService.delete(id).subscribe({
      next: () => {
        this.sprints = this.sprints.filter((sp: any) => sp.id !== id);
        this.computeCounters();
      },
      error: () => (this.error = 'Suppression du sprint impossible.')
    });
  }

  trackById = (_: number, s: any) => s?.id ?? _;
}
