import {
  Component,
  Input,
  HostBinding,
  Optional,
  Self,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NgControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Select Component - Dropdown form field matching Input styling
 * 
 * @example
 * <prism-select 
 *   label="Role" 
 *   [options]="roles"
 *   [(ngModel)]="selectedRole"
 * ></prism-select>
 */
@Component({
  selector: 'prism-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="select-wrapper" [class.select-wrapper--focused]="isFocused">
      <div class="select__field">
        <select
          #selectElement
          class="select__native"
          [id]="inputId"
          [name]="name"
          [disabled]="disabled"
          [value]="value"
          (change)="onSelectChange($event)"
          (focus)="onFocus()"
          (blur)="onBlur()"
        >
          <option value="" disabled [selected]="!value">{{ placeholder }}</option>
          <option 
            *ngFor="let option of options" 
            [value]="option.value"
            [disabled]="option.disabled"
          >
            {{ option.label }}
          </option>
        </select>
        <label 
          class="select__label"
          [class.select__label--required]="required"
          [class.select__label--floated]="isFocused || hasValue"
          [for]="inputId"
        >
          {{ label }}
        </label>
        <div class="select__arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
    <div *ngIf="hasError" class="select__error">{{ displayError }}</div>
    <div *ngIf="hintText && !hasError" class="select__hint">{{ hintText }}</div>
  `,
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements ControlValueAccessor, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() options: SelectOption[] = [];
  @Input() inputId: string = `prism-select-${Math.random().toString(36).substr(2, 9)}`;
  @Input() name: string = '';
  @Input() errorText: string = '';
  @Input() hintText: string = '';
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' = 'md';

  private _value: string = '';
  private _disabled: boolean = false;
  isFocused: boolean = false;

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy(): void { }

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val ?? '';
    this.onChange(this._value);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  get hasValue(): boolean {
    return !!this._value;
  }

  get hasError(): boolean {
    if (this.errorText) return true;
    return !!(this.ngControl?.invalid && this.ngControl?.touched);
  }

  get displayError(): string {
    if (this.errorText) return this.errorText;
    if (this.ngControl?.errors?.['required']) return 'This field is required';
    return '';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'prism-select',
      `prism-select--${this.size}`,
      this.isFocused ? 'prism-select--focused' : '',
      this.hasValue ? 'prism-select--has-value' : '',
      this.hasError ? 'prism-select--error' : '',
      this._disabled ? 'prism-select--disabled' : '',
    ].filter(Boolean).join(' ');
  }

  writeValue(value: string): void {
    this._value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }
}
