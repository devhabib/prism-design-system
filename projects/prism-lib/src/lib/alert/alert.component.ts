import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'success' | 'warning' | 'error' | 'info';

@Component({
  selector: 'prism-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-alert prism-alert--{{type}}" role="alert">
      <div class="prism-alert__icon">
        <svg *ngIf="type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <svg *ngIf="type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <svg *ngIf="type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <svg *ngIf="type === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      </div>
      <div class="prism-alert__content">
        <h4 *ngIf="title" class="prism-alert__title">{{ title }}</h4>
        <div class="prism-alert__message">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prism-alert {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      padding: 1rem;
      border-radius: var(--radius-md, 8px);
      border-left: 4px solid;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .prism-alert__icon {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      margin-top: 0.125rem;
    }

    .prism-alert__icon svg {
      width: 100%;
      height: 100%;
    }

    .prism-alert__content {
      flex: 1;
      min-width: 0;
    }

    .prism-alert__title {
      margin: 0 0 0.25rem 0;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .prism-alert__message {
      margin: 0;
    }

    /* Success variant */
    .prism-alert--success {
      background-color: #ecfdf5;
      border-left-color: #10b981;
      color: #065f46;
    }
    .prism-alert--success .prism-alert__icon {
      color: #10b981;
    }

    /* Error variant */
    .prism-alert--error {
      background-color: #fef2f2;
      border-left-color: #ef4444;
      color: #991b1b;
    }
    .prism-alert--error .prism-alert__icon {
      color: #ef4444;
    }

    /* Warning variant */
    .prism-alert--warning {
      background-color: #fffbeb;
      border-left-color: #f59e0b;
      color: #92400e;
    }
    .prism-alert--warning .prism-alert__icon {
      color: #f59e0b;
    }

    /* Info variant */
    .prism-alert--info {
      background-color: #eff6ff;
      border-left-color: #3b82f6;
      color: #1e40af;
    }
    .prism-alert--info .prism-alert__icon {
      color: #3b82f6;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title?: string;
}
