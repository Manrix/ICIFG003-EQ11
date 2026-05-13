# AGENTS.md — Aplicaciones y Tecnologias de la Web

## Monorepo structure

- `backend/` — Spring Boot 2.5.9 (Java 17, Lombok, JPA/Hibernate, PostgreSQL)
- `frontend/` — Angular 21 (Vitest, Prettier)

Base package: `com.example.demo`

## Commands

### Backend (from `backend/`)

```sh
./mvnw spring-boot:run          # Run dev server on :8080
./mvnw test                      # Run tests
./mvnw compile                    # Compile only
```

### Frontend (from `frontend/`)

```sh
npm start                         # Dev server on :4200
npm test                          # Vitest
npx prettier --check .            # Check formatting
npx prettier --write .            # Format
```

**Required order:** compile → test (backend); format check → test (frontend).

## Architecture

### Backend layers

```
controller/ → repository/ → H2/PostgreSQL
  (no service layer yet)
```

- Entities use Lombok (`@Data`, `@Builder`, `@AllArgsConstructor`, `@NoArgsConstructor`).
- Repositories extend `CrudRepository` (not `JpaRepository`).
- API prefix: `/api/v1/{resource}`.
- CORS configured per-controller to `http://localhost:4200`.

### Known gaps vs DBA.md spec

`DBA.md` (in both root and `backend/`) defines the canonical entity model. Current code diverges:

| Spec (DBA.md) | Current code | Status |
|---|---|---|
| `Curso` entity (id, nombre, nivel, año) | Missing | Not created |
| `Alumno.curso_id` FK → Curso | `AlumnoEntity.curso` as String | Needs relation fix |
| `RegistroAsistencia.estado` enum (PRESENTE/AUSENTE/ATRASADO) | `tipo` as String | Needs enum |
| `RegistroAsistencia.hora_llegada` nullable | Missing | Not created |
| `RegistroAsistencia.observacion` | Missing | Not created |
| `Justificativo` entity | Missing | Not created |
| `Usuario.rol` | Commented out | Needs enable |

**Rule:** When creating or modifying entities, consult `DBA.md` as the source of truth.

### Business rules from DBA.md

- 1 alumno → 1 asistencia record per day (unique constraint on alumno_id + fecha).
- Justificativo only applies when `estado = AUSENTE`; never for ATRASADO or PRESENTE.
- ATRASADO is a final state — no justification entity for it.
- Never overwrite attendance history (AUSENTE stays AUSENTE; just add Justificativo).
- Display logic: show `estado_asistencia + estado_justificacion` as separate columns.

## Gotchas

- `application.properties` has a typo: `database-plataform` should be `database-platform`. Hibernate dialect still works because Spring Boot falls back, but fix it.
- Database credentials are hardcoded in `application.properties`. Use env vars or Spring profiles for non-dev.
- `ddl-auto=update` is fine for dev but dangerous for production — use Flyway or migrations for prod.
- Spring Boot 2.5.9 uses `javax.persistence.*` (not `jakarta.persistence.*`). Don't upgrade imports.
- Repositories use `CrudRepository` — some JPA methods like `findAll(Pageable)` won't be available without switching to `JpaRepository`.

## Frontend

- Angular 21 + standalone components (no modules).
- Test runner: Vitest (not Karma/Jasmine).
- Prettier config: `.prettierrc` in `frontend/`.

## verify checklist after changes

- `./mvnw compile` (backend) — catches annotation and dependency errors.
- `./mvnw test` (backend) — currently only context load test; add real tests.
- `npm test` (frontend) — currently no spec files; add real tests.