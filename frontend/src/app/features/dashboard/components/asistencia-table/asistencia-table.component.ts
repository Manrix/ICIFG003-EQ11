import { Component, input, output, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Alumno } from '../../../../shared/models/alumno.model';
import type { RegistroAsistencia } from '../../../../shared/models/asistencia.model';
import { EstadoAsistencia } from '../../../../shared/models/asistencia.model';

@Component({
  selector: 'app-asistencia-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './asistencia-table.component.html',
  styleUrl: './asistencia-table.component.css',
})
export class AsistenciaTableComponent {
  readonly alumnos = input.required<Alumno[]>();
  readonly registros = input.required<RegistroAsistencia[]>();
  readonly fecha = input.required<string>();
  readonly loading = input<boolean>(false);

  readonly cambiarEstado = output<{
    alumnoId: number;
    estado: EstadoAsistencia;
    horaLlegada?: string;
    observacion?: string;
  }>();
  readonly justificar = output<RegistroAsistencia>();
  readonly fechaChange = output<string>();
  readonly guardar = output<void>();

  protected readonly EstadoAsistencia = EstadoAsistencia;
  readonly estados = [
    EstadoAsistencia.PRESENTE,
    EstadoAsistencia.AUSENTE,
    EstadoAsistencia.ATRASADO,
  ];

  readonly resumen = computed(() => {
    const regs = this.registros();
    return {
      presentes: regs.filter((r) => r.estado === EstadoAsistencia.PRESENTE).length,
      ausentes: regs.filter((r) => r.estado === EstadoAsistencia.AUSENTE).length,
      atrasados: regs.filter((r) => r.estado === EstadoAsistencia.ATRASADO).length,
    };
  });

  registroForAlumno(alumnoId: number): RegistroAsistencia | undefined {
    return this.registros().find((r) => r.alumnoId === alumnoId);
  }

  onEstadoChange(alumnoId: number, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const estado = select.value as EstadoAsistencia;
    const reg = this.registroForAlumno(alumnoId);
    if (estado === EstadoAsistencia.ATRASADO) {
      this.cambiarEstado.emit({
        alumnoId,
        estado,
        horaLlegada: reg?.horaLlegada ?? undefined,
        observacion: reg?.observacion ?? undefined,
      });
    } else {
      this.cambiarEstado.emit({
        alumnoId,
        estado,
        horaLlegada: undefined,
        observacion: undefined,
      });
    }
  }

  onHoraLlegadaChange(alumnoId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const reg = this.registroForAlumno(alumnoId);
    this.cambiarEstado.emit({
      alumnoId,
      estado: reg?.estado ?? EstadoAsistencia.PRESENTE,
      horaLlegada: input.value,
      observacion: reg?.observacion ?? undefined,
    });
  }

  onObservacionChange(alumnoId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const reg = this.registroForAlumno(alumnoId);
    this.cambiarEstado.emit({
      alumnoId,
      estado: reg?.estado ?? EstadoAsistencia.PRESENTE,
      horaLlegada: reg?.horaLlegada ?? undefined,
      observacion: input.value,
    });
  }
}
