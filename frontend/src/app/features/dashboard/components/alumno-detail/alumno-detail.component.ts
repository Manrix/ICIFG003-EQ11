import { Component, input, output } from '@angular/core';
import type { Alumno } from '../../../../shared/models/alumno.model';
import type { RegistroAsistencia } from '../../../../shared/models/asistencia.model';
import type { Justificativo } from '../../../../shared/models/justificativo.model';
import { EstadoJustificativo } from '../../../../shared/models/justificativo.model';

@Component({
  selector: 'app-alumno-detail',
  standalone: true,
  imports: [],
  templateUrl: './alumno-detail.component.html',
  styleUrl: './alumno-detail.component.css',
})
export class AlumnoDetailComponent {
  readonly alumno = input.required<Alumno>();
  readonly registros = input.required<RegistroAsistencia[]>();
  readonly justificativos = input.required<Justificativo[]>();

  readonly cerrar = output<void>();

  justificativoForRegistro(registroId: number): Justificativo | undefined {
    return this.justificativos().find((j) => j.registroAsistenciaId === registroId);
  }

  estadoJustificacion(j: Justificativo | undefined): string {
    if (!j) return '—';
    switch (j.estado) {
      case EstadoJustificativo.PENDIENTE:
        return 'Pendiente';
      case EstadoJustificativo.APROBADO:
        return 'Aprobado';
      case EstadoJustificativo.RECHAZADO:
        return 'Rechazado';
      default:
        return '—';
    }
  }
}
