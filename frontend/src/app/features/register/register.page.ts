import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth';
import { RegisterRequest } from '../../shared/models/auth.model';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.page.html',
  styleUrl: './register.page.css',
})
export class RegisterPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator },
  );

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  get username() {
    return this.registerForm.get('username')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')!;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.errorMessage.set('');
    this.successMessage.set('');
    this.isLoading.set(true);

    const data: RegisterRequest = {
      username: this.registerForm.value.username ?? '',
      password: this.registerForm.value.password ?? '',
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('¡Registro exitoso! Ya podés iniciar sesión.');
        this.registerForm.reset();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err?.status === 409
            ? 'Ese nombre de usuario ya existe.'
            : 'Error al registrar. Intentá de nuevo.',
        );
      },
    });
  }
}
