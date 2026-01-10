import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastService } from './toast.service';
import { ButtonComponent } from '../button/button.component';

// ============================================
// Demo Controller Component
// ============================================
@Component({
  selector: 'toast-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <h3 style="margin: 0 0 0.5rem 0;">Toast Notifications</h3>
      <p style="margin: 0 0 1rem 0; color: #6b7280; font-size: 0.875rem;">
        Click the buttons to trigger toast notifications. They will appear in the top-right corner.
      </p>
      
      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
        <prism-button variant="primary" (click)="showSuccess()">
          ✓ Trigger Success
        </prism-button>
        
        <prism-button variant="secondary" (click)="showError()">
          ✕ Trigger Error
        </prism-button>
        
        <prism-button variant="outline" (click)="showInfo()">
          ℹ Trigger Info
        </prism-button>
        
        <prism-button variant="ghost" (click)="showWarning()">
          ⚠ Trigger Warning
        </prism-button>
      </div>

      <hr style="margin: 1rem 0; border: none; border-top: 1px solid #e5e7eb;" />

      <div style="display: flex; gap: 0.75rem;">
        <prism-button variant="outline" (click)="showMultiple()">
          Stack Multiple
        </prism-button>
        
        <prism-button variant="ghost" (click)="dismissAll()">
          Dismiss All
        </prism-button>
      </div>
    </div>
  `,
})
class ToastDemoComponent {
  private messageIndex = 0;

  private successMessages = [
    'Operation completed successfully!',
    'Your changes have been saved.',
    'File uploaded successfully.',
    'Settings updated!',
  ];

  private errorMessages = [
    'Something went wrong. Please try again.',
    'Failed to save changes.',
    'Network error occurred.',
    'Access denied.',
  ];

  constructor(private toast: ToastService) { }

  showSuccess(): void {
    const msg = this.successMessages[this.messageIndex % this.successMessages.length];
    this.toast.success(msg);
    this.messageIndex++;
  }

  showError(): void {
    const msg = this.errorMessages[this.messageIndex % this.errorMessages.length];
    this.toast.error(msg);
    this.messageIndex++;
  }

  showInfo(): void {
    this.toast.info('This is an informational message.');
  }

  showWarning(): void {
    this.toast.warning('Please review your input before continuing.');
  }

  showMultiple(): void {
    this.toast.success('First notification');
    setTimeout(() => this.toast.info('Second notification'), 200);
    setTimeout(() => this.toast.warning('Third notification'), 400);
  }

  dismissAll(): void {
    this.toast.dismissAll();
  }
}

// ============================================
// Storybook Meta
// ============================================
const meta: Meta = {
  title: 'Feedback/Toast',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ToastDemoComponent],
      providers: [provideAnimations()],
    }),
  ],
};

export default meta;

// ============================================
// Stories
// ============================================
export const InteractiveDemo: StoryObj = {
  name: '🔥 Interactive Demo',
  render: () => ({
    template: `<toast-demo></toast-demo>`,
  }),
};

export const Documentation: StoryObj = {
  name: 'Usage Documentation',
  render: () => ({
    template: `
      <div style="max-width: 600px; font-family: system-ui;">
        <h2 style="margin-top: 0;">Toast Service</h2>
        <p>Global notification service that displays stacked toasts in the top-right corner.</p>
        
        <h3>Methods</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
          <thead>
            <tr style="background: #f3f4f6;">
              <th style="padding: 0.5rem; text-align: left; border: 1px solid #e5e7eb;">Method</th>
              <th style="padding: 0.5rem; text-align: left; border: 1px solid #e5e7eb;">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>success(msg, duration?)</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Green success toast (3s default)</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>error(msg, duration?)</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Red error toast (5s default)</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>info(msg, duration?)</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Blue info toast (3s default)</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>warning(msg, duration?)</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Amber warning toast (4s default)</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;"><code>dismissAll()</code></td>
              <td style="padding: 0.5rem; border: 1px solid #e5e7eb;">Dismiss all visible toasts</td>
            </tr>
          </tbody>
        </table>

        <h3 style="margin-top: 1.5rem;">Features</h3>
        <ul>
          <li><strong>Glassmorphism:</strong> Blurred, semi-transparent background</li>
          <li><strong>Stacking:</strong> Multiple toasts stack vertically</li>
          <li><strong>Auto-dismiss:</strong> Configurable duration</li>
          <li><strong>Animations:</strong> Slide in from right, fade out</li>
          <li><strong>Manual dismiss:</strong> Click X or use ToastRef.dismiss()</li>
        </ul>
      </div>
    `,
  }),
};
