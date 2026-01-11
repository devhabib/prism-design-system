import { Component, Output, EventEmitter, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'prism-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="prism-search">
      <!-- Search Icon -->
      <div class="prism-search__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <input
        [formControl]="searchControl"
        type="text"
        [placeholder]="placeholder"
        class="prism-search__input"
        [class.prism-search__input--has-value]="searchControl.value"
      />

      <!-- Clear Button (Only visible when has value) -->
      <button 
        *ngIf="searchControl.value"
        type="button" 
        class="prism-search__clear"
        (click)="clear()"
        aria-label="Clear search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .prism-search {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 24rem;
    }

    .prism-search__icon {
      position: absolute;
      left: 0.75rem;
      pointer-events: none;
      color: var(--color-text-tertiary, #9ca3af);
      display: flex;
      align-items: center;
    }

    .prism-search__input {
      width: 100%;
      height: 2.5rem;
      padding-left: 2.5rem;
      padding-right: 2.5rem;
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: var(--radius-md, 6px);
      background: var(--color-surface, white);
      color: var(--color-text-primary, #111827);
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .prism-search__input:focus {
      outline: none;
      border-color: var(--color-primary, #3b82f6);
      box-shadow: 0 0 0 2px var(--color-primary-light, #bfdbfe);
    }

    .prism-search__clear {
      position: absolute;
      right: 0.5rem;
      background: none;
      border: none;
      padding: 0.25rem;
      color: var(--color-text-tertiary, #9ca3af);
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 50%;
      transition: color 0.15s;
    }

    .prism-search__clear:hover {
      color: var(--color-text-secondary, #6b7280);
      background: var(--color-surface-elevated, #f3f4f6);
    }
  `]
})
export class PrismSearchInputComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = 'Search...';
  @Output() searchChange = new EventEmitter<string>();

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.searchChange.emit(value || '');
    });
  }

  clear() {
    this.searchControl.setValue('');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
