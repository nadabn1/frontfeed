import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-navbar></app-navbar><router-outlet></router-outlet>`,
})
export class AppComponent {}

// ✅ src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
];