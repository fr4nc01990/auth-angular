// src/app/auth/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permitir acceso si está autenticado
    } else {
      this.router.navigate(['/auth/login']); // Redirigir a login si no está autenticado
      return false;
    }
  }
}