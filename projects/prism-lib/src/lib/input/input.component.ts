import {
  Component,
  Input,
  HostBinding,
  Optional,
  Self,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NgControl,
  FormsModule,
} from '@angular/forms';

/**
 * Input types supported by the component
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

/**
 * Input Component - Form field with floating label and validation
 * 
 * Implements ControlValueAccessor for Angular Forms integration.
 * Uses @Self() @Optional() NgControl injection to avoid circular dependencies.
 * The valueAccessor is set manually in the constructor instead of via providers
 * to prevent NG0200 circular dependency errors.
 * 
 * @example
 * <!-- Template-driven -->
 * <prism-input label="Email" [(ngModel)]="email" type="email"></prism-input>
 * 
 * <!-- Reactive Forms -->
 * <prism-input label="Email" [formControl]="emailControl"></prism-input>
 * 
 * <!-- With icons -->
 * <prism-input label="Search">
 *   <span prismPrefix>🔍</span>
 * </prism-input>
 */
@Component({
  selector: 'prism-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  /** Label text for the floating label */
  @Input() label: string = '';

  /** Placeholder text (also used for floating label detection) */
  @Input() placeholder: string = ' '; // Space for :placeholder-shown to work

  /** Input type */
  @Input() type: InputType = 'text';

  /** Input ID (auto-generated if not provided) */
  @Input() inputId: string = `prism-input-${Math.random().toString(36).substr(2, 9)}`;

  /** Input name attribute */
  @Input() name: string = '';

  /** Autocomplete attribute */
  @Input() autocomplete: string = 'off';

  /** Manual error text (overrides validation errors) */
  @Input() errorText: string = '';

  /** Hint text shown below input */
  @Input() hintText: string = '';

  /** Required indicator */
  @Input() required: boolean = false;

  /** Size variant (sm = compact, md = default) */
  @Input() size: 'sm' | 'md' = 'md';

  /** Readonly state */
  @Input() readonly: boolean = false;

  /** Internal value */
  private _value: string = '';

  /** Disabled state */
  private _disabled: boolean = false;

  /** Focus state for JS fallback */
  isFocused: boolean = false;

  /** Has value state for JS fallback */
  hasValue: boolean = false;

  // ControlValueAccessor callbacks
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(
    @Optional() @Self() public ngControl: NgControl
  ) {
    // Avoid circular dependency by setting valueAccessor here
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {
    // Initialize hasValue state
    this.hasValue = !!this._value;
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /** Get current value */
  get value(): string {
    return this._value;
  }

  /** Set value and trigger change */
  set value(val: string) {
    this._value = val ?? '';
    this.hasValue = !!this._value;
    this.onChange(this._value);
  }

  /** Check if disabled */
  get disabled(): boolean {
    return this._disabled;
  }

  /** Check if input has validation error */
  get hasError(): boolean {
    if (this.errorText) return true;
    return !!(this.ngControl?.invalid && this.ngControl?.touched);
  }

  /** Get error message to display */
  get displayError(): string {
    if (this.errorText) return this.errorText;

    if (this.ngControl?.errors) {
      const errors = this.ngControl.errors;
      if (errors['required']) return 'This field is required';
      if (errors['email']) return 'Please enter a valid email';
      if (errors['minlength']) {
        return `Minimum ${errors['minlength'].requiredLength} characters required`;
      }
      if (errors['maxlength']) {
        return `Maximum ${errors['maxlength'].requiredLength} characters allowed`;
      }
      if (errors['pattern']) return 'Invalid format';
    }
    return '';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'prism-input',
      `prism-input--${this.size}`,
      this.isFocused ? 'prism-input--focused' : '',
      this.hasValue ? 'prism-input--has-value' : '',
      this.hasError ? 'prism-input--error' : '',
      this._disabled ? 'prism-input--disabled' : '',
    ].filter(Boolean).join(' ');
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this._value = value ?? '';
    this.hasValue = !!this._value;
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

  // Event handlers
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
  }

  onFocus(): void {
    this.isFocused = true;
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
  }
}
