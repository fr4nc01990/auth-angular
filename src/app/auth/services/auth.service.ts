// src/app/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Interfaz para las credenciales de login y registro
interface Credentials {
  email: string;
  password: string;
}

// Interfaz para la respuesta del backend
interface AuthResponse {
  code: number;
  message: string;
  result: {
    token: string;
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
}

// Interfaz para el usuario almacenado
interface User {
  id: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Inicia sesión enviando credenciales al backend
   */
  login(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        if (response.code === 0) {
          localStorage.setItem(this.TOKEN_KEY, response.result.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.result.user));
        } else {
          throw new Error(response.message);
        }
      }),
      catchError((error) => {
        let errorMessage = 'Error al iniciar sesión';
        if (error.status === 401) {
          errorMessage = 'Credenciales inválidas';
        } else if (error.status === 400) {
          errorMessage = 'Email y contraseña son requeridos';
        } else if (error.status === 500) {
          errorMessage = 'Error del servidor, intenta de nuevo más tarde';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Registra un nuevo usuario
   */
  register(credentials: Credentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, credentials).pipe(
      tap((response: AuthResponse) => {
        if (response.code === 0) {
          localStorage.setItem(this.TOKEN_KEY, response.result.token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(response.result.user));
        } else {
          throw new Error(response.message);
        }
      }),
      catchError((error) => {
        let errorMessage = 'Error al registrar';
        if (error.status === 409) {
          errorMessage = 'El email ya está registrado';
        } else if (error.status === 400) {
          errorMessage = 'Email y contraseña son requeridos';
        } else if (error.status === 500) {
          errorMessage = 'Error del servidor, intenta de nuevo más tarde';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Cierra la sesión
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obtiene el token actual
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Obtiene los datos del usuario autenticado
   */
  getUser(): User | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Obtiene el rol del usuario autenticado
   */
  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }
}