import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'prism-pagination',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="prism-pagination">
      <prism-button 
        variant="ghost" 
        size="sm"
        [disabled]="currentPage === 1"
        (click)="goToPage(currentPage - 1)"
      >
        Previous
      </prism-button>

      <div class="prism-pagination__pages">
        <button
          *ngFor="let page of visiblePages"
          class="prism-pagination__page"
          [class.prism-pagination__page--active]="page === currentPage"
          [class.prism-pagination__page--ellipsis]="page === -1"
          [disabled]="page === -1"
          (click)="page !== -1 && goToPage(page)"
        >
          {{ page === -1 ? '...' : page }}
        </button>
      </div>

      <prism-button 
        variant="ghost" 
        size="sm"
        [disabled]="currentPage === totalPages"
        (click)="goToPage(currentPage + 1)"
      >
        Next
      </prism-button>
    </div>
  `,
  styles: [`
    .prism-pagination {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: center;
      padding: 1rem 0;
    }

    .prism-pagination__pages {
      display: flex;
      gap: 0.25rem;
    }

    .prism-pagination__page {
      min-width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      color: var(--color-text-secondary, #6b7280);
      font-size: 0.875rem;
      font-weight: 500;
      border-radius: var(--radius-sm, 4px);
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .prism-pagination__page:hover:not(:disabled):not(.prism-pagination__page--active) {
      background: var(--color-surface-elevated, #f9fafb);
      color: var(--color-text-primary, #1f2937);
    }

    .prism-pagination__page--active {
      background: var(--color-primary, #3b82f6);
      color: white;
      font-weight: 600;
    }

    .prism-pagination__page--ellipsis {
      cursor: default;
    }

    .prism-pagination__page:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismPaginationComponent {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get visiblePages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];

    if (total <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push(-1); // Ellipsis
      }

      // Show pages around current
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push(-1); // Ellipsis
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
