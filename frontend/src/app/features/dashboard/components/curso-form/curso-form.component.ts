import { Component, input, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import type { Curso, CursoCreate } from '../../../../shared/models/curso.model';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.css',
})
export class CursoFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly activeModal = inject(NgbActiveModal);

  readonly curso = input<Curso | undefined>(undefined);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    nivel: ['', Validators.required],
    anio: [2024, [Validators.required, Validators.min(2000)]],
  });

  constructor() {
    const existing = this.curso();
    if (existing) {
      this.form.patchValue({
        nombre: existing.nombre,
        nivel: existing.nivel,
        anio: existing.anio,
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value: CursoCreate = this.form.getRawValue();
    this.activeModal.close(value);
  }

  cancelar(): void {
    this.activeModal.dismiss('cancel');
  }
}
