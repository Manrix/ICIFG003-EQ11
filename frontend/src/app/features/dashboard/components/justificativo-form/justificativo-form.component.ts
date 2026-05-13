import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import type { RegistroAsistencia } from '../../../../shared/models/asistencia.model';
import type { JustificativoCreate } from '../../../../shared/models/justificativo.model';

export interface JustificativoDialogData {
  registro: RegistroAsistencia;
  alumnoNombre: string;
}

@Component({
  selector: 'app-justificativo-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogTitle, MatDialogContent, MatDialogActions],
  templateUrl: './justificativo-form.component.html',
  styleUrl: './justificativo-form.component.css',
})
export class JustificativoFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<JustificativoFormComponent>);
  readonly data = inject(MAT_DIALOG_DATA) as JustificativoDialogData;

  readonly form = this.fb.nonNullable.group({
    motivo: ['', [Validators.required, Validators.minLength(5)]],
    documento: [''],
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value: JustificativoCreate = {
      registroAsistenciaId: this.data.registro.id,
      motivo: this.form.value.motivo ?? '',
      documento: this.form.value.documento || null,
    };
    this.dialogRef.close(value);
  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }
}
