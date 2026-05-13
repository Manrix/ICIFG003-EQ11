# Modelos de la base de datos y sus relaciones

🧠 MODELO FINAL AJUSTADO
🏫 Curso

Curso→NAlumnos

Campos:

id
nombre
año
👨‍🎓 Alumno

Alumno∈Curso

Campos:

id
nombre
rut
curso_id (FK)
estado

📌 Relación:

Un alumno pertenece a un curso
Un curso tiene muchos alumnos
👨‍💼 Usuario
id
username
password
rol

📌 Maneja el sistema (no participa en asistencia directamente)

⭐ 1. ENTIDAD CENTRAL: RegistroAsistencia

RegistroAsistencia=f(alumno,fecha,estado)

📅 RegistroAsistencia

Representa la asistencia diaria del alumno.

Campos:

id
alumno_id (FK)
fecha
estado:
PRESENTE
AUSENTE
ATRASADO
hora_llegada (nullable)
observación
📌 Regla clave:
1 alumno → 1 registro por día
NO se modifica historial
⏱️ 2. ATRASOS (sin justificación)

📌 Regla que definiste:

Los atrasos no se justifican

Entonces:

ATRASADO = estado final
No existe entidad “justificativo” para esto

✔ Simple y correcto

❌ 3. Justificativo (solo para inasistencias)

Justificativo→Inasistencia

📄 Justificativo

Campos:

id
registro_asistencia_id (FK)
motivo
fecha_envio
estado:
PENDIENTE
APROBADO
RECHAZADO
documento (opcional)
📌 Regla importante

✔ SOLO aplica si:

RegistroAsistencia.estado = AUSENTE

❌ No aplica si:

ATRASADO
PRESENTE
🔗 RELACIONES FINALES CORRECTAS
🧩 Modelo completo
Curso 1 → N Alumnos
Alumno 1 → N RegistroAsistencia
RegistroAsistencia (AUSENTE) → 0..1 Justificativo
🧠 REGLAS DE NEGOCIO CLARAS
📌 1. Asistencia diaria obligatoria

Cada alumno tiene registro por fecha.

📌 2. Justificativo solo para ausencias
SI estado == AUSENTE → puede tener justificativo
SI estado != AUSENTE → no aplica
📌 3. Atrasos no se justifican
ATRASADO = estado final
📌 4. No se sobrescribe historia

Nunca cambies:

AUSENTE → PRESENTE ❌

Solo agregas información adicional (justificativo).

🧱 MODELO SIMPLIFICADO FINAL
CURSO
  ↓
ALUMNO
  ↓
REGISTRO_ASISTENCIA
        ↓
   (solo si AUSENTE)
     JUSTIFICATIVO
🚀 VISTA DE SISTEMA REAL
📅 Día normal:
Alumno	Estado
Juan	PRESENTE
Pedro	AUSENTE
Ana	ATRASADO
📝 Si Pedro justifica:
Registro: AUSENTE
Justificativo: APROBADO

👉 Resultado lógico:

AUSENTE (JUSTIFICADO)

💡 AJUSTE IMPORTANTE DE DISEÑO

En vez de cambiar estados, puedes mostrar:

estado_asistencia + estado_justificacion

Ejemplo:

Estado	Justificación
AUSENTE	APROBADO
AUSENTE	PENDIENTE
