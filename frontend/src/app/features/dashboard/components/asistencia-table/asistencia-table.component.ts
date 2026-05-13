import { Component, input, output, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Alumno } from '../../../../shared/models/alumno.model';
import type { RegistroAsistencia } from '../../../../shared/models/asistencia.model';
import { EstadoAsistencia } from '../../../../shared/models/asistencia.model';

interface EffectiveRow {
  alumno: Alumno;
  registro: RegistroAsistencia | undefined;
  effectiveEstado: EstadoAsistencia;
  effectiveHoraLlegada: string | null;
  effectiveObservacion: string | null;
  isDraft: boolean;
}

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
  readonly drafts = input<
    Map<number, { estado: EstadoAsistencia; horaLlegada?: string; observacion?: string }>
  >(new Map());

  readonly cambiarEstado = output<{
    alumnoId: number;
    estado: EstadoAsistencia;
    horaLlegada?: string;
    observacion?: string;
  }>();
  readonly justificar = output<RegistroAsistencia>();
  readonly fechaChange = output<string>();
  readonly guardar = output<void>();
  readonly marcarTodosPresente = output<void>();
  readonly draftCountChange = output<number>();

  protected readonly EstadoAsistencia = EstadoAsistencia;
  readonly estados = [
    EstadoAsistencia.PRESENTE,
    EstadoAsistencia.AUSENTE,
    EstadoAsistencia.ATRASADO,
  ];

  readonly mergedRows = computed<EffectiveRow[]>(() => {
    const alumnos = this.alumnos();
    const registros = this.registros();
    const drafts = this.drafts();
    return alumnos.map((alumno) => {
      const reg = registros.find((r) => r.alumnoId === alumno.id);
      const draft = drafts.get(alumno.id);
      const effectiveEstado =
        draft?.estado ?? reg?.estado ?? EstadoAsistencia.PRESENTE;
      const effectiveHoraLlegada =
        draft?.horaLlegada ?? reg?.horaLlegada ?? null;
      const effectiveObservacion =
        draft?.observacion ?? reg?.observacion ?? null;
      return {
        alumno,
        registro: reg,
        effectiveEstado,
        effectiveHoraLlegada,
        effectiveObservacion,
        isDraft: draft !== undefined,
      };
    });
  });

  readonly draftCount = computed(() => this.drafts().size);

  constructor() {
    effect(() => {
      this.draftCountChange.emit(this.draftCount());
    });
  }

  readonly resumen = computed(() => {
    const rows = this.mergedRows();
    return {
      presentes: rows.filter((r) => r.effectiveEstado === EstadoAsistencia.PRESENTE).length,
      ausentes: rows.filter((r) => r.effectiveEstado === EstadoAsistencia.AUSENTE).length,
      atrasados: rows.filter((r) => r.effectiveEstado === EstadoAsistencia.ATRASADO).length,
    };
  });

  onEstadoChange(row: EffectiveRow, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const estado = select.value as EstadoAsistencia;
    this.selectEstado(row, estado);
  }

  selectEstado(row: EffectiveRow, estado: EstadoAsistencia): void {
    if (estado === EstadoAsistencia.ATRASADO) {
      this.cambiarEstado.emit({
        alumnoId: row.alumno.id,
        estado,
        horaLlegada: row.effectiveHoraLlegada ?? undefined,
        observacion: row.effectiveObservacion ?? undefined,
      });
    } else {
      this.cambiarEstado.emit({
        alumnoId: row.alumno.id,
        estado,
        horaLlegada: undefined,
        observacion: undefined,
      });
    }
  }

  onHoraLlegadaChange(row: EffectiveRow, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cambiarEstado.emit({
      alumnoId: row.alumno.id,
      estado: row.effectiveEstado,
      horaLlegada: input.value,
      observacion: row.effectiveObservacion ?? undefined,
    });
  }

  onObservacionChange(row: EffectiveRow, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.cambiarEstado.emit({
      alumnoId: row.alumno.id,
      estado: row.effectiveEstado,
      horaLlegada: row.effectiveHoraLlegada ?? undefined,
      observacion: input.value,
    });
  }

  onMarcarTodosPresente(): void {
    this.marcarTodosPresente.emit();
  }
}
