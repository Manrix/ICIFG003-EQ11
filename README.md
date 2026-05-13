# Proyecto de Aplicaciones y Tecnologías de la Web

Repositorio monorepo con una aplicación de control de asistencia:

- `backend/`: API REST en Spring Boot 2.5.9 con Java 17, JPA/Hibernate, Lombok y PostgreSQL.
- `frontend/`: Aplicación Angular 21 con Vitest y Prettier.

## Requisitos previos

- Java 17
- Node.js y npm
- PostgreSQL en ejecución

## Puesta en marcha completa

Ejecuta los pasos en este orden para levantar el proyecto de forma consistente.

### 1. Base de datos

La aplicación usa la base `test` en `localhost:5432` con el usuario `postgres`.

```bash
createdb -U postgres test
```

Si prefieres crearla desde `psql`, también puedes usar:

```bash
psql -U postgres
CREATE DATABASE test;
\q
```

### 2. Backend

```bash
cd backend
./mvnw compile
./mvnw test
./mvnw spring-boot:run
```

Comandos útiles adicionales:

```bash
./mvnw clean compile
./mvnw clean test
```

El backend arranca en `http://localhost:8080`.

### 3. Frontend

Abre otra terminal para el frontend:

```bash
cd frontend
npm install
npx prettier --check .
npm test
npm start
```

Comandos útiles adicionales:

```bash
npm run build
npm run watch
npx prettier --write .
```

El frontend arranca en `http://localhost:4200`.

## Orden recomendado de trabajo

1. Crear la base de datos.
2. Compilar el backend con `./mvnw compile`.
3. Ejecutar los tests del backend con `./mvnw test`.
4. Verificar formato del frontend con `npx prettier --check .`.
5. Ejecutar los tests del frontend con `npm test`.
6. Levantar el backend con `./mvnw spring-boot:run`.
7. Levantar el frontend con `npm start`.

## Documentación adicional

- Modelo de datos y entidades: `backend/docs/DBA.md`.
- Reglas y prácticas de frontend: `frontend/docs/practicas.md`.

