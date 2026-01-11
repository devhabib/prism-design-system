import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="prism-avatar prism-avatar--{{size}}"
      [style.background-color]="!imageSrc || hasError ? 'var(--prism-avatar-bg, #e5e7eb)' : 'transparent'"
    >
      <img 
        *ngIf="imageSrc && !hasError" 
        [src]="imageSrc" 
        [alt]="alt"
        (error)="onImageError()"
        class="prism-avatar__img"
      />
      <span *ngIf="(!imageSrc || hasError) && initials" class="prism-avatar__initials">
        {{ initials }}
      </span>
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    .prism-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      aspect-ratio: 1/1;
      border: 2px solid var(--prism-border-color, #e5e7eb);
      font-weight: 600;
      color: var(--prism-text-muted, #6b7280);
      background-size: cover;
      background-position: center;
    }

    .prism-avatar--sm {
      width: 2rem;
      font-size: 0.75rem;
    }

    .prism-avatar--md {
      width: 3rem;
      font-size: 1rem;
    }

    .prism-avatar--lg {
      width: 5rem;
      font-size: 1.5rem;
    }

    .prism-avatar__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .prism-avatar__initials {
      text-transform: uppercase;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismAvatarComponent {
  @Input() imageSrc?: string;
  @Input() initials?: string;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() alt: string = 'User avatar';

  hasError = false;

  onImageError() {
    this.hasError = true;
  }
}
