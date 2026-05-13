import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import type { Curso, CursoCreate } from '../../../../shared/models/curso.model';

export interface CursoDialogData {
  curso?: Curso;
}

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.css',
})
export class CursoFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CursoFormComponent>);
  private readonly data = inject(MAT_DIALOG_DATA) as CursoDialogData;

  readonly isEditing = !!this.data?.curso;

  readonly form = this.fb.nonNullable.group({
    nombre: [this.data?.curso?.nombre ?? '', [Validators.required, Validators.minLength(3)]],
    nivel: [this.data?.curso?.nivel ?? '', Validators.required],
    anio: [this.data?.curso?.anio ?? 2024, [Validators.required, Validators.min(2000)]],
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value: CursoCreate = this.form.getRawValue();
    this.dialogRef.close(value);
  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }
}
