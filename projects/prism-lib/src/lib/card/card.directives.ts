import { Directive, HostBinding } from '@angular/core';

/**
 * Directive for Card Header slot
 * Automatically applies header styling to the element
 * 
 * @example
 * <div prism-card-header>
 *   <h3>Title</h3>
 * </div>
 */
@Directive({
  selector: '[prism-card-header]',
  standalone: true,
})
export class CardHeaderDirective {
  @HostBinding('class') className = 'prism-card-header';
}

/**
 * Directive for Card Media slot
 * Automatically handles aspect ratios for images/videos
 * 
 * @example
 * <img prism-card-media src="image.jpg" alt="Description" />
 */
@Directive({
  selector: '[prism-card-media]',
  standalone: true,
})
export class CardMediaDirective {
  @HostBinding('class') className = 'prism-card-media';
}

/**
 * Directive for Card Body slot
 * Main content area with proper typography
 * 
 * @example
 * <div prism-card-body>
 *   <p>Content here...</p>
 * </div>
 */
@Directive({
  selector: '[prism-card-body]',
  standalone: true,
})
export class CardBodyDirective {
  @HostBinding('class') className = 'prism-card-body';
}

/**
 * Directive for Card Actions slot
 * Bottom section for buttons/links
 * 
 * @example
 * <div prism-card-actions>
 *   <prism-button>Learn More</prism-button>
 * </div>
 */
@Directive({
  selector: '[prism-card-actions]',
  standalone: true,
})
export class CardActionsDirective {
  @HostBinding('class') className = 'prism-card-actions';
}

/**
 * Directive for Card Title inside header
 * 
 * @example
 * <h3 prism-card-title>Card Title</h3>
 */
@Directive({
  selector: '[prism-card-title]',
  standalone: true,
})
export class CardTitleDirective {
  @HostBinding('class') className = 'prism-card-title';
}

/**
 * Directive for Card Subtitle
 * 
 * @example
 * <span prism-card-subtitle>Subtitle text</span>
 */
@Directive({
  selector: '[prism-card-subtitle]',
  standalone: true,
})
export class CardSubtitleDirective {
  @HostBinding('class') className = 'subtitle';
}
