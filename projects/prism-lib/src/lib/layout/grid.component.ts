import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Grid Component
 * 
 * A flexible CSS Grid container with configurable columns and gaps.
 * Uses CSS variables for full customization.
 * 
 * @example
 * ```html
 * <prism-grid columns="12" gap="md">
 *   <prism-grid-item colSpan="6">Left</prism-grid-item>
 *   <prism-grid-item colSpan="6">Right</prism-grid-item>
 * </prism-grid>
 * ```
 */
@Component({
  selector: 'prism-grid',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: grid;
      grid-template-columns: repeat(var(--grid-columns, 12), 1fr);
      gap: var(--grid-gap-y, 1rem) var(--grid-gap-x, 1rem);
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  /** Number of columns in the grid */
  @Input() columns: number | string = 12;

  /** Gap between grid items - applies to both axes */
  @Input() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string = 'md';

  /** Horizontal gap (column gap) - overrides gap for x-axis */
  @Input() gapX: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string | null = null;

  /** Vertical gap (row gap) - overrides gap for y-axis */
  @Input() gapY: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | string | null = null;

  /** Alignment of items on the inline axis */
  @Input() alignItems: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

  @HostBinding('style.--grid-columns')
  get columnsStyle(): string {
    return String(this.columns);
  }

  @HostBinding('style.--grid-gap-x')
  get gapXStyle(): string {
    return this.resolveSpacing(this.gapX || this.gap);
  }

  @HostBinding('style.--grid-gap-y')
  get gapYStyle(): string {
    return this.resolveSpacing(this.gapY || this.gap);
  }

  @HostBinding('style.align-items')
  get alignStyle(): string {
    return this.alignItems;
  }

  private resolveSpacing(value: string): string {
    const spacingTokens: Record<string, string> = {
      'none': '0',
      'xs': '0.5rem',
      'sm': '0.75rem',
      'md': '1rem',
      'lg': '1.5rem',
      'xl': '2rem',
      '2xl': '3rem',
    };
    return spacingTokens[value] || value;
  }
}
