# Proyecto de Aplicaciones y Tecnologías de la Web

Este es un repositorio que contiene una aplicación completa diseñada para la gestión de asistencia, desarrollada con **Spring Boot** en el Backend y **Angular** en el Frontend.

## 🏗️ Estructura del Proyecto

- **`backend/`**: API REST desarrollada en Spring Boot 2.5.9 (Java 17, Lombok, JPA/Hibernate, PostgreSQL).
- **`frontend/`**: Aplicación de frontend desarrollada con Angular 21 (Standalone Components, Vitest, Prettier).

## 🚀 Tecnologías y Stack

**Backend:**
- Java 17
- Spring Boot 2.5.9
- Spring Data JPA (Hibernate)
- Base de datos PostgreSQL
- Lombok

**Frontend:**
- Angular 21 
- TypeScript
- Vitest para testing de unidad
- Prettier para convenciones de formato
- SCSS para estilos

## 💻 Instrucciones de Uso y Ejecución

Primero, clona o descarga este repositorio y abre una terminal.

### Backend

Abre una terminal y colócate en la carpeta `backend/`:
cd backend
# 1. Crear base de datos en terminal (psql)
createdb -U postgres test


# 2. Compilar el proyecto (comprobar que no hay errores de sintaxis)
./mvnw compile

# 3. Correr los tests disponibles
./mvnw test

# 4. Levantar la aplicación en el puerto 8080
./mvnw spring-boot:run

### Frontend

Abre otra terminal y colócate en la carpeta `frontend/`:

cd frontend

# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Levantar la aplicación en vivo en el puerto 4200
npm start



## 📋 Documentación Adicional

- **Base de datos:** Puedes encontrar el modelo de la BD y sus entidades en `backend/docs/DBA.md`. Todas las entidades (Curso, Alumno, RegistroAsistencia, Justificativo) deben estar sincronizadas con este documento base.
- **Prácticas Frontend:** Criterios estandarizados de desarrollo, nomenclatura, uso de Signals en Angular, paletas de colores y reglas restrictivas en `frontend/docs/practicas.md`.

