import { Component, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-menu-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-menu-item">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .prism-menu-item {
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      color: var(--color-text-primary, #1f2937);
      cursor: pointer;
      transition: background-color 0.15s ease;
    }

    .prism-menu-item:hover {
      background-color: var(--color-surface-elevated, #f9fafb);
    }

    .prism-menu-item:active {
      background-color: var(--color-surface-pressed, #f3f4f6);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismMenuItemComponent {
  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // Allow click events to propagate to parent handlers
  }
}
