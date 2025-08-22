import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, RegisterUser } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
<<<<<<< HEAD
  styleUrls: ['./register.component.css'] // ou auth.css si partagé
})
export class RegisterComponent {
  user = { email: '', password: '', role: '' };
=======
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
>>>>>>> ca9a7c41097eda0f8ceda78b09bd752dcb0df9ba
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

<<<<<<< HEAD
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
=======
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
}
>>>>>>> ca9a7c41097eda0f8ceda78b09bd752dcb0df9ba
