import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrismHighlightPipe } from '../highlight/highlight.pipe';
import { Command } from './command.service';

@Component({
  selector: 'prism-command-palette',
  standalone: true,
  imports: [CommonModule, FormsModule, PrismHighlightPipe],
  template: `
    <div class="prism-overlay" *ngIf="isOpen" (click)="close.emit()">
      <div class="prism-palette" (click)="$event.stopPropagation()">
        
        <!-- Search Input -->
        <div class="prism-palette__header">
          <svg class="prism-palette__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            #searchInput
            type="text"
            class="prism-palette__input"
            placeholder="Type a command or search..."
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearchChange()"
            (keydown)="onKeyDown($event)"
          />
        </div>

        <!-- Command List -->
        <div class="prism-palette__body">
          <div *ngIf="filteredCommands.length === 0" class="prism-palette__empty">
            No results found.
          </div>
          
          <div *ngFor="let group of groupedCommands | keyvalue" class="prism-palette__group">
            <div class="prism-palette__group-title" *ngIf="group.key !== 'undefined'">{{ group.key }}</div>
            
            <button
              *ngFor="let cmd of group.value"
              class="prism-palette__item"
              [class.prism-palette__item--active]="activeIndex === localIndices[cmd.id]"
              (click)="selectCommand(cmd)"
              (mouseenter)="activeIndex = localIndices[cmd.id]"
            >
              <span class="prism-palette__item-icon" *ngIf="cmd.icon">
                <!-- Simple icon rendering, ideally use an icon component or projected content -->
                <span [innerHTML]="cmd.icon"></span> 
              </span>
              <span class="prism-palette__item-text" [innerHTML]="cmd.title | highlight:searchTerm"></span>
              <span class="prism-palette__item-shortcut" *ngIf="cmd.shortcut">{{ cmd.shortcut }}</span>
            </button>
          </div>
        </div>

        <div class="prism-palette__footer">
          <div class="prism-palette__hint">
            <span class="prism-kbd">↵</span> to select
          </div>
          <div class="prism-palette__hint">
            <span class="prism-kbd">↑↓</span> to navigate
          </div>
          <div class="prism-palette__hint">
            <span class="prism-kbd">esc</span> to close
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .prism-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(2px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 20vh;
      animation: fadeIn 0.15s ease-out;
    }

    .prism-palette {
      width: 100%;
      max-width: 600px;
      background: var(--color-surface, #ffffff);
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      max-height: 60vh;
      animation: slideDown 0.2s ease-out;
      border: 1px solid var(--color-border, #e5e7eb);
    }

    .prism-palette__header {
      display: flex;
      align-items: center;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .prism-palette__icon {
      color: var(--color-text-tertiary, #9ca3af);
      margin-right: 1rem;
    }

    .prism-palette__input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1.125rem;
      color: var(--color-text-primary, #111827);
      background: transparent;
    }
    
    .prism-palette__input::placeholder {
      color: var(--color-text-tertiary, #9ca3af);
    }

    .prism-palette__body {
      overflow-y: auto;
      padding: 0.5rem;
    }

    .prism-palette__group {
      margin-bottom: 0.5rem;
    }

    .prism-palette__group-title {
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-tertiary, #9ca3af);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .prism-palette__item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 0.75rem;
      border: none;
      background: none;
      text-align: left;
      cursor: pointer;
      border-radius: 8px;
      color: var(--color-text-secondary, #4b5563);
      font-size: 0.9375rem;
      transition: all 0.1s;
    }

    .prism-palette__item--active {
      background: var(--color-primary-subtle, #f0f9ff); /* primary-subtle */
      color: var(--color-primary, #0284c7);
    }
    
    .prism-palette__item-icon {
      margin-right: 0.75rem;
      display: flex;
      align-items: center;
      opacity: 0.7;
    }
    
    .prism-palette__item-text {
      flex: 1;
    }

    /* Highlight style (global/encapsulated view) */
    :host ::ng-deep .highlight {
      color: var(--color-text-primary, #111827);
      font-weight: 700;
      background: transparent;
    }

    .prism-palette__item-shortcut {
      font-size: 0.75rem;
      color: var(--color-text-tertiary, #9ca3af);
      background: var(--color-surface-elevated, #f3f4f6);
      padding: 0.125rem 0.375rem;
      border-radius: 4px;
    }

    .prism-palette__empty {
      padding: 2rem;
      text-align: center;
      color: var(--color-text-tertiary, #9ca3af);
    }

    .prism-palette__footer {
      padding: 0.75rem 1.25rem;
      background: var(--color-surface-elevated, #f9fafb);
      border-top: 1px solid var(--color-border, #e5e7eb);
      display: flex;
      gap: 1.5rem;
      font-size: 0.75rem;
      color: var(--color-text-tertiary, #9ca3af);
    }

    .prism-palette__hint {
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }

    .prism-kbd {
      background: var(--color-surface, white);
      border: 1px solid var(--color-border, #d1d5db);
      border-radius: 4px;
      padding: 0 0.25rem;
      font-family: inherit;
      min-width: 1.25rem;
      text-align: center;
      box-shadow: 0 1px 0 rgba(0,0,0,0.05);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismCommandPaletteComponent implements AfterViewInit {
  @Input() isOpen = false;
  @Input() commands: Command[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() execute = new EventEmitter<Command>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchTerm = '';
  activeIndex = 0;

  // Computed values
  filteredCommands: Command[] = [];
  groupedCommands: { [key: string]: Command[] } = {};
  localIndices: { [id: string]: number } = {}; // Map command ID to index in flat filtered list

  ngOnChanges() {
    if (this.isOpen) {
      this.reset();
      // Focus input helper
      setTimeout(() => this.searchInput?.nativeElement?.focus(), 50);
    }
    this.filterCommands();
  }

  ngAfterViewInit() {
    if (this.isOpen) {
      this.searchInput?.nativeElement?.focus();
    }
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.close.emit();
    }
  }

  @HostListener('window:keydown.arrowdown', ['$event'])
  @HostListener('window:keydown.arrowup', ['$event'])
  onArrow(e: Event) {
    if (!this.isOpen) return;
    const event = e as KeyboardEvent;
    event.preventDefault();

    const direction = event.key === 'ArrowDown' ? 1 : -1;
    const max = this.filteredCommands.length;
    if (max === 0) return;

    this.activeIndex = (this.activeIndex + direction + max) % max;

    // Optional: Scroll to active item logic here
  }

  @HostListener('window:keydown.enter', ['$event'])
  onEnter(e: Event) {
    if (!this.isOpen) return;
    const event = e as KeyboardEvent;
    event.preventDefault();
    if (this.filteredCommands.length > 0) {
      this.selectCommand(this.filteredCommands[this.activeIndex]);
    }
  }

  onSearchChange() {
    this.activeIndex = 0;
    this.filterCommands();
  }

  onKeyDown(event: KeyboardEvent) {
    // Stop propagation to prevent global shortcuts triggering while typing
    event.stopPropagation();
  }

  selectCommand(cmd: Command) {
    this.execute.emit(cmd);
    this.close.emit();
  }

  private reset() {
    this.searchTerm = '';
    this.activeIndex = 0;
  }

  private filterCommands() {
    if (!this.searchTerm) {
      this.filteredCommands = this.commands;
    } else {
      const lowerTerm = this.searchTerm.toLowerCase();
      this.filteredCommands = this.commands.filter(cmd =>
        cmd.title.toLowerCase().includes(lowerTerm) ||
        (cmd.group && cmd.group.toLowerCase().includes(lowerTerm))
      );
    }

    // Grouping
    this.groupedCommands = {};
    this.localIndices = {};

    this.filteredCommands.forEach((cmd, index) => {
      const group = cmd.group || 'General';
      if (!this.groupedCommands[group]) {
        this.groupedCommands[group] = [];
      }
      this.groupedCommands[group].push(cmd);
      this.localIndices[cmd.id] = index;
    });
  }
}
