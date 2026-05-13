import { Component, input, output, signal, computed } from '@angular/core';
import Swal from 'sweetalert2';
import type { Alumno } from '../../../../shared/models/alumno.model';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [],
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.css',
})
export class AlumnoListComponent {
  readonly alumnos = input.required<Alumno[]>();
  readonly loading = input<boolean>(false);

  readonly nuevoAlumno = output<void>();
  readonly editarAlumno = output<Alumno>();
  readonly eliminarAlumno = output<number>();
  readonly verDetalle = output<number>();

  readonly searchQuery = signal('');

  readonly alumnosFiltrados = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    if (!query) return this.alumnos();
    return this.alumnos().filter(
      (a) =>
        a.nombre.toLowerCase().includes(query) ||
        a.apellido.toLowerCase().includes(query) ||
        a.rut.toLowerCase().includes(query),
    );
  });

  async confirmDelete(alumno: Alumno): Promise<void> {
    const result = await Swal.fire({
      title: '¿Eliminar alumno?',
      text: `Se eliminará a ${alumno.nombre} ${alumno.apellido}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) {
      this.eliminarAlumno.emit(alumno.id);
    }
  }
}
