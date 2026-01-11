import { Component, Input, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-tab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="active" class="prism-tab-content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .prism-tab-content {
      padding: 1.5rem 0;
      animation: fadeIn 0.3s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTabComponent {
  @Input() label: string = '';
  @Input() active = false;
}

@Component({
  selector: 'prism-tab-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-tab-group">
      <div class="prism-tab-list" role="tablist">
        <div 
          *ngFor="let tab of tabs; let i = index"
          #tabEl
          class="prism-tab-header"
          [class.prism-tab-header--active]="tab.active"
          (click)="selectTab(tab)"
          role="tab"
          [attr.aria-selected]="tab.active"
        >
          {{ tab.label }}
        </div>
        
        <!-- Ink Bar -->
        <div class="prism-tab-ink-bar" [style.left.px]="inkBarLeft" [style.width.px]="inkBarWidth"></div>
      </div>
      
      <div class="prism-tab-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .prism-tab-group {
      width: 100%;
    }

    .prism-tab-list {
      position: relative;
      display: flex;
      border-bottom: 2px solid var(--prism-border-color, #e5e7eb);
    }

    .prism-tab-header {
      padding: 0.75rem 1.5rem;
      cursor: pointer;
      font-weight: 500;
      color: var(--prism-text-muted, #6b7280);
      transition: color 0.2s ease;
      user-select: none;
    }

    .prism-tab-header--active {
      color: var(--prism-color-primary, #3b82f6);
    }

    .prism-tab-header:hover:not(.prism-tab-header--active) {
      color: var(--prism-text-color, #1f2937);
    }

    .prism-tab-ink-bar {
      position: absolute;
      bottom: -2px;
      height: 2px;
      background-color: var(--prism-color-primary, #3b82f6);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .prism-tab-body {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismTabGroupComponent implements AfterContentInit, AfterViewInit {
  @ContentChildren(PrismTabComponent) tabs!: QueryList<PrismTabComponent>;
  @ViewChild('tabEl') tabElements!: QueryList<ElementRef>;

  @Output() selectedIndexChange = new EventEmitter<number>();

  inkBarLeft = 0;
  inkBarWidth = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0 && this.tabs.first) {
      this.selectTab(this.tabs.first);
    }
  }

  ngAfterViewInit() {
    // Need to defer to next tick to get element dimensions
    setTimeout(() => this.updateInkBar(), 0);
  }

  selectTab(tab: PrismTabComponent) {
    this.tabs.forEach(t => (t.active = false));
    tab.active = true;

    const index = this.tabs.toArray().indexOf(tab);
    this.selectedIndexChange.emit(index);
    this.updateInkBar();
    this.cdr.markForCheck();
  }

  private updateInkBar() {
    if (!this.tabs) return;

    const tabsArray = this.tabs.toArray();
    const activeIndex = tabsArray.findIndex(t => t.active);

    // We need to wait for the view to render headers to get their positions
    // In a real lib we might use a ViewChildren for headers
    const headers = document.querySelectorAll('.prism-tab-header');
    const activeHeader = headers[activeIndex] as HTMLElement;

    if (activeHeader) {
      this.inkBarLeft = activeHeader.offsetLeft;
      this.inkBarWidth = activeHeader.offsetWidth;
      this.cdr.markForCheck();
    }
  }
}
