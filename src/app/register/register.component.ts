import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // ou auth.css si partagé
})
export class RegisterComponent {
  user = { email: '', password: '', role: '' };
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.authService.register(this.user).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = "Une erreur est survenue lors de l'inscription.";
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
