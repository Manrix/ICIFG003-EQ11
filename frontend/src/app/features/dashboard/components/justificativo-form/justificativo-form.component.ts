import { Component, input, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import type { RegistroAsistencia } from '../../../../shared/models/asistencia.model';
import type { JustificativoCreate } from '../../../../shared/models/justificativo.model';

@Component({
  selector: 'app-justificativo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './justificativo-form.component.html',
  styleUrl: './justificativo-form.component.css',
})
export class JustificativoFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly activeModal = inject(NgbActiveModal);

  readonly registro = input.required<RegistroAsistencia>();
  readonly alumnoNombre = input.required<string>();

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
      registroAsistenciaId: this.registro().id,
      motivo: this.form.value.motivo ?? '',
      documento: this.form.value.documento || null,
    };
    this.activeModal.close(value);
  }

  cancelar(): void {
    this.activeModal.dismiss('cancel');
  }
}
