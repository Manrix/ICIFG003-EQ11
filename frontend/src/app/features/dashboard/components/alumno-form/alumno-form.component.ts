import { Component, input, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import type { Alumno, AlumnoCreate } from '../../../../shared/models/alumno.model';

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.css',
})
export class AlumnoFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly activeModal = inject(NgbActiveModal);

  readonly alumno = input<Alumno | undefined>(undefined);
  readonly cursoId = input<number>(0);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    rut: ['', [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/)]],
    estado: ['ACTIVO', Validators.required],
    cursoId: [0, Validators.required],
  });

  constructor() {
    const existing = this.alumno();
    if (existing) {
      this.form.patchValue({
        nombre: existing.nombre,
        apellido: existing.apellido,
        rut: existing.rut,
        estado: existing.estado,
        cursoId: existing.cursoId,
      });
    } else {
      this.form.patchValue({ cursoId: this.cursoId() });
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value: AlumnoCreate = this.form.getRawValue();
    this.activeModal.close(value);
  }

  cancelar(): void {
    this.activeModal.dismiss('cancel');
  }
}
