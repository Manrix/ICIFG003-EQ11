import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from '../auth/login/login';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, Login],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  showLoginModal = false;

  openLogin() {
    this.showLoginModal = true;
  }

  closeLogin(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showLoginModal = false;
  }

  openRegister() {
    // Por ahora solo un alert, luego podemos hacer un modal o ruta
    alert('Función de registro en construcción...');
  }
}
