import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive, Router } from '@angular/router';
import {
  ButtonComponent,
  ToastService,
  PrismAvatarComponent,
  PrismTooltipDirective,
  PrismMenuComponent,
  PrismMenuItemComponent,
  PrismMenuTriggerDirective,
  PrismCommandPaletteComponent,
  CommandService,
  Command
} from 'prism-lib';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    ButtonComponent,
    PrismAvatarComponent,
    PrismTooltipDirective,
    PrismMenuComponent,
    PrismMenuItemComponent,
    PrismMenuItemComponent,
    PrismMenuTriggerDirective,
    PrismCommandPaletteComponent,
    AsyncPipe
  ],
  template: `
    <prism-command-palette 
      [isOpen]="(commandService.isOpen$ | async)!" 
      [commands]="commands" 
      (close)="commandService.close()"
      (execute)="handleCommand($event)">
    </prism-command-palette>
    <div class="app-layout">
      <!-- Sidebar -->
      <aside class="app-sidebar">
        <div class="app-sidebar__logo">
          <h1><span>Prism</span> Admin</h1>
        </div>
        <nav class="app-sidebar__nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="app-sidebar__nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </a>
          <a routerLink="/users" routerLinkActive="active" class="app-sidebar__nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Users
          </a>
          <a routerLink="/settings" routerLinkActive="active" class="app-sidebar__nav-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Settings
          </a>
        </nav>
      </aside>

      <!-- Header -->
      <header class="app-header">
        <h2 class="app-header__title">{{ pageTitle }}</h2>
        <div class="app-header__actions">
          <prism-button 
            variant="ghost" 
            size="sm" 
            (click)="showNotifications()"
            prismTooltip="Notifications"
            placement="bottom"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </prism-button>
          
          <div class="user-profile">
            <button class="user-trigger" [prismMenuTriggerFor]="userMenu">
              <prism-avatar size="sm" initials="JD" imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=John"></prism-avatar>
            </button>

            <prism-menu #userMenu>
              <prism-menu-item (click)="navigateTo('/settings')">
                <div class="menu-item-content">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6"/>
                  </svg>
                  <span>Settings</span>
                </div>
              </prism-menu-item>
              <div class="menu-divider"></div>
              <prism-menu-item (click)="logout()">
                <div class="menu-item-content danger">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  <span>Logout</span>
                </div>
              </prism-menu-item>
            </prism-menu>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .user-profile {
      position: relative;
      display: flex;
      align-items: center;
    }
    .user-trigger {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 50%;
      transition: ring 0.2s;
    }
    .user-trigger:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--color-primary-light, #bfdbfe);
    }
    .menu-item-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .menu-item-content.danger {
      color: var(--color-error, #ef4444);
    }
    .menu-divider {
      height: 1px;
      background-color: var(--color-border, #e5e7eb);
      margin: 0.25rem 0;
    }
  `],
})
export class App {
  pageTitle = 'Dashboard';

  commands: Command[] = [];

  constructor(
    private toast: ToastService,
    private router: Router,
    public commandService: CommandService
  ) {
    this.initializeCommands();
  }

  private initializeCommands() {
    this.commands = [
      {
        id: 'nav-dash',
        title: 'Go to Dashboard',
        group: 'Navigation',
        action: () => this.navigateTo('/dashboard'),
        shortcut: 'G D'
      },
      {
        id: 'nav-users',
        title: 'Go to Users',
        group: 'Navigation',
        action: () => this.navigateTo('/users'),
        shortcut: 'G U'
      },
      {
        id: 'nav-settings',
        title: 'Go to Settings',
        group: 'Navigation',
        action: () => this.navigateTo('/settings'),
        shortcut: 'G S'
      },
      {
        id: 'theme-toggle',
        title: 'Toggle Dark Mode',
        group: 'Theme',
        action: () => this.toast.info('Dark mode toggled (mock)'),
        icon: '🌙'
      },
      {
        id: 'account-logout',
        title: 'Logout',
        group: 'Account',
        action: () => this.logout()
      }
    ];
  }

  handleCommand(command: Command) {
    command.action();
  }

  showNotifications(): void {
    this.toast.info('No new notifications');
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    this.toast.success('Logged out successfully');
    this.router.navigate(['/login']);
  }
}
