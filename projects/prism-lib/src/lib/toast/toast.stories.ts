import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastService } from './toast.service';
import { ButtonComponent } from '../button/button.component';
import { PrismToastComponent } from './prism-toast.component';

// ============================================
// Demo Controller Component
// ============================================
@Component({
  selector: 'toast-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <h3 style="margin: 0;">Toast Notifications</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
        <prism-button variant="primary" (click)="toast.success('Success!')">Success</prism-button>
        <prism-button variant="secondary" (click)="toast.error('Error!')">Error</prism-button>
        <prism-button variant="outline" (click)="toast.info('Info')">Info</prism-button>
        <prism-button variant="ghost" (click)="toast.warning('Warning')">Warning</prism-button>
      </div>
      <prism-button variant="outline" (click)="toast.dismissAll()">Dismiss All</prism-button>
    </div>
  `,
})
class ToastDemoComponent {
  constructor(public toast: ToastService) { }
}

// ============================================
// Service Playground Component
// ============================================
@Component({
  selector: 'service-playground',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div style="padding: 1rem; border: 1px dashed #ccc; border-radius: 8px;">
      <prism-button variant="primary" (click)="trigger()">
        Trigger {{ type | titlecase }} Toast
      </prism-button>
      <p style="font-size: 0.75rem; color: #6b7280; margin-top: 0.5rem;">
        Uses <code>ToastService</code> to spawn toasts with message: "<code>{{ message }}</code>"
      </p>
    </div>
  `,
})
class ServicePlaygroundComponent {
  @Input() type: any = 'success';
  @Input() message: string = '';
  constructor(private toast: ToastService) { }
  trigger() {
    // @ts-ignore
    this.toast[this.type || 'info'](this.message || 'Hello from Prism!');
  }
}

// ============================================
// Storybook Meta
// ============================================
const meta: Meta<PrismToastComponent> = {
  title: 'Feedback/Toast',
  component: PrismToastComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ToastDemoComponent, ServicePlaygroundComponent, PrismToastComponent],
      providers: [provideAnimations(), ToastService],
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

export const ServiceDemo: StoryObj = {
  name: '🛠️ Service Playground',
  render: (args) => ({
    props: args,
    template: `<service-playground [type]="type" [message]="message"></service-playground>`,
  }),
  args: {
    type: 'success',
    message: 'Triggered via ToastService!'
  }
};
