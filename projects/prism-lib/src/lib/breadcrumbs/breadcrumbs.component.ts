import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string | any[];
}

@Component({
  selector: 'prism-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="Breadcrumb">
      <ol class="prism-breadcrumbs">
        <li *ngFor="let item of items; let last = last; let first = first" 
            class="prism-breadcrumbs__item"
            [class.prism-breadcrumbs__item--active]="last">
          
          <!-- Separator (Chevron) -->
          <span *ngIf="!first" class="prism-breadcrumbs__separator" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>

          <!-- Item -->
          <ng-container *ngIf="!last && item.url">
            <a [routerLink]="item.url" class="prism-breadcrumbs__link">
              {{ item.label }}
            </a>
          </ng-container>
          
          <ng-container *ngIf="last || !item.url">
            <span class="prism-breadcrumbs__text" [attr.aria-current]="last ? 'page' : null">
              {{ item.label }}
            </span>
          </ng-container>
        </li>
      </ol>
    </nav>
  `,
  styles: [`
    .prism-breadcrumbs {
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .prism-breadcrumbs__item {
      display: flex;
      align-items: center;
    }

    .prism-breadcrumbs__separator {
      margin: 0 0.5rem;
      color: var(--color-text-tertiary, #9ca3af);
      display: flex;
      align-items: center;
    }

    .prism-breadcrumbs__link {
      color: var(--color-text-secondary, #6b7280);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: color 0.15s ease;
    }

    .prism-breadcrumbs__link:hover {
      color: var(--color-primary, #3b82f6);
    }

    .prism-breadcrumbs__text {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary, #6b7280);
    }

    .prism-breadcrumbs__item--active .prism-breadcrumbs__text {
      color: var(--color-text-primary, #111827);
      font-weight: 600;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismBreadcrumbsComponent {
  @Input() items: BreadcrumbItem[] = [];
}
