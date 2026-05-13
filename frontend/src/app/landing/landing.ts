import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from '../auth/login/login';
import { Register } from '../auth/register/register';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, Login, Register],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  showLoginModal = false;
  showRegisterModal = false;

  openLogin() {
    this.showRegisterModal = false;
    this.showLoginModal = true;
  }

  closeLogin(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showLoginModal = false;
  }

  openRegister() {
    this.showLoginModal = false;
    this.showRegisterModal = true;
  }

  closeRegister(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.showRegisterModal = false;
  }
}
