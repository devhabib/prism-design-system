import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, DialogRef, DIALOG_DATA, DIALOG_REF } from 'prism-lib';

interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="dialog-header">
      <h3>{{ data.title }}</h3>
    </div>
    <div class="dialog-content">
      <p>{{ data.message }}</p>
    </div>
    <div class="dialog-actions">
      <prism-button variant="outline" (click)="cancel()">
        {{ data.cancelText || 'Cancel' }}
      </prism-button>
      <prism-button [variant]="data.isDanger ? 'danger' : 'primary'" (click)="confirm()">
        {{ data.confirmText || 'Confirm' }}
      </prism-button>
    </div>
  `,
  styles: [`
    .dialog-content p {
      margin: 0;
      color: #4b5563;
      line-height: 1.6;
    }
  `],
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: ConfirmDialogData,
    @Inject(DIALOG_REF) private dialogRef: DialogRef
  ) { }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
