import {
  Injectable,
  ApplicationRef,
  Injector,
  Type,
  createComponent,
  EnvironmentInjector,
  ComponentRef,
} from '@angular/core';
import { DialogRef, DialogConfig } from './dialog-ref';
import { DialogOverlayComponent } from './dialog-overlay.component';
import { DIALOG_DATA, DIALOG_REF } from './dialog.tokens';

/**
 * Dialog Service - Programmatically open dialogs
 * 
 * Built from scratch without Angular CDK using ApplicationRef.
 * Dynamically creates overlay and content components, attaching them
 * directly to the document body.
 * 
 * @example
 * ```typescript
 * @Component({ ... })
 * export class MyComponent {
 *   constructor(private dialog: DialogService) {}
 *   
 *   openDialog() {
 *     const ref = this.dialog.open(MyDialogComponent, {
 *       data: { message: 'Hello!' },
 *       width: '400px'
 *     });
 *     
 *     ref.afterClosed().subscribe(result => {
 *       console.log('Dialog closed with:', result);
 *     });
 *   }
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class DialogService {
  private openDialogs: Map<DialogRef, ComponentRef<DialogOverlayComponent>> = new Map();

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private envInjector: EnvironmentInjector
  ) { }

  /**
   * Open a dialog with the given component
   * 
   * @param component The component type to render inside the dialog
   * @param config Optional configuration including data and styling
   * @returns DialogRef to control the dialog and subscribe to close events
   */
  open<T, D = any, R = any>(
    component: Type<T>,
    config: DialogConfig<D> = {}
  ): DialogRef<T, R> {
    // Create the dialog reference
    const dialogRef = new DialogRef<T, R>();

    // Create a custom injector with dialog data and ref
    const dialogInjector = Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: config.data },
        { provide: DIALOG_REF, useValue: dialogRef },
        { provide: DialogRef, useValue: dialogRef },
      ],
      parent: this.injector,
    });

    // Create the overlay component
    const overlayRef = createComponent(DialogOverlayComponent, {
      environmentInjector: this.envInjector,
      elementInjector: dialogInjector,
    });

    // Set overlay inputs
    overlayRef.instance.dialogRef = dialogRef;
    overlayRef.instance.config = config;

    // Create the user's content component
    const contentRef = createComponent(component, {
      environmentInjector: this.envInjector,
      elementInjector: dialogInjector,
    });

    // Store reference to component instance
    dialogRef.componentInstance = contentRef.instance;

    // Project content into overlay's ViewContainerRef
    overlayRef.instance.contentContainer.insert(contentRef.hostView);

    // Attach overlay to ApplicationRef (renders to DOM)
    this.appRef.attachView(overlayRef.hostView);

    // Force change detection to ensure proper initial render
    overlayRef.changeDetectorRef.detectChanges();

    // Append to document body
    const overlayElement = overlayRef.location.nativeElement;
    document.body.appendChild(overlayElement);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Store reference for cleanup
    this.openDialogs.set(dialogRef, overlayRef);

    // Clean up when dialog closes
    dialogRef.afterClosed().subscribe(() => {
      this.destroyDialog(dialogRef, overlayRef, contentRef);
    });

    return dialogRef;
  }

  /**
   * Close all open dialogs
   */
  closeAll(): void {
    this.openDialogs.forEach((_, dialogRef) => {
      dialogRef.close();
    });
  }

  /**
   * Clean up dialog resources
   */
  private destroyDialog(
    dialogRef: DialogRef,
    overlayRef: ComponentRef<DialogOverlayComponent>,
    contentRef: ComponentRef<any>
  ): void {
    // Remove from tracking
    this.openDialogs.delete(dialogRef);

    // Detach views
    this.appRef.detachView(overlayRef.hostView);
    this.appRef.detachView(contentRef.hostView);

    // Destroy components
    contentRef.destroy();
    overlayRef.destroy();

    // Restore body scroll if no dialogs open
    if (this.openDialogs.size === 0) {
      document.body.style.overflow = '';
    }
  }
}
