import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ToastType } from './toast.types';

/**
 * PrismToastComponent
 * 
 * Individual toast notification with glassmorphism styling.
 * Used for brief, non-intrusive feedback messages.
 * 
 * Typically managed via `PrismToastService`.
 */
@Component({
  selector: 'prism-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" [class]="'toast--' + type" [class.toast--entering]="isEntering">
      <!-- Icon -->
      <div class="toast__icon">
        <svg *ngIf="type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <svg *ngIf="type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <svg *ngIf="type === 'info'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <svg *ngIf="type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      
      <!-- Message -->
      <div class="toast__content">
        <span class="toast__message">{{ message }}</span>
      </div>
      
      <!-- Close Button -->
      <button class="toast__close" (click)="onDismiss()" aria-label="Dismiss">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      pointer-events: auto;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 300px;
      max-width: 400px;
      padding: 1rem 1.25rem;
      margin-bottom: 0.75rem;
      border-radius: 12px;
      
      /* Glassmorphism */
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.3);

      /* CSS Animation - slide in from right */
      animation: toastSlideIn 300ms ease-out forwards;
    }

    @keyframes toastSlideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Type Variants */
    .toast--success {
      border-left: 4px solid #10b981;
    }
    .toast--success .toast__icon {
      color: #10b981;
    }

    .toast--error {
      border-left: 4px solid #ef4444;
    }
    .toast--error .toast__icon {
      color: #ef4444;
    }

    .toast--info {
      border-left: 4px solid #3b82f6;
    }
    .toast--info .toast__icon {
      color: #3b82f6;
    }

    .toast--warning {
      border-left: 4px solid #f59e0b;
    }
    .toast--warning .toast__icon {
      color: #f59e0b;
    }

    .toast__icon {
      flex-shrink: 0;
      width: 1.5rem;
      height: 1.5rem;
    }
    .toast__icon svg {
      width: 100%;
      height: 100%;
    }

    .toast__content {
      flex: 1;
      min-width: 0;
    }

    .toast__message {
      font-size: 0.875rem;
      font-weight: 500;
      color: #1f2937;
      line-height: 1.4;
    }

    .toast__close {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5rem;
      height: 1.5rem;
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 4px;
      color: #9ca3af;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .toast__close:hover {
      background: rgba(0, 0, 0, 0.05);
      color: #6b7280;
    }
    .toast__close svg {
      width: 1rem;
      height: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismToastComponent implements OnInit {
  /** The message text to display in the toast */
  @Input() message: string = '';

  /** Visual type of the toast, affecting icon and accent color */
  @Input() type: ToastType = 'info';

  /** Emitted when the toast is manually dismissed by the user */
  @Output() dismissed = new EventEmitter<void>();


  isEntering = true;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    // Mark as entered after animation completes
    setTimeout(() => {
      this.isEntering = false;
    }, 300);
  }

  onDismiss(): void {
    this.dismissed.emit();
  }
}
