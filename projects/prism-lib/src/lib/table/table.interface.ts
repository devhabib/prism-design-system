import { TemplateRef } from '@angular/core';

/**
 * Table column configuration interface
 * Defines the structure for configuring table columns
 */
export interface TableColumn {
  /** Property key in the data object (supports nested paths like 'user.name') */
  key: string;

  /** Header label text displayed in the column header */
  label: string;

  /** Enable sorting for this column (default: false) */
  sortable?: boolean;

  /** Custom cell template - receives row data via $implicit context */
  template?: TemplateRef<any>;

  /** Column width (CSS value, e.g., '100px', '20%') */
  width?: string;

  /** Text alignment within cells */
  align?: 'left' | 'center' | 'right';
}

/**
 * Sort event emitted when user clicks a sortable column header
 */
export interface SortEvent {
  /** Column key that was sorted */
  column: string;

  /** Sort direction: 'asc' for ascending, 'desc' for descending, null for unsorted */
  direction: 'asc' | 'desc' | null;
}

/**
 * Page change event emitted during pagination
 */
export interface PageChangeEvent {
  /** Current page number (1-indexed) */
  page: number;

  /** Number of items per page */
  pageSize: number;
}
