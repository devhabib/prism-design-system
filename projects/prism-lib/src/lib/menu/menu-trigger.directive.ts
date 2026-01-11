import { Directive, Input, HostListener, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { PrismMenuComponent } from './menu.component';

@Directive({
  selector: '[prismMenuTriggerFor]',
  standalone: true,
})
export class PrismMenuTriggerDirective implements OnDestroy {
  @Input() prismMenuTriggerFor!: PrismMenuComponent;

  private clickOutsideListener?: () => void;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
    this.prismMenuTriggerFor.toggle();

    if (this.prismMenuTriggerFor.isOpen) {
      this.setupClickOutsideListener();
    } else {
      this.removeClickOutsideListener();
    }
  }

  private setupClickOutsideListener() {
    this.clickOutsideListener = this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.el.nativeElement.contains(event.target);
      const menuElement = document.querySelector('prism-menu');
      const clickedInMenu = menuElement?.contains(event.target as Node);

      if (!clickedInside && !clickedInMenu) {
        this.prismMenuTriggerFor.close();
        this.removeClickOutsideListener();
      }
    });
  }

  private removeClickOutsideListener() {
    if (this.clickOutsideListener) {
      this.clickOutsideListener();
      this.clickOutsideListener = undefined;
    }
  }

  ngOnDestroy() {
    this.removeClickOutsideListener();
  }
}
