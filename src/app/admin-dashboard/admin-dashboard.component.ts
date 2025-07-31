import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjetComponent } from '../components/projet/projet.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ProjetComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {}
