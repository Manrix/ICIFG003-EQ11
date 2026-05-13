import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import type { Alumno, AlumnoCreate } from '../../../../shared/models/alumno.model';

export interface AlumnoDialogData {
  alumno?: Alumno;
  cursoId: number;
}

@Component({
  selector: 'app-alumno-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.css',
})
export class AlumnoFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<AlumnoFormComponent>);
  private readonly data = inject(MAT_DIALOG_DATA) as AlumnoDialogData;

  readonly isEditing = !!this.data?.alumno;

  readonly form = this.fb.nonNullable.group({
    nombre: [this.data?.alumno?.nombre ?? '', Validators.required],
    apellido: [this.data?.alumno?.apellido ?? '', Validators.required],
    rut: [
      this.data?.alumno?.rut ?? '',
      [Validators.required, Validators.pattern(/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/)],
    ],
    estado: [this.data?.alumno?.estado ?? 'ACTIVO', Validators.required],
    cursoId: [this.data?.cursoId ?? 0, Validators.required],
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value: AlumnoCreate = this.form.getRawValue();
    this.dialogRef.close(value);
  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }
}
