import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogService } from './dialog.service';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA, DIALOG_REF } from './dialog.tokens';
import { ButtonComponent } from '../button/button.component';
import { PrismDialogComponent } from './prism-dialog.component';

// ============================================
// Test Dialog Component
// ============================================
@Component({
  selector: 'test-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="dialog-header">
      <h3>{{ data?.title || 'Dialog' }}</h3>
      <button class="dialog-close-btn" (click)="close()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
    <div class="dialog-content">
      <div *ngIf="data; else noData">
        <p style="margin-bottom: 0.75rem; font-weight: 500; color: #374151;">Injected Data:</p>
        <pre style="background: #f3f4f6; padding: 1rem; border-radius: 8px; font-size: 0.875rem; overflow-x: auto; margin: 0;">{{ data | json }}</pre>
      </div>
      <ng-template #noData>
        <p style="color: #6b7280; font-style: italic;">No data provided to this dialog.</p>
      </ng-template>
    </div>
    <div class="dialog-actions">
      <prism-button variant="outline" (click)="close()">Cancel</prism-button>
      <prism-button variant="primary" (click)="confirm()">Confirm</prism-button>
    </div>
  `,
})
class TestDialogComponent {
  constructor(
    @Inject(DIALOG_DATA) public data: any,
    @Inject(DIALOG_REF) private dialogRef: DialogRef
  ) { }
  close(): void { this.dialogRef.close(); }
  confirm(): void { this.dialogRef.close('confirmed'); }
}

// ============================================
// Demo Wrapper Component
// ============================================
@Component({
  selector: 'dialog-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-start;">
      <div>
        <prism-button variant="primary" (click)="openBasicDialog()">
          Open Basic Dialog
        </prism-button>
      </div>
      <div>
        <prism-button variant="secondary" (click)="openWithData()">
          Open Dialog with Data
        </prism-button>
      </div>
      <div *ngIf="lastResult" style="margin-top: 1rem; padding: 1rem; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px;">
        <strong style="color: #065f46;">Last Result:</strong> {{ lastResult }}
      </div>
    </div>
  `,
})
class DialogDemoComponent {
  lastResult: string = '';
  constructor(private dialog: DialogService, private cdr: ChangeDetectorRef) { }
  openBasicDialog(): void {
    this.dialog.open(TestDialogComponent, { width: '400px' })
      .afterClosed().subscribe(res => { this.lastResult = res || 'cancelled'; this.cdr.detectChanges(); });
  }
  openWithData(): void {
    this.dialog.open(TestDialogComponent, { data: { title: 'User Action', id: 99 }, width: '450px' })
      .afterClosed().subscribe(res => { this.lastResult = res || 'cancelled'; this.cdr.detectChanges(); });
  }
}

// ============================================
// Storybook Meta
// ============================================
const meta: Meta<PrismDialogComponent> = {
  title: 'Overlays/Dialog',
  component: PrismDialogComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DialogDemoComponent, TestDialogComponent],
      providers: [provideAnimations(), DialogService],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A modal dialog system managed via DialogService.'
      }
    }
  },
  argTypes: {
    config: { control: 'object' },
    dialogRef: { table: { disable: true } }
  }
};

export default meta;

// ============================================
// Stories
// ============================================
export const InteractiveDemo: StoryObj = {
  name: '🔥 Interactive Demo',
  render: () => ({
    template: `<dialog-demo></dialog-demo>`,
  }),
};

export const Documentation: StoryObj = {
  name: 'Usage Documentation',
  render: () => ({
    template: `
      <div style="max-width: 600px; font-family: system-ui;">
        <h3>Dialog Service Usage</h3>
        <p>Use <code>DialogService.open(Component, config)</code> to trigger dialogs.</p>
      </div>
    `,
  }),
};
