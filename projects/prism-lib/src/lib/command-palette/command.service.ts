import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Command {
  id: string;
  title: string;
  group?: string;
  icon?: string;
  action: () => void;
  shortcut?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommandService implements OnDestroy {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpenSubject.asObservable();

  private keySubscription: Subscription;

  constructor() {
    this.keySubscription = fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter(event => (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')
      )
      .subscribe(event => {
        event.preventDefault(); // Prevent browser default (e.g. search focus)
        this.toggle();
      });
  }

  open() {
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
  }

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  ngOnDestroy() {
    if (this.keySubscription) {
      this.keySubscription.unsubscribe();
    }
  }
}
