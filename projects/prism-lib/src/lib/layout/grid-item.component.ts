import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Grid Item Component
 * 
 * An individual cell in a prism-grid with configurable spanning and positioning.
 * 
 * @example
 * ```html
 * <prism-grid-item colSpan="6" colStart="4">
 *   Spans 6 columns, starts at column 4
 * </prism-grid-item>
 * ```
 */
@Component({
  selector: 'prism-grid-item',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      grid-column: var(--grid-item-col-start, auto) / span var(--grid-item-col-span, 1);
      grid-row: var(--grid-item-row-start, auto) / span var(--grid-item-row-span, 1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridItemComponent {
  /** Number of columns this item spans */
  @Input() colSpan: number | string = 1;

  /** Number of rows this item spans */
  @Input() rowSpan: number | string = 1;

  /** Starting column position (1-indexed) */
  @Input() colStart: number | string | null = null;

  /** Starting row position (1-indexed) */
  @Input() rowStart: number | string | null = null;

  /** Column offset (alternative to colStart) */
  @Input() set offset(value: number | string) {
    this.colStart = Number(value) + 1;
  }

  @HostBinding('style.--grid-item-col-span')
  get colSpanStyle(): string {
    return String(this.colSpan);
  }

  @HostBinding('style.--grid-item-row-span')
  get rowSpanStyle(): string {
    return String(this.rowSpan);
  }

  @HostBinding('style.--grid-item-col-start')
  get colStartStyle(): string | null {
    return this.colStart ? String(this.colStart) : null;
  }

  @HostBinding('style.--grid-item-row-start')
  get rowStartStyle(): string | null {
    return this.rowStart ? String(this.rowStart) : null;
  }
}
