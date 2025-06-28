import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { User } from 'src/app/models/user.interface';
import { Ue } from 'src/app/models/ue.interface';
import { Input, Output, EventEmitter } from '@angular/core';
import { UeService } from 'src/app/services/ue.service';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.css']
})
export class UserFormModalComponent implements OnInit, OnChanges {
  @Input() userToEdit: User | null = null;
  @Input() visible = false;
  @Input() ueEditMode = false;
  @Output() formSubmitted = new EventEmitter<User>();
  @Output() modalClosed = new EventEmitter<void>();

  userForm!: FormGroup;
  availableUes: Ue[] = [];

  constructor(private fb: FormBuilder, private ueService: UeService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAvailableUes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible'] && this.visible) {
      this.initializeForm();
    }
    if (changes['userToEdit']) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    const randomPassword = this.userToEdit ? '' : this.generateRandomPassword();
    
    this.userForm = this.fb.group({
      firstName: [this.userToEdit?.firstName || '', this.ueEditMode ? [] : Validators.required],
      lastName: [this.userToEdit?.lastName || '', this.ueEditMode ? [] : Validators.required],
      email: [this.userToEdit?.email || '', this.ueEditMode ? [] : [Validators.required, Validators.email]],
      password: [randomPassword, this.ueEditMode ? [] : (this.userToEdit ? [] : Validators.required)],
      role: [this.userToEdit?.role || 'student', this.ueEditMode ? [] : Validators.required],
      registeredUEs: this.fb.array([]) // Add FormArray for UEs
    });

    // Populate UEs if editing existing user
    if (this.userToEdit?.registeredUEs) {
      const registeredUEsArray = this.userForm.get('registeredUEs') as FormArray;
      this.userToEdit.registeredUEs.forEach(ue => {
        registeredUEsArray.push(this.fb.control(ue));
      });
    }
  }

  private loadAvailableUes(): void {
    this.ueService.getAll().subscribe({
      next: (ues) => {
        this.availableUes = ues;
      },
      error: (error) => {
        console.error('Error loading UEs:', error);
      }
    });
  }

  get registeredUEsArray(): FormArray {
    return this.userForm.get('registeredUEs') as FormArray;
  }

  isUeSelected(ueCode: string): boolean {
    return this.registeredUEsArray.value.some((ue: any) => ue.code === ueCode);
  }

  toggleUeSelection(ue: Ue): void {
    const registeredUEsArray = this.registeredUEsArray;
    const index = registeredUEsArray.value.findIndex((registeredUe: any) => registeredUe.code === ue.code);
    
    if (index > -1) {
      // Remove UE
      registeredUEsArray.removeAt(index);
    } else {
      // Add UE
      registeredUEsArray.push(this.fb.control({ code: ue.code }));
    }
  }

  private generateRandomPassword(): string {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  regeneratePassword(): void {
    const newPassword = this.generateRandomPassword();
    this.userForm.patchValue({ password: newPassword });
  }

  submit(): void {
    console.log('🔍 Modal: Submit called with UE Edit Mode:', this.ueEditMode);
    console.log('🔍 Modal: Form valid:', this.userForm.valid);
    console.log('🔍 Modal: Form value:', this.userForm.value);

    if (this.ueEditMode) {
      // In UE edit mode, only validate and send UE assignments
      const userData: User = {
        ...this.userToEdit!,
        registeredUEs: this.registeredUEsArray.value
      };
      console.log('🔍 Modal: Sending UE-only update:', userData);
      this.formSubmitted.emit(userData);
    } else {
      // Normal mode - validate full form
      if (this.userForm.valid) {
        const formData = { ...this.userForm.value };
        
        // For editing, don't send password if it's empty (keep current password)
        if (this.userToEdit && !formData.password) {
          delete formData.password;
        }
        
        // For creating, ensure password is included
        const userData: User = this.userToEdit ? 
          { ...this.userToEdit, ...formData } : 
          formData;
        
        console.log('🔍 Modal: Sending full user data:', userData);
        this.formSubmitted.emit(userData);
      } else {
        console.log('Form is invalid:', this.userForm.errors);
      }
    }
  }

  close(): void {
    this.modalClosed.emit();
  }

  resetForm(): void {
    const randomPassword = this.generateRandomPassword();
    this.userForm.reset({
      firstName: '',
      lastName: '',
      email: '',
      password: randomPassword,
      role: 'student'
    });
    
    // Clear the UEs FormArray
    const registeredUEsArray = this.userForm.get('registeredUEs') as FormArray;
    while (registeredUEsArray.length !== 0) {
      registeredUEsArray.removeAt(0);
    }
  }

}
