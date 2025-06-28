import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';
import { ViewChild } from '@angular/core';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(UserFormModalComponent) modalComponent!: UserFormModalComponent;

  users: User[] = [];
  editingUserId: string | null = null;
  editForm!: FormGroup;

  // Modal properties
  showModal = false;
  userToEdit: User | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => this.users = data);
    this.initializeForm();
  }

  initializeForm(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // Add password field for inline editing
      role: ['student', [Validators.required]],
    });
  }

  isEditing(userId: string): boolean {
    return this.editingUserId === userId;
  }

  startEdit(user: User): void {
    this.editingUserId = user._id!;

    // Populate the form with current user data
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '', // Empty password field for editing
      role: user.role,
    });
  }

  saveEdit(): void {
    if (this.editForm.valid && this.editingUserId) {
      const updatedUser: User = {
        ...this.editForm.value,
        _id: this.editingUserId,
      };

      // Remove empty password to keep current password
      if (!updatedUser.password) {
        delete updatedUser.password;
      }

      console.log('Saving User:', updatedUser);

      this.userService.updateUser(this.editingUserId, updatedUser).subscribe({
        next: (updated) => {
          // Update the user in the array
          this.users = this.users.map((u) => (u._id === updated._id ? updated : u));
          this.cancelEdit();
          console.log('User updated successfully');
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched();
    }
  }

  cancelEdit(): void {
    this.editingUserId = null;
    this.editForm.reset();
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter((user) => user._id !== id);
        console.log('User deleted successfully');
      });
    }
  }

  // Modal methods
  openCreateModal(): void {
    this.userToEdit = null;
    this.showModal = true;

    setTimeout(() => {
      this.modalComponent?.resetForm();
    });
  }

  editUserUEs(user: User): void {
    this.userToEdit = user;
    this.showModal = true;
  }

  onModalClosed(): void {
    this.showModal = false;
    this.userToEdit = null;
  }

  onFormSubmitted(user: User): void {
    console.log('🔍 Component received user data:', user);
    
    if (this.userToEdit) {
      // Update existing user
      this.userService.updateUser(this.userToEdit._id!, user).subscribe({
        next: (updated) => {
          console.log('🔍 Backend returned updated user:', updated);
          this.users = this.users.map((u) => (u._id === updated._id ? updated : u));
          this.onModalClosed();
          console.log('User updated successfully');
        },
        error: (error) => {
          console.error('Error updating user:', error);
        },
      });
    } else {
      // Create new user
      this.userService.createUser(user).subscribe({
        next: (created) => {
          console.log('🔍 Backend returned created user:', created);
          this.users.unshift(created); // Add to beginning of array
          this.onModalClosed();
          console.log('User created successfully');
        },
        error: (error) => {
          console.error('Error creating user:', error);
        },
      });
    }
  }

  // Helper method to mark all fields as touched for validation display
  private markFormGroupTouched(): void {
    Object.keys(this.editForm.controls).forEach((key) => {
      this.editForm.get(key)?.markAsTouched();
    });
  }

  // Helper method to get form control
  getFormControl(controlName: string) {
    return this.editForm.get(controlName);
  }

  trackByUserId(index: number, user: User): string {
    return user._id!;
  }

}
