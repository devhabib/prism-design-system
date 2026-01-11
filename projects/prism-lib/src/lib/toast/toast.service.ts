import {
  Injectable,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
} from '@angular/core';
import { PrismToastComponent } from './prism-toast.component';
import { ToastType, ToastConfig, ToastRef } from './toast.types';

/**
 * Toast Service
 * 
 * Global service for displaying toast notifications.
 * Manages a container element on document.body and stacks toasts vertically.
 * 
 * @example
 * ```typescript
 * constructor(private toast: ToastService) {}
 * 
 * showSuccess() {
 *   this.toast.success('Operation completed!');
 * }
 * 
 * showError() {
 *   this.toast.error('Something went wrong', 5000);
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private containerElement: HTMLElement | null = null;
  private toasts: Map<string, ComponentRef<PrismToastComponent>> = new Map();
  private counter = 0;

  constructor(
    private appRef: ApplicationRef,
    private envInjector: EnvironmentInjector
  ) { }

  /**
   * Show a toast notification
   */
  show(message: string, type: ToastType = 'info', duration: number = 3000): ToastRef {
    const id = `toast-${++this.counter}`;

    // Ensure container exists
    this.ensureContainer();

    // Create toast component
    const componentRef = createComponent(PrismToastComponent, {
      environmentInjector: this.envInjector,
    });

    // Set inputs
    componentRef.instance.message = message;
    componentRef.instance.type = type;

    // Trigger change detection to render the inputs
    componentRef.changeDetectorRef.detectChanges();

    // Subscribe to dismiss event
    componentRef.instance.dismissed.subscribe(() => {
      this.destroyToast(id);
    });

    // Attach to ApplicationRef
    this.appRef.attachView(componentRef.hostView);

    // Append to container
    const element = componentRef.location.nativeElement;
    this.containerElement!.appendChild(element);

    // Store reference
    this.toasts.set(id, componentRef);

    // Auto-dismiss after duration
    if (duration > 0) {
      setTimeout(() => {
        this.destroyToast(id);
      }, duration);
    }

    // Return ToastRef
    const toastRef: ToastRef = {
      id,
      config: { message, type, duration },
      dismiss: () => this.destroyToast(id),
    };

    return toastRef;
  }

  /**
   * Show a success toast
   */
  success(message: string, duration?: number): ToastRef {
    return this.show(message, 'success', duration);
  }

  /**
   * Show an error toast
   */
  error(message: string, duration?: number): ToastRef {
    return this.show(message, 'error', duration ?? 5000); // Errors stay longer
  }

  /**
   * Show an info toast
   */
  info(message: string, duration?: number): ToastRef {
    return this.show(message, 'info', duration);
  }

  /**
   * Show a warning toast
   */
  warning(message: string, duration?: number): ToastRef {
    return this.show(message, 'warning', duration ?? 4000);
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    this.toasts.forEach((_, id) => {
      this.destroyToast(id);
    });
  }

  /**
   * Ensure the container element exists on document.body
   */
  private ensureContainer(): void {
    if (this.containerElement && document.body.contains(this.containerElement)) {
      return;
    }

    // Check if container already exists
    let existing = document.querySelector('.prism-toast-container') as HTMLElement;

    if (existing) {
      this.containerElement = existing;
      return;
    }

    // Create new container
    this.containerElement = document.createElement('div');
    this.containerElement.className = 'prism-toast-container';
    this.containerElement.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      pointer-events: none;
    `;

    document.body.appendChild(this.containerElement);
  }

  /**
   * Destroy a toast by ID
   */
  private destroyToast(id: string): void {
    const componentRef = this.toasts.get(id);

    if (!componentRef) return;

    // Detach and destroy
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();

    // Remove from tracking
    this.toasts.delete(id);

    // Clean up empty container
    if (this.toasts.size === 0 && this.containerElement) {
      this.containerElement.remove();
      this.containerElement = null;
    }
  }
}
