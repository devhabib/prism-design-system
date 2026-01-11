import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button variant types
 * - primary: Main call-to-action, filled with primary color
 * - secondary: Secondary actions, filled with neutral color
 * - outline: Bordered button with transparent background
 * - ghost: Minimal button with no border or background
 * - danger: Destructive actions, filled with error/red color
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button size options mapped to spacing tokens
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button Component - A foundational primitive for the Prism Design System
 * 
 * @example
 * <prism-button variant="primary" size="md">Click Me</prism-button>
 * <prism-button variant="outline" [loading]="true">Loading...</prism-button>
 */
@Component({
  selector: 'prism-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /** Visual style variant of the button */
  @Input() variant: ButtonVariant = 'primary';

  /** Size of the button (affects padding and font-size) */
  @Input() size: ButtonSize = 'md';

  /** Shows a loading spinner and disables the button */
  @Input() loading: boolean = false;

  /** Disables the button and reduces opacity */
  @Input() disabled: boolean = false;

  /**
   * Applies variant and size classes to the host element
   * This allows for flexible styling from parent components
   */
  @HostBinding('class')
  get hostClasses(): string {
    return [
      'prism-button',
      `prism-button--${this.variant}`,
      `prism-button--${this.size}`,
      this.loading ? 'prism-button--loading' : '',
      this.disabled ? 'prism-button--disabled' : '',
    ].filter(Boolean).join(' ');
  }
}
