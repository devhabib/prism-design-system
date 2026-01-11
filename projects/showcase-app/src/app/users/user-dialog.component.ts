import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  DialogRef,
  DIALOG_DATA,
  DIALOG_REF,
} from 'prism-lib';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent],
  template: `
    <div class="dialog-header">
      <h3>{{ data?.mode === 'edit' ? 'Edit User' : 'Add New User' }}</h3>
      <prism-button variant="ghost" size="sm" class="dialog-close-btn" (click)="close()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </prism-button>
    </div>

    <div class="dialog-content">
      <div class="form-group">
        <prism-input
          label="Full Name"
          placeholder="Enter full name"
          [(ngModel)]="formData.name"
        ></prism-input>
      </div>

      <div class="form-group">
        <prism-input
          label="Email Address"
          type="email"
          placeholder="Enter email"
          [(ngModel)]="formData.email"
        ></prism-input>
      </div>

      <div class="form-group">
        <label class="form-label">Role</label>
        <select class="form-select" [(ngModel)]="formData.role">
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>
    </div>

    <div class="dialog-actions">
      <prism-button variant="outline" (click)="close()">Cancel</prism-button>
      <prism-button variant="primary" (click)="save()">
        {{ data?.mode === 'edit' ? 'Save Changes' : 'Add User' }}
      </prism-button>
    </div>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .form-select {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      background: #ffffff;
      color: #111827;
      outline: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }

    .form-select:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
  `],
})
export class UserDialogComponent {
  formData = {
    name: '',
    email: '',
    role: 'Viewer',
  };

  constructor(
    @Inject(DIALOG_DATA) public data: any,
    @Inject(DIALOG_REF) private dialogRef: DialogRef
  ) {
    // Pre-fill form if editing
    if (data?.mode === 'edit' && data?.user) {
      this.formData = {
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      };
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.formData);
  }
}
