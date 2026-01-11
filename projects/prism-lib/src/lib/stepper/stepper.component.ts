import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-stepper">
      <div 
        *ngFor="let step of steps; let i = index; let last = last" 
        class="prism-stepper__item"
        [class.prism-stepper__item--active]="i === currentStep"
        [class.prism-stepper__item--completed]="i < currentStep"
        [class.prism-stepper__item--pending]="i > currentStep"
      >
        <!-- Step Circle -->
        <div class="prism-stepper__circle">
          <ng-container *ngIf="i < currentStep; else number">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </ng-container>
          <ng-template #number>{{ i + 1 }}</ng-template>
        </div>

        <!-- Step Label -->
        <div class="prism-stepper__label">{{ step }}</div>

        <!-- Connector Line (except for last item) -->
        <div *ngIf="!last" class="prism-stepper__connector"></div>
      </div>
    </div>
  `,
  styles: [`
    .prism-stepper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }

    .prism-stepper__item {
      display: flex;
      align-items: center;
      position: relative;
      flex: 1; /* Distribute space */
    }

    .prism-stepper__item:last-child {
      flex: 0; /* Last item takes only needed space */
    }

    /* Circle */
    .prism-stepper__circle {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
      border: 2px solid;
      flex-shrink: 0;
      transition: all 0.3s ease;
      z-index: 1; /* Sit above connector */
      background: var(--color-surface, white);
    }

    /* Label */
    .prism-stepper__label {
      margin-left: 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary, #6b7280);
      white-space: nowrap;
    }

    /* Connector */
    .prism-stepper__connector {
      flex: 1;
      height: 2px;
      background: var(--color-border, #e5e7eb);
      margin: 0 1rem;
    }

    /* --- States --- */

    /* Active */
    .prism-stepper__item--active .prism-stepper__circle {
      border-color: var(--color-primary, #3b82f6);
      background: var(--color-primary, #3b82f6);
      color: white;
    }
    .prism-stepper__item--active .prism-stepper__label {
      color: var(--color-text-primary, #111827);
      font-weight: 600;
    }

    /* Completed */
    .prism-stepper__item--completed .prism-stepper__circle {
      border-color: var(--color-success, #10b981);
      background: var(--color-success, #10b981);
      color: white;
    }
    .prism-stepper__item--completed .prism-stepper__label {
      color: var(--color-text-primary, #111827);
    }
    .prism-stepper__item--completed .prism-stepper__connector {
      background: var(--color-success, #10b981);
    }

    /* Pending */
    .prism-stepper__item--pending .prism-stepper__circle {
      border-color: var(--color-border, #e5e7eb);
      color: var(--color-text-tertiary, #9ca3af);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismStepperComponent {
  @Input() steps: string[] = [];
  @Input() currentStep: number = 0;
}
