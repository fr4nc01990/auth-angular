// src/app/auth/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[]; // Roles permitidos para la ruta
    const userRole = this.authService.getUserRole();

    if (userRole && requiredRoles.includes(userRole)) {
      return true; // El usuario tiene un rol permitido
    } else {
      this.router.navigate(['/auth/login']); // Redirigir si no tiene permiso
      return false;
    }
  }
}