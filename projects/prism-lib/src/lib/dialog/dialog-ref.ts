import { Subject, Observable } from 'rxjs';

/**
 * Reference to a dialog opened via PrismDialogService
 * 
 * Provides methods to close the dialog and subscribe to its result.
 * Similar to MatDialogRef but built from scratch.
 */
export class DialogRef<T = any, R = any> {
  private readonly _afterClosed = new Subject<R | undefined>();
  private readonly _backdropClick = new Subject<MouseEvent>();

  /** Component instance inside the dialog */
  componentInstance: T | null = null;

  /**
   * Observable that emits when the dialog is closed
   * @returns The result passed to close(), or undefined
   */
  afterClosed(): Observable<R | undefined> {
    return this._afterClosed.asObservable();
  }

  /**
   * Observable that emits when the backdrop is clicked
   */
  backdropClick(): Observable<MouseEvent> {
    return this._backdropClick.asObservable();
  }

  /**
   * Close the dialog with an optional result
   * @param result The result to emit to afterClosed observers
   */
  close(result?: R): void {
    this._afterClosed.next(result);
    this._afterClosed.complete();
    this._backdropClick.complete();
  }

  /** @internal Emit backdrop click event */
  _emitBackdropClick(event: MouseEvent): void {
    this._backdropClick.next(event);
  }
}

/**
 * Configuration options for opening a dialog
 */
export interface DialogConfig<D = any> {
  /** Data to pass to the dialog component via DIALOG_DATA */
  data?: D;

  /** Width of the dialog (CSS value) */
  width?: string;

  /** Max width of the dialog (CSS value) */
  maxWidth?: string;

  /** Height of the dialog (CSS value) */
  height?: string;

  /** Whether clicking the backdrop closes the dialog */
  disableClose?: boolean;

  /** Custom CSS class for the dialog panel */
  panelClass?: string | string[];

  /** Whether to show backdrop */
  hasBackdrop?: boolean;
}
