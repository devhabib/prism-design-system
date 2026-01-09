import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Card Component - Multi-slot content projection container
 * 
 * @example
 * <prism-card [hoverable]="true">
 *   <img prism-card-media src="image.jpg" alt="Card image" />
 *   <div prism-card-header>
 *     <h3>Card Title</h3>
 *   </div>
 *   <div prism-card-body>
 *     <p>Card content goes here...</p>
 *   </div>
 *   <div prism-card-actions>
 *     <prism-button variant="primary">Action</prism-button>
 *   </div>
 * </prism-card>
 */
@Component({
  selector: 'prism-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  /** Enables hover animation with elevated shadow */
  @Input() hoverable: boolean = false;

  /** Elevation level (0-5, default: 1) */
  @Input() elevation: 0 | 1 | 2 | 3 | 4 | 5 = 1;

  /** Removes padding from card body */
  @Input() noPadding: boolean = false;

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'prism-card',
      `prism-card--elevation-${this.elevation}`,
      this.hoverable ? 'prism-card--hoverable' : '',
      this.noPadding ? 'prism-card--no-padding' : '',
    ].filter(Boolean).join(' ');
  }
}
