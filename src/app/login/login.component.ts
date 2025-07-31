import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  // title = 'Connexion'; // Décommente cette ligne si tu utilises {{ title }}

  constructor(private authService: AuthService, private router: Router) {}
onSubmit(): void {
  this.authService.login(this.email, this.password).subscribe({
    next: (response: { token: string; role: string }) => {
      localStorage.setItem('token', response.token);

      if (response.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    },
    error: () => {
      this.error = 'Email ou mot de passe incorrect';
    }
  });
}

  goToRegister() {
  this.router.navigate(['/register']);
}

}
