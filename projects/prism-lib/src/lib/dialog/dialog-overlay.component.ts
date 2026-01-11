import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DialogConfig } from './dialog-ref';
import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * Dialog Overlay Component
 * 
 * Visual container that covers the screen (backdrop) and hosts the dialog content.
 * Built from scratch without Angular CDK.
 * 
 * Features:
 * - Click outside to close (if enabled)
 * - Fade in/out animations
 * - Focus trapping (basic implementation)
 * - ESC key to close
 */
@Component({
  selector: 'prism-dialog-overlay',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div 
      class="prism-dialog-backdrop"
      [@fadeInOut]="animationState"
      (click)="onBackdropClick($event)"
    >
      <div 
        #dialogPanel
        class="prism-dialog-panel"
        [class]="panelClass"
        [style.width]="config.width || '400px'"
        [style.maxWidth]="config.maxWidth || '90vw'"
        [style.height]="config.height"
        role="dialog"
        aria-modal="true"
        (click)="$event.stopPropagation()"
        [@slideIn]="animationState"
      >
        <!-- Dynamic content will be projected here -->
        <ng-container #contentContainer></ng-container>
      </div>
    </div>
  `,
  styleUrls: ['./dialog-overlay.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('enter', style({ opacity: 1 })),
      state('leave', style({ opacity: 0 })),
      transition('void => enter', animate('150ms ease-out')),
      transition('enter => leave', animate('100ms ease-in')),
    ]),
    trigger('slideIn', [
      state('void', style({ opacity: 0, transform: 'scale(0.95) translateY(-10px)' })),
      state('enter', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      state('leave', style({ opacity: 0, transform: 'scale(0.95) translateY(-10px)' })),
      transition('void => enter', animate('200ms ease-out')),
      transition('enter => leave', animate('150ms ease-in')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogOverlayComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('contentContainer', { read: ViewContainerRef, static: true })
  contentContainer!: ViewContainerRef;

  @ViewChild('dialogPanel', { static: true })
  dialogPanel!: ElementRef<HTMLElement>;

  @Input() dialogRef!: DialogRef<any>;
  @Input() config: DialogConfig = {};

  animationState: 'void' | 'enter' | 'leave' = 'enter';

  private previousActiveElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];

  constructor(private cdr: ChangeDetectorRef) { }

  get panelClass(): string {
    if (!this.config.panelClass) return '';
    return Array.isArray(this.config.panelClass)
      ? this.config.panelClass.join(' ')
      : this.config.panelClass;
  }

  ngOnInit(): void {
    // Start with 'enter' animation state immediately
    this.animationState = 'enter';
  }

  ngAfterViewInit(): void {
    // Store currently focused element
    this.previousActiveElement = document.activeElement as HTMLElement;

    // Force change detection to ensure proper rendering
    this.cdr.detectChanges();

    // Set up focus trap
    this.setupFocusTrap();
  }

  ngOnDestroy(): void {
    // Restore focus to previous element
    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (!this.config.disableClose) {
      this.startCloseAnimation();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTabKey(event: Event): void {
    this.trapFocus(event as KeyboardEvent);
  }

  onBackdropClick(event: MouseEvent): void {
    this.dialogRef._emitBackdropClick(event);

    if (!this.config.disableClose) {
      this.startCloseAnimation();
    }
  }

  /**
   * Start the close animation, then close the dialog
   */
  startCloseAnimation(): void {
    this.animationState = 'leave';
    this.cdr.detectChanges();

    // Wait for animation to complete
    setTimeout(() => {
      this.dialogRef.close();
    }, 150);
  }

  /**
   * Set up focus trapping within the dialog
   */
  private setupFocusTrap(): void {
    const panel = this.dialogPanel.nativeElement;

    // Find all focusable elements
    this.focusableElements = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled'));

    // Focus first focusable element, or the panel itself
    if (this.focusableElements.length > 0) {
      setTimeout(() => this.focusableElements[0].focus(), 0);
    } else {
      panel.setAttribute('tabindex', '-1');
      panel.focus();
    }
  }

  /**
   * Trap focus within the dialog
   */
  private trapFocus(event: KeyboardEvent): void {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab: go backwards
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: go forwards
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
}
