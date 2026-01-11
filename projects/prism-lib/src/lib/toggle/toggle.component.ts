import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      type="button" 
      class="prism-toggle" 
      [class.prism-toggle--checked]="checked"
      [class.prism-toggle--disabled]="disabled"
      (click)="toggle()"
      role="switch"
      [attr.aria-checked]="checked"
      [attr.aria-disabled]="disabled"
    >
      <span class="prism-toggle__thumb"></span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .prism-toggle {
      position: relative;
      width: 2.75rem;
      height: 1.5rem;
      padding: 0;
      border: none;
      border-radius: 9999px;
      background-color: var(--prism-toggle-bg, #d1d5db);
      cursor: pointer;
      transition: background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      outline: none;
    }

    .prism-toggle:focus-visible {
      box-shadow: 0 0 0 2px white, 0 0 0 4px var(--prism-color-primary, #3b82f6);
    }

    .prism-toggle--checked {
      background-color: var(--prism-color-primary, #3b82f6);
    }

    .prism-toggle--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .prism-toggle__thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 1.25rem;
      height: 1.25rem;
      background-color: white;
      border-radius: 50%;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .prism-toggle--checked .prism-toggle__thumb {
      transform: translateX(1.25rem);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismToggleComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
