import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(Auth);

  credentials = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  isLoading = false;
  errorMessage = '';
  successMessage = '';

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.credentials.password !== this.credentials.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.isLoading = true;

    this.authService
      .register({
        username: this.credentials.username,
        password: this.credentials.password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Registro exitoso. Ya podés iniciar sesión.';
          this.credentials = { username: '', password: '', confirmPassword: '' };
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage =
            err?.error === 'Usuario Incorrecto'
              ? 'Ese nombre de usuario ya existe.'
              : 'Error al registrar. Intentá de nuevo.';
          console.error('Register error', err);
        },
      });
  }
}