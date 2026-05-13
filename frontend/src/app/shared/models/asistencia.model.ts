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

export interface BatchRegistroAsistenciaRequest {
  registros: RegistroAsistenciaCreate[];
}

export interface BatchRegistroAsistenciaResponse {
  savedRecords: RegistroAsistencia[];
  totalSaved: number;
}
