import { Component, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'prism-checkbox',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismCheckboxComponent),
      multi: true
    }
  ],
  template: `
    <label class="prism-checkbox" [class.prism-checkbox--disabled]="disabled">
      <input
        type="checkbox"
        class="prism-checkbox__input"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onCheckboxChange($event)"
      />
      <span class="prism-checkbox__box">
        <svg *ngIf="checked" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </span>
      <span *ngIf="label" class="prism-checkbox__label">{{ label }}</span>
      <ng-content></ng-content>
    </label>
  `,
  styles: [`
    .prism-checkbox {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      user-select: none;
    }

    .prism-checkbox--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .prism-checkbox__input {
      position: absolute;
      opacity: 0;
      pointer-events: none;
    }

    .prism-checkbox__box {
      position: relative;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      border: 2px solid var(--color-border, #d1d5db);
      border-radius: var(--radius-sm, 4px);
      background-color: white;
      transition: all 0.2s ease;
    }

    .prism-checkbox__input:checked + .prism-checkbox__box {
      background-color: var(--color-primary, #3b82f6);
      border-color: var(--color-primary, #3b82f6);
    }

    .prism-checkbox__input:focus-visible + .prism-checkbox__box {
      box-shadow: 0 0 0 2px white, 0 0 0 4px var(--color-primary, #3b82f6);
    }

    .prism-checkbox__box svg {
      width: 1rem;
      height: 1rem;
      color: white;
    }

    .prism-checkbox__label {
      font-size: 0.875rem;
      color: var(--color-text-primary, #1f2937);
    }

    .prism-checkbox--disabled .prism-checkbox__label {
      color: var(--color-text-muted, #9ca3af);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismCheckboxComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() disabled = false;

  checked = false;

  private onChange: (value: boolean) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onCheckboxChange(event: Event): void {
    if (this.disabled) return;

    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.onChange(this.checked);
    this.onTouched();
  }
}
