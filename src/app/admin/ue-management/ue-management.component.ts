import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UeService } from 'src/app/services/ue.service';
import { Ue } from 'src/app/models/ue.interface';

@Component({
  selector: 'app-ue-management',
  templateUrl: './ue-management.component.html',
  styleUrls: ['./ue-management.component.css']
})
export class UeManagementComponent implements OnInit {

  ues: Ue[] = [];
  editingUeId: string | null = null;
  editForm!: FormGroup;

  constructor(
    private ueService: UeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ueService.getAll().subscribe(data => this.ues = data);
    this.initializeForm();
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      credits: [0, [Validators.required, Validators.min(1)]]
    });
  }

  isEditing(ueId: string): boolean {
    return this.editingUeId === ueId;
  }

  startEdit(ue: Ue): void {
    this.editingUeId = ue._id!;
    
    // Populate the form with current UE data
    this.editForm.patchValue({
      code: ue.code,
      name: ue.name,
      description: ue.description,
      credits: ue.credits
    });
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingUeId) {
      const updatedUe: Ue = {
        ...this.editForm.value,
        _id: this.editingUeId
      };

      console.log('Saving UE:', updatedUe);
      
      this.ueService.update(this.editingUeId, updatedUe).subscribe({
        next: (updated) => {
          // Update the UE in the array
          this.ues = this.ues.map(u => u._id === updated._id ? updated : u);
          this.cancelEdit();
          console.log('UE updated successfully');
        },
        error: (error) => {
          console.error('Error updating UE:', error);
        }
      });
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  cancelEdit(): void {
    this.editingUeId = null;
    this.editForm.reset();
  }

  deleteUe(id: string): void {
    if (confirm('Are you sure you want to delete this UE?')) {
      this.ueService.delete(id).subscribe(() => {
        this.ues = this.ues.filter(ue => ue._id !== id);
        console.log('UE deleted successfully');
      });
    }
  }

  // Helper method to mark all fields as touched for validation display
  private markFormGroupTouched(): void {
    Object.keys(this.editForm.controls).forEach(key => {
      this.editForm.get(key)?.markAsTouched();
    });
  }

  // Helper method to get form control
  getFormControl(controlName: string) {
    return this.editForm.get(controlName);
  }

  trackByUeId(index: number, ue: Ue): string {
    return ue._id!;
  }
}