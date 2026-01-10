import { InjectionToken } from '@angular/core';

/**
 * Injection token for dialog data
 * 
 * Use this token to inject data passed to a dialog component.
 * 
 * @example
 * ```typescript
 * @Component({ ... })
 * export class MyDialogComponent {
 *   constructor(@Inject(DIALOG_DATA) public data: MyDataType) {}
 * }
 * ```
 */
export const DIALOG_DATA = new InjectionToken<any>('PrismDialogData');

/**
 * Injection token for the DialogRef
 * 
 * Use this to inject the dialog reference inside the dialog component.
 * 
 * @example
 * ```typescript
 * @Component({ ... })
 * export class MyDialogComponent {
 *   constructor(
 *     @Inject(DIALOG_REF) private dialogRef: DialogRef
 *   ) {}
 *   
 *   close() {
 *     this.dialogRef.close('result');
 *   }
 * }
 * ```
 */
export const DIALOG_REF = new InjectionToken<any>('PrismDialogRef');
