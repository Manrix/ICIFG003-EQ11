export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  rut: string;
  estado: string;
  cursoId: number;
}

export type AlumnoCreate = Omit<Alumno, 'id'>;
