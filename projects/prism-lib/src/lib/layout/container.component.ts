import {
  Component,
  Input,
  HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Container Component
 * 
 * A flexible, centered container with configurable max-width and padding.
 * Uses CSS variables for full customization.
 * 
 * @example
 * ```html
 * <prism-container maxWidth="xl" paddingX="lg" paddingY="md">
 *   Content here
 * </prism-container>
 * ```
 */
@Component({
  selector: 'prism-container',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      max-width: var(--container-max-width, 1280px);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--container-padding-x, 1.5rem);
      padding-right: var(--container-padding-x, 1.5rem);
      padding-top: var(--container-padding-y, 0);
      padding-bottom: var(--container-padding-y, 0);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
  /** 
   * Max width preset or custom value
   * Presets: 'sm' (640px), 'md' (768px), 'lg' (1024px), 'xl' (1280px), '2xl' (1536px), 'full' (100%)
   */
  @Input() maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | string = 'xl';

  /** Horizontal padding - uses spacing tokens or custom value */
  @Input() paddingX: 'none' | 'sm' | 'md' | 'lg' | 'xl' | string = 'lg';

  /** Vertical padding - uses spacing tokens or custom value */
  @Input() paddingY: 'none' | 'sm' | 'md' | 'lg' | 'xl' | string = 'none';

  @HostBinding('style.--container-max-width')
  get maxWidthStyle(): string {
    const presets: Record<string, string> = {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'full': '100%',
    };
    return presets[this.maxWidth] || this.maxWidth;
  }

  @HostBinding('style.--container-padding-x')
  get paddingXStyle(): string {
    return this.resolveSpacing(this.paddingX);
  }

  @HostBinding('style.--container-padding-y')
  get paddingYStyle(): string {
    return this.resolveSpacing(this.paddingY);
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
