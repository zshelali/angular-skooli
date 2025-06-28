import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Ue } from 'src/app/models/ue.interface';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ue-form-modal',
  templateUrl: './ue-form-modal.component.html',
  styleUrls: ['./ue-form-modal.component.css']
})
export class UeFormModalComponent implements OnInit {
  @Input() ueToEdit: Ue | null = null;
  @Input() visible = false;
  @Output() formSubmitted = new EventEmitter<Ue>();
  @Output() modalClosed = new EventEmitter<void>();

  ueForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ueForm = this.fb.group({
      code: [this.ueToEdit?.code || '', Validators.required],
      name: [this.ueToEdit?.name || '', Validators.required],
      description: [this.ueToEdit?.description || ''],
      credits: [this.ueToEdit?.credits || 0, [Validators.required, Validators.min(1)]],
    });
  }

  submit(): void {
    if (this.ueForm.valid) {
      const updatedUe: Ue = {
        ...this.ueToEdit,
        ...this.ueForm.value
      };
      this.formSubmitted.emit(updatedUe);
    }
  }

  close(): void {
    this.modalClosed.emit();
  }

  resetForm(): void {
  this.ueForm.reset({
    code: '',
    name: '',
    description: '',
    credits: 0
  });
}

}
