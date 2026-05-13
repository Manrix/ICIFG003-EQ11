# Guía de Estructura y Buenas Prácticas — Frontend Angular

Reglas obligatorias para mantener la coherencia y calidad del frontend.

---

## 1. Estructura de Carpetas

```
src/app/
  core/           → Servicios globales, interceptores, guards (singleton)
    auth/
      auth.ts       Servicio de autenticación
      auth-guard.ts
    interceptors/
  shared/         → Componentes, pipes y modelos reutilizables
    components/
      loading-spinner/
    pipes/
    models/         Interfaces y tipos (viene aquí, NO en features)
  features/       → Cada feature en su carpeta
    dashboard/
    asistencia/
    alumnos/
  app.ts
  app.routes.ts
  app.config.ts
```

### Regla por carpeta

| Carpeta | Contenido | Instanciamiento |
|---------|-----------|-----------------|
| `core/` | Servicios globales (auth, HTTP, logging) | `providedIn: 'root'` |
| `shared/` | Componentes UI reutilizables, pipes, modelos | Importado donde se necesita |
| `features/` | Una carpeta por dominio de negocio | Lazy-loaded en rutas |

---

## 2. Convenciones de Nomenclatura

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Componente | `kebab-case` para carpeta y archivos | `alumno-list/alumno-list.ts` |
| Servicio | `kebab-case.service.ts` | `alumno.service.ts` |
| Modelo / Interface | `kebab-case.model.ts` | `alumno.model.ts` |
| Rutas | `kebab-case.routes.ts` | `alumno.routes.ts` |
| Guard | `kebab-case-guard.ts` | `auth-guard.ts` |
| Interceptor | `kebab-case.interceptor.ts` | `auth.interceptor.ts` |
| Selector | `app-kebab-case` | `app-alumno-list` |

**Siempre** standalone. Cero NgModules.

---

## 3. Arquitectura de Componentes

### 3.1 Componentes Smart vs Presentational

- **Smart (pages/containers):** inyectan servicios, manejan estado, despachan acciones. Viven en `features/*/pages/`.
- **Presentational (components):** reciben datos vía `@Input()`, emiten eventos vía `@Output()`. Viven en `features/*/components/` o `shared/components/`.

Un componente NO debe ser smart Y presentational al mismo tiempo.

### 3.2 Regla del componente delgado

Un componente `.ts` NO debe contener lógica de negocio. Si necesitás calcular algo, transformar datos, o hacer lógica condicional compleja, esa lógica va en un servicio o en la clase del modelo.

```typescript
// ❌ Mal — lógica en el componente
totalAlumnos() { return this.alumnos.filter(a => a.activo).length; }

// ✅ Bien — lógica en el servicio
// alumno.service.ts
getActivos(): Alumno[] { return this.alumnos().filter(a => a.activo); }
```

### 3.3 No usar `any`

Siempre tipar con interfaces. Los modelos viven en `shared/models/` y se importan donde se necesitan.

```typescript
// ❌ Mal
login(credentials: any): Observable<any> { ... }

// ✅ Bien
login(credentials: LoginRequest): Observable<LoginResponse> { ... }
```

---

## 4. Servicios y Estado

### 4.1 Un servicio = una responsabilidad

- `AuthService` → solo autenticación (login, logout, sesión).
- `AlumnoService` → solo CRUD de alumnos.
- No mezclar responsabilidades en el mismo servicio.

### 4.2 Signals para estado reactivo

Para estado local del componente o simple, usar `signal()` y `computed()`.
Para estado compartido entre componentes, usar un servicio con signals.

```typescript
// alumno.service.ts
private readonly alumnosSignal = signal<Alumno[]>([]);
readonly alumnos = this.alumnosSignal.asReadonly();

loadAlumnos() {
  this.http.get<Alumno[]>(this.apiUrl).subscribe({
    next: (data) => this.alumnosSignal.set(data),
  });
}
```

### 4.3 URLs de API desde environments

**Nunca** hardcodear URLs de API en servicios. Usar `environment.ts`:

```typescript
// environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:8080/api/v1'
};

// services/*.ts
private apiUrl = environment.apiUrl;
```

---

## 5. HTTP e Interceptores

### 5.1 Interceptor de autenticación

Todos los requests autenticados deben llevar el token (cuando se implemente). Crear un interceptor en `core/interceptors/`:

```typescript
// auth.interceptor.ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};
```

Registrar en `app.config.ts` vía `provideHttpClient(withInterceptors([authInterceptor]))`.

### 5.2 Manejo centralizado de errores

Crear un interceptor que capture errores HTTP comunes (401 → redirect login, 403 → acceso denegado, 500 → mensaje genérico).

---

## 6. Rutas y Lazy Loading

Todas las rutas de features se cargan con lazy loading:

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', component: Landing },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.page')
      .then(m => m.DashboardPage),
  },
];
```

Nunca importar directamente un componente de feature en las rutas principales si puede ser lazy.

---

## 7. Formularios

### 7.1 Formularios reactivos para todo lo que no sea trivial

Usar `ReactiveFormsModule` + `FormBuilder` para:
- Registro / Login
- CRUD forms
- Cualquier formulario con validación compleja

Usar `FormsModule` (template-driven) solo para casos simples (search bar, toggle).

### 7.2 Validaciones

- **Sincrónicas:** `required`, `minLength`, `maxLength`, `pattern` en el `FormControl`.
- **Asincrónicas:** solo si hay que validar contra el backend (ej: username ya existe).
- **Mensajes de error:** centralizar un servicio/método que mapee errores a mensajes legibles.

```typescript
// ❌ Mal
this.credentials.usernameValidator = ...;

// ✅ Bien
username: new FormControl('', [Validators.required, Validators.minLength(3)])
```

---

## 8. Estilos y UI

### 8.1 Paleta institucional

| Uso | Color | Variable sugerida |
|-----|-------|-------------------|
| Primario (fondo botones, header) | `#1b2560` | `--color-primary` |
| Secundario (highlight, acentos) | `#ffb300` | `--color-accent` |
| Fondo claro | `#f0f4f8` | `--color-bg` |
| Texto principal | `#333` | `--color-text` |
| Error | `#dc3545` | `--color-error` |
| Éxito | `#28a745` | `--color-success` |

Migrar colores sueltos a CSS custom properties en `styles.css`. Mientras tanto, respetar esta paleta en componentes nuevos.

### 8.2 Glassmorphism y modales

El patrón actual usa glassmorphism (backdrop-filter) para header y hero, y modales overlay centrados. Mantener consistencia:
- `.modal-overlay` → fondo oscuro con blur
- `.modal-content` → blanco con `border-top: 4px solid var(--color-accent)`

### 8.3 No scrollear infinitamente en archivos CSS

Si un archivo `.css` supera ~150 líneas, extraer mixins o subdividir componentes.

---

## 9. Testing

- Runner: **Vitest** (no Karma/Jasmine).
- Un archivo `.spec.ts` por componente/servicio.
- Testear:
  1. Servicios → métodos públicos, llamadas HTTP mockeadas.
  2. Guards → casos true/false.
  3. Componentes → render y bindings básicos.
- Orden obligatorio: **format check → test**.

---

## 10. Checklist antes de cada cambio

- [ ] ¿Usé interfaces tipadas en vez de `any`?
- [ ] ¿El componente es smart O presentational, no ambos?
- [ ] ¿La URL de API viene de `environment`?
- [ ] ¿Los colores siguen la paleta institucional?
- [ ] ¿Las rutas de features usan lazy loading?
- [ ] ¿Corrí `npx prettier --check .` antes de commitear?
- [ ] ¿Corrí `npm test` antes de commitear?