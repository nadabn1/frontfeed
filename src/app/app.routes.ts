// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProjetWorkspaceComponent } from './components/projet/projet-workspace.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      // ✅ on permet l’affichage du workspace SANS id (placeholder)
      { path: 'projets', component: ProjetWorkspaceComponent },
      // ✅ et AVEC id (affiche le projet)
      { path: 'projets/:id', component: ProjetWorkspaceComponent },
      // ✅ plus de redirection vers /projets/1 (qui causait le 404)
      { path: '', pathMatch: 'full', redirectTo: 'projets' }
    ]
  }
];
