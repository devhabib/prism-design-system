import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSignal = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSignal.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('prism-theme');
      if (savedTheme === 'dark') {
        this.setDarkMode(true);
      } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.setDarkMode(true);
      }
    }
  }

  toggleDarkMode() {
    this.setDarkMode(!this.darkModeSignal.value);
  }

  setDarkMode(isDark: boolean) {
    this.darkModeSignal.next(isDark);

    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('prism-theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('prism-theme', 'light');
      }
    }
  }

  get isDarkMode(): boolean {
    return this.darkModeSignal.value;
  }
}
