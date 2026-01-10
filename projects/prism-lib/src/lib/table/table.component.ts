import {
  Component,
  Input,
  Output,
  EventEmitter,
  TrackByFunction,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn, SortEvent, PageChangeEvent } from './table.interface';

// Re-export interfaces for convenience
export type { TableColumn, SortEvent, PageChangeEvent } from './table.interface';

/**
 * Data Table Component - Generic, reusable data presentation
 * 
 * Separates data structure from presentation via column configuration.
 * Supports custom cell templates via TemplateRef, sorting, and pagination.
 * Pagination follows the "dumb component" pattern - logic is handled by parent.
 * 
 * @example Basic usage
 * ```html
 * <prism-table 
 *   [data]="users" 
 *   [columns]="columns"
 *   (sortChange)="onSort($event)"
 * ></prism-table>
 * ```
 * 
 * @example With custom template
 * ```html
 * <prism-table [data]="users" [columns]="columns"></prism-table>
 * 
 * <ng-template #statusTpl let-row>
 *   <span class="badge" [class.active]="row.status === 'Active'">
 *     {{ row.status }}
 *   </span>
 * </ng-template>
 * ```
 * Then pass `statusTpl` to column config: `{ key: 'status', label: 'Status', template: statusTpl }`
 * 
 * @example With pagination
 * ```html
 * <prism-table 
 *   [data]="paginatedUsers" 
 *   [columns]="columns"
 *   [totalItems]="totalUsers"
 *   [pageSize]="10"
 *   [currentPage]="page"
 *   (pageChange)="onPageChange($event)"
 * ></prism-table>
 * ```
 */
@Component({
  selector: 'prism-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T = any> {
  /** Data array to display (current page if paginated) */
  @Input() data: T[] = [];

  /** Column configuration */
  @Input() columns: TableColumn[] = [];

  /** Enable striped rows */
  @Input() striped: boolean = false;

  /** Enable hover effect on rows */
  @Input() hoverable: boolean = true;

  /** Enable compact mode (smaller padding) */
  @Input() compact: boolean = false;

  /** Show loading state */
  @Input() loading: boolean = false;

  /** Empty state message */
  @Input() emptyMessage: string = 'No data available';

  /** Track by function for performance */
  @Input() trackBy: TrackByFunction<T> = (index: number) => index;

  // ============================================
  // Pagination Inputs (Dumb Component Pattern)
  // ============================================

  /** Total number of items (for pagination calculation) */
  @Input() totalItems: number = 0;

  /** Number of items per page */
  @Input() pageSize: number = 10;

  /** Current page number (1-indexed) */
  @Input() currentPage: number = 1;

  /** Show pagination controls */
  @Input() showPagination: boolean = false;

  // ============================================
  // Outputs
  // ============================================

  /** Sort change event */
  @Output() sortChange = new EventEmitter<SortEvent>();

  /** Row click event */
  @Output() rowClick = new EventEmitter<T>();

  /** Page change event (emits new page number) */
  @Output() pageChange = new EventEmitter<number>();

  // ============================================
  // Internal State
  // ============================================

  /** Current sort state */
  currentSort: SortEvent = { column: '', direction: null };

  /**
   * Get cell value from row data (supports nested paths)
   */
  getCellValue(row: T, column: TableColumn): any {
    const keys = column.key.split('.');
    let value: any = row;

    for (const key of keys) {
      if (value == null) return '';
      value = value[key];
    }

    return value ?? '';
  }

  /**
   * Handle column header click for sorting
   */
  onHeaderClick(column: TableColumn): void {
    if (!column.sortable) return;

    let direction: 'asc' | 'desc' | null = 'asc';

    if (this.currentSort.column === column.key) {
      // Cycle through: asc -> desc -> null
      if (this.currentSort.direction === 'asc') {
        direction = 'desc';
      } else if (this.currentSort.direction === 'desc') {
        direction = null;
      }
    }

    this.currentSort = { column: column.key, direction };
    this.sortChange.emit(this.currentSort);
  }

  /**
   * Get sort icon class
   */
  getSortClass(column: TableColumn): string {
    if (!column.sortable) return '';
    if (this.currentSort.column !== column.key) return 'sort-inactive';
    return this.currentSort.direction === 'asc' ? 'sort-asc' : 'sort-desc';
  }

  /**
   * Handle row click
   */
  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }

  // ============================================
  // Pagination Helpers
  // ============================================

  /** Calculate total pages */
  get totalPages(): number {
    if (this.totalItems <= 0 || this.pageSize <= 0) return 1;
    return Math.ceil(this.totalItems / this.pageSize);
  }

  /** Check if previous page is available */
  get canGoPrevious(): boolean {
    return this.currentPage > 1;
  }

  /** Check if next page is available */
  get canGoNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  /** Go to previous page */
  goToPrevious(): void {
    if (this.canGoPrevious) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  /** Go to next page */
  goToNext(): void {
    if (this.canGoNext) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  /** Go to specific page */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
