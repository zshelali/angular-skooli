import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.interface';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.css']
})
export class UserFormModalComponent implements OnInit, OnChanges {
  @Input() userToEdit: User | null = null;
  @Input() visible = false;
  @Output() formSubmitted = new EventEmitter<User>();
  @Output() modalClosed = new EventEmitter<void>();

  userForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
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
      firstName: [this.userToEdit?.firstName || '', Validators.required],
      lastName: [this.userToEdit?.lastName || '', Validators.required],
      email: [this.userToEdit?.email || '', [Validators.required, Validators.email]],
      password: [randomPassword, this.userToEdit ? [] : Validators.required], // Required for new users
      role: [this.userToEdit?.role || 'student', Validators.required],
    });
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
      
      console.log('🔍 Modal submitting user data:', userData);
      this.formSubmitted.emit(userData);
    } else {
      console.log('Form is invalid:', this.userForm.errors);
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
  }

}
