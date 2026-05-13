import { Component, input, output } from '@angular/core';
import Swal from 'sweetalert2';
import type { Curso } from '../../../../shared/models/curso.model';

@Component({
  selector: 'app-curso-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './curso-sidebar.component.html',
  styleUrl: './curso-sidebar.component.css',
})
export class CursoSidebarComponent {
  readonly cursos = input.required<Curso[]>();
  readonly selectedId = input<number | null>(null);

  readonly selectCurso = output<number>();
  readonly nuevoCurso = output<void>();
  readonly editarCurso = output<Curso>();
  readonly eliminarCurso = output<number>();

  async confirmDelete(curso: Curso): Promise<void> {
    const result = await Swal.fire({
      title: '¿Eliminar curso?',
      text: `Se eliminará "${curso.nombre}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      this.eliminarCurso.emit(curso.id);
    }
  }
}
