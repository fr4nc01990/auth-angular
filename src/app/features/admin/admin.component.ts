// src/app/features/admin/admin.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <h2>Panel de Administración</h2>
      <p>Solo visible para administradores.</p>
      <p>Usuario: {{ authService.getUser()?.email }}</p>
      <p>Rol: {{ authService.getUserRole() }}</p>
      <button (click)="logout()">Cerrar Sesión</button>
    </div>
  `,
  styles: [
    `
      .admin-container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        text-align: center;
      }
      h2 {
        margin-bottom: 20px;
      }
      button {
        padding: 10px 20px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      button:hover {
        background-color: #c82333;
      }
    `,
  ],
})
export class AdminComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}