import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'prism-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismDatePickerComponent),
      multi: true
    }
  ],
  template: `
    <div class="prism-date-picker" [class.prism-date-picker--disabled]="disabled">
      <!-- Custom Trigger UI -->
      <div class="prism-date-picker__trigger" (click)="openPicker()">
        <span class="prism-date-picker__icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </span>
        
        <input
          type="text"
          readonly
          [placeholder]="placeholder"
          [value]="displayValue"
          class="prism-date-picker__display"
          [disabled]="disabled"
        />
      </div>

      <!-- Hidden Native Input -->
      <!-- Positioned absolutely to cover trigger on mobile for native tap, 
           while being invisible/small on desktop where we trigger programmatically -->
      <input
        #nativeInput
        type="date"
        [value]="value"
        (input)="onDateChange($event)"
        class="prism-date-picker__native"
        [disabled]="disabled"
        tabindex="-1" 
      />
    </div>
  `,
  styles: [`
    .prism-date-picker {
      position: relative;
      width: 100%;
      max-width: 16rem;
    }

    .prism-date-picker__trigger {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 2.5rem; /* Matches standard input height */
      padding: 0 0.75rem;
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: var(--radius-md, 6px);
      background: var(--color-surface, white);
      cursor: pointer;
      transition: all 0.2s;
    }

    .prism-date-picker__trigger:hover {
      border-color: var(--color-text-secondary, #6b7280);
    }

    .prism-date-picker__trigger:focus-within {
      border-color: var(--color-primary, #3b82f6);
      box-shadow: 0 0 0 2px var(--color-primary-light, #bfdbfe);
    }

    .prism-date-picker__icon {
      color: var(--color-text-tertiary, #9ca3af);
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
    }

    .prism-date-picker__display {
      border: none;
      background: none;
      width: 100%;
      height: 100%;
      color: var(--color-text-primary, #111827);
      font-size: 0.875rem;
      cursor: pointer;
    }

    .prism-date-picker__display:focus {
      outline: none;
    }

    .prism-date-picker__display::placeholder {
      color: var(--color-text-tertiary, #9ca3af);
    }

    /* Native Input Handling */
    .prism-date-picker__native {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
      z-index: 10; /* Ensures it sits on top for mobile touch interaction */
    }

    /* On desktop where showPicker is supported, we might want to hide it completely 
       and rely on the trigger click, but keeping it overlayed is most robust for cross-device support */
    @media (pointer: fine) {
      .prism-date-picker__native {
        visibility: hidden; /* Hide on precision pointers, use showPicker logic */
        width: 1px;
        height: 1px;
        top: 50%;
        left: 50%;
      }
    }

    .prism-date-picker--disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismDatePickerComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Select date';
  @Input() disabled: boolean = false;

  @ViewChild('nativeInput') nativeInput!: ElementRef<HTMLInputElement>;

  value: string = '';
  displayValue: string = '';

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string): void {
    this.value = value;
    this.updateDisplayValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.updateDisplayValue(this.value);
    this.onChange(this.value);
    this.onTouched();
  }

  openPicker() {
    if (this.disabled) return;

    const native = this.nativeInput.nativeElement as any;

    if (native.showPicker) {
      try {
        native.showPicker();
      } catch (err) {
        native.click();
      }
    } else {
      native.click();
      native.focus();
    }
  }

  private updateDisplayValue(val: string) {
    // Format YYYY-MM-DD to readable (e.g., DD MMM YYYY) if needed, 
    // or keep it simpler. Let's start with raw value for consistency or simple format.
    // Ideally we use a date pipe or Intl.DateTimeFormat
    if (!val) {
      this.displayValue = '';
      return;
    }
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
      this.displayValue = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } else {
      this.displayValue = val;
    }
  }
}
