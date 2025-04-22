# Frontend de Autenticación y Autorización

**Autor**: Franco Raffa\
**Colaboradores/Auditores**: Mauro Raffa, Martin Raffa

## Descripción

Este proyecto es una aplicación frontend desarrollada en **Angular 17** que implementa un sistema de autenticación y autorización. Se enfoca en aprender conceptos clave como login, registro, protección de rutas, autorización basada en roles (`user` y `admin`), y manejo de sesiones expiradas. El frontend consume un backend Node.js simulado (requerido para funcionar), que proporciona endpoints para autenticación (`/api/auth/login`, `/api/auth/register`) y datos protegidos (`/api/getAll`).

El proyecto incluye:

- Formularios de login y registro con validaciones.
- Protección de rutas y peticiones HTTP con JWT.
- Autorización granular usando roles.
- Manejo de errores HTTP y sesiones expiradas.

## Tecnologías Usadas

- **Angular 17**: Framework frontend con standalone components.
- **TypeScript**: Tipado estático para modelado de datos.
- **RxJS**: Manejo de flujos asíncronos (operadores `tap`, `catchError`).
- **Angular Reactive Forms**: Formularios dinámicos con validaciones.
- **Angular Router**: Navegación y guards para rutas protegidas.
- **HttpClient**: Consumo de APIs RESTful.
- **CSS**: Estilos personalizados para una UI consistente.
- **localStorage**: Persistencia de tokens y datos de usuario.

## Prerrequisitos

- **Node.js 16+**: Para instalar dependencias y ejecutar el frontend.
- **Angular CLI 17+**: Para compilar y servir la aplicación.
- **Backend Node.js**: El frontend requiere un backend Node.js (desarrollado en paralelo) corriendo en `http://localhost:8081`. Consulta el repositorio del backend o sigue las instrucciones abajo para levantarlo.

## Instalación

### 1. Levantar el Backend (Requerido)

El frontend depende de un backend Node.js que proporciona los endpoints de autenticación y datos. Sigue estos pasos para iniciarlo:

1. Clona el repositorio del backend (o usa el código proporcionado en el proyecto).

2. Navega a la carpeta del backend:

   ```bash
   cd backend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo del backend:

   ```bash
   npm run dev
   ```

   - El backend estará disponible en `http://localhost:8081`.
   - Asegúrate de que el archivo `users.json` esté configurado con usuarios de prueba (ver abajo).

### 2. Configurar el Frontend

1. Clona este repositorio (o navega a la carpeta del frontend):

   ```bash
   cd frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Verifica la configuración en `src/environments/environment.ts`:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: "http://localhost:8081/api",
   };
   ```

   Asegúrate de que `apiUrl` apunte al backend (`http://localhost:8081/api`).

### Notas

- El backend debe estar activo para que el frontend funcione, ya que consume endpoints como `/api/auth/login` y `/api/getAll`.
- Si el backend no está corriendo, verás errores de conexión en la consola del navegador.

## Usuarios de Prueba

El backend usa un archivo `users.json` como base de datos simulada. Asegúrate de que incluya estos usuarios de prueba:

```json
[
  {
    "id": "user123",
    "email": "test@example.com",
    "password": "123456",
    "role": "user"
  },
  {
    "id": "admin456",
    "email": "admin@example.com",
    "password": "123456",
    "role": "admin"
  }
]
```

- **Usuario normal**: `test@example.com` / `123456` (rol: `user`).
- **Admin**: `admin@example.com` / `admin123` (rol: `admin`).

## Funcionalidades Principales

- **Login**: Formulario para autenticar usuarios, almacena JWT en `localStorage`.
- **Registro**: Formulario para crear nuevos usuarios, valida emails duplicados.
- **Dashboard**: Muestra contactos desde `/api/getAll`, con contenido condicional según el rol.
- **Admin**: Sección exclusiva para admins, protegida por `RoleGuard`.
- **Autorización**: `RoleGuard` y `RoleDirective` restringen rutas y elementos de UI según el rol.
- **Sesiones Expiradas**: Detecta errores 401 y redirige al login con un mensaje.
