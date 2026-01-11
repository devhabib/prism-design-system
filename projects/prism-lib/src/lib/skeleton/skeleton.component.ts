import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonShape = 'text' | 'circle' | 'rect';

@Component({
  selector: 'prism-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="prism-skeleton prism-skeleton--{{shape}}"
      [style.width]="width"
      [style.height]="height"
    ></div>
  `,
  styles: [`
    .prism-skeleton {
      background: linear-gradient(
        90deg,
        #f0f0f0 0%,
        #f8f8f8 50%,
        #f0f0f0 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s ease-in-out infinite;
      border-radius: var(--radius-sm, 4px);
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    .prism-skeleton--text {
      border-radius: var(--radius-sm, 4px);
    }

    .prism-skeleton--circle {
      border-radius: 50%;
      aspect-ratio: 1/1;
    }

    .prism-skeleton--rect {
      border-radius: var(--radius-md, 8px);
    }

    /* Dark mode support */
    .dark-theme .prism-skeleton {
      background: linear-gradient(
        90deg,
        #2d3748 0%,
        #4a5568 50%,
        #2d3748 100%
      );
      background-size: 200% 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismSkeletonComponent {
  @Input() width: string = '100%';
  @Input() height: string = '1rem';
  @Input() shape: SkeletonShape = 'text';
}
