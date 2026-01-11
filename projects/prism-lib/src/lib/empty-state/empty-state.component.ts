import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-empty-state">
      <div class="prism-empty-state__icon">
        <!-- Default Search Icon -->
        <svg *ngIf="icon === 'search'" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <!-- Default Folder Icon -->
        <svg *ngIf="icon === 'folder-open'" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>

        <!-- Default Users Icon -->
        <svg *ngIf="icon === 'users'" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
      
      <h3 class="prism-empty-state__title">{{ title }}</h3>
      
      <p class="prism-empty-state__description" *ngIf="description">
        {{ description }}
      </p>

      <div class="prism-empty-state__actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .prism-empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      text-align: center;
      background: var(--color-surface, white);
      border-radius: var(--radius-lg, 12px);
    }

    .prism-empty-state__icon {
      margin-bottom: 1rem;
      color: var(--color-text-tertiary, #9ca3af);
      background: var(--color-surface-elevated, #f3f4f6);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .prism-empty-state__title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text-primary, #111827);
      margin: 0 0 0.5rem 0;
    }

    .prism-empty-state__description {
      font-size: 0.875rem;
      color: var(--color-text-secondary, #6b7280);
      margin: 0 0 1.5rem 0;
      max-width: 24rem;
      line-height: 1.5;
    }

    .prism-empty-state__actions {
      display: flex;
      gap: 0.75rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismEmptyStateComponent {
  @Input() icon: 'search' | 'folder-open' | 'users' = 'search';
  @Input() title: string = 'No results found';
  @Input() description: string = '';
}
