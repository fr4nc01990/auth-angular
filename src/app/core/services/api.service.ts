// src/app/core/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Interfaz para la estructura de un contacto
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

// Interfaz para la respuesta del endpoint /api/getAll
interface GetAllResponse {
  code: number;
  message: string;
  result: {
    elements: Contact[];
    total: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de contactos desde el backend
   */
  getContacts(): Observable<GetAllResponse> {
    return this.http.get<GetAllResponse>(`${this.apiUrl}/getAll`).pipe(
      catchError((error) => {
        let errorMessage = 'Error al obtener los contactos';
        if (error.status === 404) {
          errorMessage = 'Recurso no encontrado';
        } else if (error.status === 500) {
          errorMessage = 'Error del servidor, intenta de nuevo más tarde';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}