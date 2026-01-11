import { Component, Input, forwardRef, ChangeDetectionStrategy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'prism-tags-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrismTagsInputComponent),
      multi: true
    }
  ],
  template: `
    <div 
      class="prism-tags-input" 
      [class.prism-tags-input--disabled]="disabled"
      [class.prism-tags-input--focused]="focused"
      (click)="focusInput()"
    >
      <!-- Render Tags -->
      <div *ngFor="let tag of tags; let i = index" class="prism-tag">
        <span class="prism-tag__label">{{ tag }}</span>
        <span class="prism-tag__remove" (click)="removeTag(i, $event)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </span>
      </div>

      <!-- Input Field -->
      <input
        #inputElement
        type="text"
        [placeholder]="tags.length === 0 ? placeholder : ''"
        [disabled]="disabled"
        [(ngModel)]="inputValue"
        (keydown)="onKeyDown($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        class="prism-tags-input__field"
      />
    </div>
  `,
  styles: [`
    .prism-tags-input {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      min-height: 2.5rem;
      padding: 0.25rem 0.5rem;
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: var(--radius-md, 6px);
      background: var(--color-surface, white);
      transition: all 0.2s;
      cursor: text;
    }

    .prism-tags-input:hover {
      border-color: var(--color-text-secondary, #6b7280);
    }

    .prism-tags-input--focused {
      border-color: var(--color-primary, #3b82f6);
      box-shadow: 0 0 0 2px var(--color-primary-light, #bfdbfe);
    }

    .prism-tags-input--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: var(--color-surface-disabled, #f3f4f6);
    }

    /* Tag/Badge Styling */
    .prism-tag {
      display: inline-flex;
      align-items: center;
      background: var(--color-primary-light, #eff6ff);
      color: var(--color-primary, #3b82f6);
      border-radius: 9999px;
      padding: 0.125rem 0.625rem;
      font-size: 0.8125rem;
      font-weight: 500;
      user-select: none;
    }

    .prism-tag__remove {
      display: flex;
      align-items: center;
      margin-left: 0.25rem;
      cursor: pointer;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .prism-tag__remove:hover {
      opacity: 1;
    }

    /* Input Styling */
    .prism-tags-input__field {
      flex: 1;
      min-width: 60px;
      border: none;
      outline: none;
      background: transparent;
      font-size: 0.875rem;
      color: var(--color-text-primary, #111827);
      padding: 0.125rem 0;
    }

    .prism-tags-input__field:disabled {
      cursor: not-allowed;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTagsInputComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Add tags...';
  @Input() disabled: boolean = false;

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  tags: string[] = [];
  inputValue: string = '';
  focused = false;

  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value: string[]): void {
    if (value) {
      this.tags = [...value];
    } else {
      this.tags = [];
    }
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

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    this.onTouched();
    // Optional: Add current text as tag on blur? 
    // Usually safer to only add on Enter to prevent accidental adds.
  }

  focusInput() {
    if (!this.disabled) {
      this.inputElement.nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.disabled) return;

    const value = this.inputValue.trim();

    // Add Tag: Enter or Comma
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      if (value) {
        this.addTag(value);
      }
    }
    // Remove Tag: Backspace (only if input is empty)
    else if (event.key === 'Backspace' && !this.inputValue && this.tags.length > 0) {
      this.removeTag(this.tags.length - 1, new Event('click')); // Pass fake event just for sig
    }
  }

  addTag(tag: string) {
    // Prevent duplicates
    if (!this.tags.includes(tag)) {
      this.tags = [...this.tags, tag];
      this.onChange(this.tags);
    }
    this.inputValue = '';
  }

  removeTag(index: number, event: Event) {
    event.stopPropagation(); // Prevent focusing input again if clicking X
    if (this.disabled) return;

    this.tags = this.tags.filter((_, i) => i !== index);
    this.onChange(this.tags);
  }
}
