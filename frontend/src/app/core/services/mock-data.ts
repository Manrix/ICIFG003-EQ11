import type { Curso } from '../../shared/models/curso.model';
import type { Alumno } from '../../shared/models/alumno.model';
import type { RegistroAsistencia } from '../../shared/models/asistencia.model';
import type { Justificativo } from '../../shared/models/justificativo.model';
import { EstadoAsistencia } from '../../shared/models/asistencia.model';
import { EstadoJustificativo } from '../../shared/models/justificativo.model';

export const MOCK_CURSOS: Curso[] = [
  { id: 1, nombre: '1° Básico A', nivel: 'Básica', anio: 2024 },
  { id: 2, nombre: '2° Básico B', nivel: 'Básica', anio: 2024 },
  { id: 3, nombre: '3° Medio A', nivel: 'Media', anio: 2024 },
];

export const MOCK_ALUMNOS: Alumno[] = [
  {
    id: 1,
    nombre: 'Martín',
    apellido: 'Rojas Pérez',
    rut: '12.345.678-9',
    estado: 'ACTIVO',
    cursoId: 1,
  },
  {
    id: 2,
    nombre: 'Sofía',
    apellido: 'Tapia López',
    rut: '13.456.789-0',
    estado: 'ACTIVO',
    cursoId: 1,
  },
  {
    id: 3,
    nombre: 'Diego',
    apellido: 'Fuentes Morales',
    rut: '14.567.890-1',
    estado: 'ACTIVO',
    cursoId: 2,
  },
  {
    id: 4,
    nombre: 'Valentina',
    apellido: 'Carrasco Silva',
    rut: '15.678.901-2',
    estado: 'ACTIVO',
    cursoId: 2,
  },
  {
    id: 5,
    nombre: 'Joaquín',
    apellido: 'Herrera Castro',
    rut: '16.789.012-3',
    estado: 'ACTIVO',
    cursoId: 3,
  },
  {
    id: 6,
    nombre: 'Antonia',
    apellido: 'Vega Navarro',
    rut: '17.890.123-4',
    estado: 'ACTIVO',
    cursoId: 3,
  },
];

export const MOCK_REGISTROS: RegistroAsistencia[] = [
  {
    id: 1,
    alumnoId: 1,
    cursoId: 1,
    fecha: '2024-05-13',
    estado: EstadoAsistencia.PRESENTE,
    horaLlegada: null,
    observacion: null,
  },
  {
    id: 2,
    alumnoId: 2,
    cursoId: 1,
    fecha: '2024-05-13',
    estado: EstadoAsistencia.AUSENTE,
    horaLlegada: null,
    observacion: 'No se presentó',
  },
  {
    id: 3,
    alumnoId: 3,
    cursoId: 2,
    fecha: '2024-05-13',
    estado: EstadoAsistencia.ATRASADO,
    horaLlegada: '09:15',
    observacion: 'Llegó tarde por tránsito',
  },
  {
    id: 4,
    alumnoId: 4,
    cursoId: 2,
    fecha: '2024-05-13',
    estado: EstadoAsistencia.PRESENTE,
    horaLlegada: null,
    observacion: null,
  },
  {
    id: 5,
    alumnoId: 5,
    cursoId: 3,
    fecha: '2024-05-13',
    estado: EstadoAsistencia.PRESENTE,
    horaLlegada: null,
    observacion: null,
  },
  {
    id: 6,
    alumnoId: 6,
    cursoId: 3,
    fecha: '2024-05-13',
    estado: EstadoAsistencia.AUSENTE,
    horaLlegada: null,
    observacion: null,
  },
];

export const MOCK_JUSTIFICATIVOS: Justificativo[] = [
  {
    id: 1,
    registroAsistenciaId: 2,
    motivo: 'Consulta médica programada con pediatra',
    fechaEnvio: '2024-05-13T10:30:00',
    estado: EstadoJustificativo.PENDIENTE,
    documento: 'certificado_medico.pdf',
  },
  {
    id: 2,
    registroAsistenciaId: 6,
    motivo: 'Enfermedad respiratoria con reposo',
    fechaEnvio: '2024-05-13T11:00:00',
    estado: EstadoJustificativo.APROBADO,
    documento: null,
  },
];
