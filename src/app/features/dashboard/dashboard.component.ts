// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

interface Contact {
  id: number;
  phoneBookType: {
    id: number;
    name: string;
  };
  phone: string;
  contactName: string;
  description: string;
  active: boolean;
  createdBy: string;
  createdDate: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h2>Bienvenido al Dashboard</h2>
      <p *ngIf="authService.getUser()">
        Hola, {{ authService.getUser()?.email }}
      </p>
      <p>Rol: {{ authService.getUserRole() }}</p>

      <button *ngIf="authService.getUserRole() === 'admin'" (click)="goToAdmin()">
        Administrar
      </button>

      <div *ngIf="isLoading">Cargando contactos...</div>
      <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>

      <table *ngIf="contacts.length > 0" class="contacts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let contact of contacts">
            <td>{{ contact.id }}</td>
            <td>{{ contact.contactName }}</td>
            <td>{{ contact.phone }}</td>
            <td>{{ contact.phoneBookType.name }}</td>
            <td>{{ contact.description }}</td>
            <td>{{ contact.active ? 'Sí' : 'No' }}</td>
          </tr>
        </tbody>
      </table>

      <button (click)="logout()">Cerrar Sesión</button>
    </div>
  `,
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    public authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.isLoading = true;
    this.errorMessage = null;

    this.apiService.getContacts().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.code === 0) {
          this.contacts = response.result.elements;
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}