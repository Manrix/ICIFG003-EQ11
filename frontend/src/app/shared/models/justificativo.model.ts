export enum EstadoJustificativo {
  PENDIENTE = 'PENDIENTE',
  APROBADO = 'APROBADO',
  RECHAZADO = 'RECHAZADO',
}

export interface Justificativo {
  id: number;
  registroAsistenciaId: number;
  motivo: string;
  fechaEnvio: string;
  estado: EstadoJustificativo;
  documento: string | null;
}

export type JustificativoCreate = Omit<Justificativo, 'id' | 'fechaEnvio' | 'estado'>;
