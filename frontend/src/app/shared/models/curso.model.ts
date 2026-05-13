export interface Curso {
  id: number;
  nombre: string;
  nivel: string;
  anio: number;
}

export type CursoCreate = Omit<Curso, 'id'>;
