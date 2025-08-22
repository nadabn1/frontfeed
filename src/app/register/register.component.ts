import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegisterUser } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

    // Create the user object according to the RegisterUser interface
    const user: RegisterUser = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password
    };

    // Call the register method with the user object
    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Erreur lors de la création du compte.';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}