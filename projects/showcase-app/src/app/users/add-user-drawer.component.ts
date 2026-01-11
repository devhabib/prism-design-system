import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  DrawerComponent,
  InputComponent,
  SelectComponent,
  ButtonComponent,
  SelectOption,
  GridComponent,
  GridItemComponent,
} from 'prism-lib';

@Component({
  selector: 'app-add-user-drawer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DrawerComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent,
    GridComponent,
    GridItemComponent,
  ],
  template: `
    <prism-drawer #drawer [isOpen]="isOpen" width="450px" (closed)="onClosed()">
      <span drawer-title>New User</span>
      
      <prism-grid columns="1" gap="lg">
        <prism-grid-item>
          <prism-input
            label="Full Name"
            placeholder="Enter full name"
            [(ngModel)]="formData.name"
            [required]="true"
          ></prism-input>
        </prism-grid-item>
        
        <prism-grid-item>
          <prism-input
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            [(ngModel)]="formData.email"
            [required]="true"
          ></prism-input>
        </prism-grid-item>
        
        <prism-grid-item>
          <prism-select
            label="Role"
            [options]="roleOptions"
            [(ngModel)]="formData.role"
            [required]="true"
          ></prism-select>
        </prism-grid-item>
        
        <prism-grid-item>
          <prism-select
            label="Status"
            [options]="statusOptions"
            [(ngModel)]="formData.status"
            [required]="true"
          ></prism-select>
        </prism-grid-item>
      </prism-grid>

      <div drawer-footer>
        <prism-button variant="outline" (click)="cancel()">Cancel</prism-button>
        <prism-button variant="primary" (click)="save()">Save User</prism-button>
      </div>
    </prism-drawer>
  `,
})
export class AddUserDrawerComponent {
  @ViewChild('drawer') drawer!: DrawerComponent;

  isOpen = false;

  formData = {
    name: '',
    email: '',
    role: '',
    status: 'active',
  };

  roleOptions: SelectOption[] = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Editor', label: 'Editor' },
    { value: 'Viewer', label: 'Viewer' },
  ];

  statusOptions: SelectOption[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
  ];

  private onSaveCallback?: (data: typeof this.formData) => void;

  open(onSave?: (data: typeof this.formData) => void): void {
    this.formData = { name: '', email: '', role: '', status: 'active' };
    this.onSaveCallback = onSave;
    this.isOpen = true;
    this.drawer?.open();
  }

  close(): void {
    this.isOpen = false;
    this.drawer?.close();
  }

  cancel(): void {
    this.close();
  }

  save(): void {
    if (this.formData.name && this.formData.email && this.formData.role) {
      this.onSaveCallback?.(this.formData);
      this.close();
    }
  }

  onClosed(): void {
    this.isOpen = false;
  }
}
