import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

/**
 * Drawer Component - Slide-in panel from the right
 */
@Component({
  selector: 'prism-drawer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <!-- Backdrop -->
    <div 
      class="drawer-backdrop"
      [class.drawer-backdrop--visible]="isOpen"
      (click)="onBackdropClick()"
    ></div>
    
    <!-- Drawer Panel -->
    <div 
      class="drawer-panel"
      [class.drawer-panel--open]="isOpen"
      [style.width]="width"
    >
      <!-- Header -->
      <div class="drawer-header">
        <h2 class="drawer-title">
          <ng-content select="[drawer-title]"></ng-content>
        </h2>
        <button class="drawer-close" (click)="close()" aria-label="Close drawer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="drawer-body">
        <ng-content></ng-content>
      </div>

      <!-- Footer -->
      <div class="drawer-footer">
        <ng-content select="[drawer-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .drawer-backdrop--visible {
      opacity: 1;
      visibility: visible;
    }

    .drawer-panel {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      background: var(--color-surface, #ffffff);
      box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .drawer-panel--open {
      transform: translateX(0);
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--color-border, #e5e7eb);
      flex-shrink: 0;
    }

    .drawer-title {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text-primary, #111827);
    }

    .drawer-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: transparent;
      border-radius: var(--radius-md, 0.5rem);
      color: var(--color-text-secondary, #6b7280);
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .drawer-close:hover {
      background: var(--color-surface-elevated, #f9fafb);
      color: var(--color-text-primary, #111827);
    }

    .drawer-body {
      flex: 1;
      padding: 1.5rem;
      overflow-y: auto;
    }

    .drawer-footer {
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--color-border, #e5e7eb);
      flex-shrink: 0;
    }

    .drawer-footer:empty {
      display: none;
    }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Input() width: string = '400px';
  @Input() closeOnBackdrop: boolean = true;

  @Output() closed = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  open(): void {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  close(): void {
    this.isOpen = false;
    document.body.style.overflow = '';
    this.closed.emit();
    this.cdr.detectChanges();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }
}
