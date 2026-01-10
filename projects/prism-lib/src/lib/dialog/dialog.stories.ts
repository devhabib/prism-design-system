
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogService } from './dialog.service';
import { DialogRef } from './dialog-ref';
import { DIALOG_DATA, DIALOG_REF } from './dialog.tokens';
import { ButtonComponent } from '../button/button.component';

// ============================================
// Test Dialog Component
// Shows injected data with proper formatting
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
      <!-- Show data if provided -->
      <div *ngIf="data; else noData">
        <p style="margin-bottom: 0.75rem; font-weight: 500; color: #374151;">Injected Data:</p>
        <pre style="background: #f3f4f6; padding: 1rem; border-radius: 8px; font-size: 0.875rem; overflow-x: auto; margin: 0;">{{ data | json }}</pre>
      </div>
      
      <!-- No data message -->
      <ng-template #noData>
        <p style="color: #6b7280; font-style: italic;">No data provided to this dialog.</p>
      </ng-template>
      
      <p style="color: #6b7280; font-size: 0.75rem; margin-top: 1rem;">
        Data injected via <code>DIALOG_DATA</code> token
      </p>
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

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close('confirmed');
  }
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
      
      <!-- Basic Dialog (No Data) -->
      <div>
        <prism-button variant="primary" (click)="openBasicDialog()">
          Open Basic Dialog
        </prism-button>
        <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
          No data passed - shows default message
        </p>
      </div>
      
      <!-- Dialog with Data -->
      <div>
        <prism-button variant="secondary" (click)="openWithData()">
          Open Dialog with Data
        </prism-button>
        <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
          Passes {{ '{' }} id: 99, role: 'Admin', action: 'Ban' {{ '}' }}
        </p>
      </div>

      <!-- Wide Dialog -->
      <div>
        <prism-button variant="outline" (click)="openWideDialog()">
          Open Wide Dialog (800px)
        </prism-button>
        <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.25rem;">
          Custom width: 800px
        </p>
      </div>

      <!-- Result Display -->
      <div *ngIf="lastResult" style="margin-top: 1rem; padding: 1rem; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; width: 100%;">
        <strong style="color: #065f46;">Last Result:</strong> 
        <code style="background: #d1fae5; padding: 0.25rem 0.5rem; border-radius: 4px;">{{ lastResult }}</code>
      </div>
    </div>
  `,
})
class DialogDemoComponent {
  lastResult: string = '';

  constructor(
    private dialog: DialogService,
    private cdr: ChangeDetectorRef
  ) { }

  // Basic dialog - no data
  openBasicDialog(): void {
    const ref = this.dialog.open(TestDialogComponent, {
      width: '400px',
    });

    ref.afterClosed().subscribe(result => {
      this.lastResult = result ? `"${result}"` : 'undefined (cancelled)';
      this.cdr.detectChanges();
    });
  }

  // Dialog with data injection
  openWithData(): void {
    const ref = this.dialog.open(TestDialogComponent, {
      data: {
        title: 'User Action',
        id: 99,
        role: 'Admin',
        action: 'Ban',
      },
      width: '450px',
    });

    ref.afterClosed().subscribe(result => {
      this.lastResult = result ? `"${result}"` : 'undefined (cancelled)';
      this.cdr.detectChanges();
    });
  }

  // Wide dialog with custom width
  openWideDialog(): void {
    const ref = this.dialog.open(TestDialogComponent, {
      data: {
        title: 'Wide Dialog',
        note: 'This dialog is 800px wide',
        features: ['Custom width', 'Data injection', 'Focus trap'],
      },
      width: '800px',
    });

    ref.afterClosed().subscribe(result => {
      this.lastResult = result ? `"${result}"` : 'undefined (cancelled)';
      this.cdr.detectChanges();
    });
  }
}

// ============================================
// Storybook Meta
// ============================================
const meta: Meta = {
  title: 'Overlays/Dialog',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DialogDemoComponent, TestDialogComponent],
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;

// ============================================
// Stories
// ============================================
export const Default: StoryObj = {
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
        <h2 style="margin-top: 0;">Dialog Service</h2>
        <p>The Dialog system is built from scratch using <code>ApplicationRef</code> without Angular CDK.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li><strong>Programmatic Opening:</strong> DialogService.open(Component, config)</li>
          <li><strong>Data Injection:</strong> @Inject(DIALOG_DATA)</li>
          <li><strong>Custom Width:</strong> Pass width in config</li>
          <li><strong>Focus Trapping:</strong> Built-in accessibility</li>
          <li><strong>Animations:</strong> Fade in/out and slide effects</li>
        </ul>

        <h3>Configuration Options</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
          <thead>
            <tr style="background: #f3f4f6;">
              <th style="padding: 0.5rem; text-align: left; border: 1px solid #e5e7eb;">Option</th>
              <th style="padding: 0.5rem; text-align: left; border: 1px solid #e5e7eb;">Type</th>
              <th style="padding: 0.5rem; text-align: left; border: 1px solid #e5e7eb;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>data</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">any</td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Data to inject via DIALOG_DATA</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>width</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">string</td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Dialog width (e.g., '400px', '80vw')</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>panelClass</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">string</td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Custom CSS class for styling</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>disableClose</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">boolean</td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Prevent ESC/backdrop close</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  }),
};
