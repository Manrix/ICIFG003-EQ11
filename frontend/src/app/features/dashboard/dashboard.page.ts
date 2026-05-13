import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { AuthService } from '../../core/auth/auth';
import { CursoService } from '../../core/services/curso.service';
import { AlumnoService } from '../../core/services/alumno.service';
import { AsistenciaService } from '../../core/services/asistencia.service';
import { JustificativoService } from '../../core/services/justificativo.service';

import type { Curso, CursoCreate } from '../../shared/models/curso.model';
import type { Alumno, AlumnoCreate } from '../../shared/models/alumno.model';
import type {
  RegistroAsistencia,
  RegistroAsistenciaCreate,
} from '../../shared/models/asistencia.model';
import { EstadoAsistencia } from '../../shared/models/asistencia.model';
import type { Justificativo, JustificativoCreate } from '../../shared/models/justificativo.model';

import { CursoSidebarComponent } from './components/curso-sidebar/curso-sidebar.component';
import { CursoFormComponent } from './components/curso-form/curso-form.component';
import { AlumnoListComponent } from './components/alumno-list/alumno-list.component';
import { AlumnoFormComponent } from './components/alumno-form/alumno-form.component';
import { AsistenciaTableComponent } from './components/asistencia-table/asistencia-table.component';
import { JustificativoFormComponent } from './components/justificativo-form/justificativo-form.component';
import { AlumnoDetailComponent } from './components/alumno-detail/alumno-detail.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    NgbNavModule,
    CursoSidebarComponent,
    AlumnoListComponent,
    AsistenciaTableComponent,
    AlumnoDetailComponent,
  ],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.css',
})
export class DashboardPage implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  readonly cursoService = inject(CursoService);
  readonly alumnoService = inject(AlumnoService);
  readonly asistenciaService = inject(AsistenciaService);
  readonly justificativoService = inject(JustificativoService);

  readonly selectedCursoId = signal<number | null>(null);
  readonly activeTab = signal<'alumnos' | 'asistencia'>('alumnos');
  readonly selectedDate = signal<string>(new Date().toISOString().split('T')[0]);
  readonly alumnoDetailId = signal<number | null>(null);
  readonly registroDrafts = signal<
    Map<number, { estado: EstadoAsistencia; horaLlegada?: string; observacion?: string }>
  >(new Map());

  readonly selectedCurso = computed(() => {
    const id = this.selectedCursoId();
    return this.cursoService.cursos().find((c) => c.id === id) ?? null;
  });

  readonly alumnosDelCurso = computed(() => {
    const id = this.selectedCursoId();
    return this.alumnoService.alumnos().filter((a) => a.cursoId === id);
  });

  readonly alumnoDetalle = computed(() => {
    const id = this.alumnoDetailId();
    if (id === null) return null;
    const alumnos = this.alumnoService.alumnos();
    return alumnos.find((a) => a.id === id) ?? null;
  });

  readonly justificativosDetalle = computed(() => {
    const alumnoId = this.alumnoDetailId();
    if (alumnoId === null) return [];
    const registros = this.asistenciaService.registros();
    const map = this.justificativoService.justificativosMap();
    const result: Justificativo[] = [];
    for (const reg of registros) {
      if (reg.alumnoId === alumnoId) {
        const list = map.get(reg.id) ?? [];
        result.push(...list);
      }
    }
    return result;
  });

  constructor() {
    effect(() => {
      const cursoId = this.selectedCursoId();
      if (cursoId !== null) {
        this.alumnoService.loadAlumnos(cursoId);
      }
    });

    effect(() => {
      const cursoId = this.selectedCursoId();
      const fecha = this.selectedDate();
      const tab = this.activeTab();
      if (cursoId !== null && tab === 'asistencia') {
        this.asistenciaService.loadRegistros(cursoId, fecha);
      }
    });

    effect(() => {
      const alumnoId = this.alumnoDetailId();
      if (alumnoId !== null) {
        this.asistenciaService.loadRegistrosByAlumno(alumnoId);
        this.justificativoService.loadJustificativos();
      }
    });
  }

  ngOnInit(): void {
    this.cursoService.loadCursos();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  selectCurso(id: number): void {
    this.selectedCursoId.set(id);
    this.alumnoDetailId.set(null);
  }

  changeTab(tab: 'alumnos' | 'asistencia'): void {
    this.activeTab.set(tab);
    this.alumnoDetailId.set(null);
  }

  changeDate(fecha: string): void {
    this.selectedDate.set(fecha);
  }

  openCursoForm(curso?: Curso): void {
    const dialogRef = this.dialog.open(CursoFormComponent, {
      data: { curso },
      width: '480px',
    });
    dialogRef.afterClosed().subscribe((result: CursoCreate | undefined) => {
      if (result) {
        this.saveCurso(result, curso?.id);
      }
    });
  }

  openAlumnoForm(alumno?: Alumno): void {
    const cursoId = this.selectedCursoId();
    if (cursoId === null) return;
    const dialogRef = this.dialog.open(AlumnoFormComponent, {
      data: { alumno, cursoId },
      width: '480px',
    });
    dialogRef.afterClosed().subscribe((result: AlumnoCreate | undefined) => {
      if (result) {
        this.saveAlumno(result, alumno?.id);
      }
    });
  }

  openJustificativoForm(registro: RegistroAsistencia): void {
    const alumno = this.alumnosDelCurso().find((a) => a.id === registro.alumnoId);
    const dialogRef = this.dialog.open(JustificativoFormComponent, {
      data: {
        registro,
        alumnoNombre: alumno ? `${alumno.nombre} ${alumno.apellido}` : 'Alumno',
      },
      width: '480px',
    });
    dialogRef.afterClosed().subscribe((result: JustificativoCreate | undefined) => {
      if (result) {
        this.saveJustificativo(result);
      }
    });
  }

  deleteCurso(id: number): void {
    this.cursoService.deleteCurso(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Curso eliminado',
          timer: 1500,
          showConfirmButton: false,
        });
        if (this.selectedCursoId() === id) {
          this.selectedCursoId.set(null);
        }
      },
      error: () =>
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar el curso.' }),
    });
  }

  deleteAlumno(id: number): void {
    this.alumnoService.deleteAlumno(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Alumno eliminado',
          timer: 1500,
          showConfirmButton: false,
        });
        if (this.alumnoDetailId() === id) {
          this.alumnoDetailId.set(null);
        }
      },
      error: () =>
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar al alumno.' }),
    });
  }

  saveCurso(result: CursoCreate, id?: number): void {
    const action =
      id !== undefined
        ? this.cursoService.updateCurso(id, result)
        : this.cursoService.createCurso(result);
    const msg = id !== undefined ? 'Curso actualizado' : 'Curso creado';
    action.subscribe({
      next: () => Swal.fire({ icon: 'success', title: msg, timer: 1500, showConfirmButton: false }),
      error: () =>
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar el curso.' }),
    });
  }

  saveAlumno(result: AlumnoCreate, id?: number): void {
    const action =
      id !== undefined
        ? this.alumnoService.updateAlumno(id, result)
        : this.alumnoService.createAlumno(result);
    const msg = id !== undefined ? 'Alumno actualizado' : 'Alumno creado';
    action.subscribe({
      next: () => Swal.fire({ icon: 'success', title: msg, timer: 1500, showConfirmButton: false }),
      error: () =>
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar al alumno.' }),
    });
  }

  saveJustificativo(result: JustificativoCreate): void {
    this.justificativoService.createJustificativo(result).subscribe({
      next: () =>
        Swal.fire({
          icon: 'success',
          title: 'Justificativo enviado',
          timer: 1500,
          showConfirmButton: false,
        }),
      error: () =>
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo enviar el justificativo.' }),
    });
  }

  onCambiarEstado(data: {
    alumnoId: number;
    estado: EstadoAsistencia;
    horaLlegada?: string;
    observacion?: string;
  }): void {
    this.registroDrafts.update((map) => {
      const next = new Map(map);
      next.set(data.alumnoId, data);
      return next;
    });
  }

  guardarAsistencia(): void {
    const cursoId = this.selectedCursoId();
    const fecha = this.selectedDate();
    if (cursoId === null) return;

    const drafts = this.registroDrafts();
    if (drafts.size === 0) return;

    for (const [alumnoId, draft] of drafts) {
      const registro: RegistroAsistenciaCreate = {
        alumnoId,
        cursoId,
        fecha,
        estado: draft.estado,
        horaLlegada: draft.horaLlegada ?? null,
        observacion: draft.observacion ?? null,
      };
      this.asistenciaService.saveRegistro(registro).subscribe();
    }

    this.registroDrafts.set(new Map());
    setTimeout(() => {
      this.asistenciaService.loadRegistros(cursoId, fecha);
      Swal.fire({
        icon: 'success',
        title: 'Asistencia guardada',
        timer: 1500,
        showConfirmButton: false,
      });
    }, 400);
  }

  verDetalle(alumnoId: number): void {
    this.alumnoDetailId.set(alumnoId);
  }

  cerrarDetalle(): void {
    this.alumnoDetailId.set(null);
  }
}
