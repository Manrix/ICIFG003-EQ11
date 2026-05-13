export enum EstadoAsistencia {
  PRESENTE = 'PRESENTE',
  AUSENTE = 'AUSENTE',
  ATRASADO = 'ATRASADO',
}

export interface RegistroAsistencia {
  id: number;
  alumnoId: number;
  cursoId: number;
  fecha: string;
  estado: EstadoAsistencia;
  horaLlegada: string | null;
  observacion: string | null;
}

export type RegistroAsistenciaCreate = Omit<RegistroAsistencia, 'id'>;
