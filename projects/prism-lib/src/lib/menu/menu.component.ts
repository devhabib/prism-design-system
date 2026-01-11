import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="prism-menu" 
      [class.prism-menu--right]="align === 'right'"
      [class.prism-menu--left]="align === 'left'"
      *ngIf="isOpen"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      display: inline-block;
      width: 0;
      height: 0;
    }

    .prism-menu {
      position: absolute;
      top: calc(100% + 2px);
      min-width: 12rem;
      background: var(--color-surface, white);
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: var(--radius-md, 8px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 0.25rem 0;
      z-index: 1000;
      animation: menuFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      transform-origin: top center;
    }

    .prism-menu--right {
      right: 0;
      left: auto;
    }

    .prism-menu--left {
      left: 0;
      right: auto;
    }

    @keyframes menuFadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismMenuComponent {
  @Input() align: 'left' | 'right' = 'right'; // Default to right for profile dropdowns common use case

  constructor(private cdr: ChangeDetectorRef) { }

  isOpen = false;

  open() {
    this.isOpen = true;
    this.cdr.markForCheck();
  }

  close() {
    this.isOpen = false;
    this.cdr.markForCheck();
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.cdr.markForCheck();
  }
}
