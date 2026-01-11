import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'primary';
export type BadgeShape = 'pill' | 'rectangle';

@Component({
  selector: 'prism-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="prism-badge prism-badge--{{variant}} prism-badge--{{shape}}">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    .prism-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.25rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      border-radius: var(--radius-md, 6px);
    }

    /* Shape variants */
    .prism-badge--pill {
      border-radius: 9999px;
    }

    .prism-badge--rectangle {
      border-radius: var(--radius-sm, 4px);
    }

    /* Color variants */
    .prism-badge--success {
      background-color: #ecfdf5;
      color: #065f46;
    }

    .prism-badge--warning {
      background-color: #fffbeb;
      color: #92400e;
    }

    .prism-badge--error {
      background-color: #fef2f2;
      color: #991b1b;
    }

    .prism-badge--neutral {
      background-color: #f3f4f6;
      color: #1f2937;
    }

    .prism-badge--primary {
      background-color: #eff6ff;
      color: #1e40af;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismBadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';
  @Input() shape: BadgeShape = 'pill';
}
