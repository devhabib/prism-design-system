import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ContainerComponent,
  GridComponent,
  GridItemComponent,
  PrismAvatarComponent,
  PrismTabGroupComponent,
  PrismTabComponent,
  PrismToggleComponent,
  ButtonComponent,

  InputComponent
} from 'prism-lib';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ContainerComponent,
    GridComponent,
    GridItemComponent,
    PrismAvatarComponent,
    PrismTabGroupComponent,
    PrismTabComponent,
    PrismToggleComponent,
    ButtonComponent,
    InputComponent
  ],
  template: `
    <prism-container size="lg" style="padding-top: 2rem; padding-bottom: 4rem;">
      <prism-grid cols="12" gap="2rem">
        <!-- Profile Header -->
        <prism-grid-item span="12">
          <div class="profile-header">
            <prism-avatar 
              size="lg" 
              initials="JD" 
              imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
              class="profile-avatar"
            ></prism-avatar>
            <div class="profile-info">
              <h1 class="profile-name">John Doe</h1>
              <p class="profile-email">john.doe&#64;example.com</p>
            </div>
            <div class="theme-toggle-container">
              <span class="theme-label">{{ themeService.isDarkMode ? 'Dark' : 'Light' }} Mode</span>
              <prism-toggle 
                [checked]="themeService.isDarkMode" 
                (checkedChange)="themeService.toggleDarkMode()"
              ></prism-toggle>
            </div>
          </div>
        </prism-grid-item>

        <!-- Tabs Navigation -->
        <prism-grid-item span="12">
          <prism-tab-group (selectedIndexChange)="onTabChange($event)">
            <prism-tab label="General">
              <div class="settings-section">
                <h2 class="section-title">General Settings</h2>
                <prism-grid cols="2" gap="1.5rem">
                  <prism-grid-item span="1">
                    <prism-input label="First Name" [(ngModel)]="profile.firstName"></prism-input>
                  </prism-grid-item>
                  <prism-grid-item span="1">
                    <prism-input label="Last Name" [(ngModel)]="profile.lastName"></prism-input>
                  </prism-grid-item>
                  <prism-grid-item span="2">
                    <prism-input label="Email Address" [(ngModel)]="profile.email" type="email"></prism-input>
                  </prism-grid-item>
                </prism-grid>
                <div class="actions">
                  <prism-button variant="primary" (click)="saveGeneral()">Save Changes</prism-button>
                </div>
              </div>
            </prism-tab>
            
            <prism-tab label="Security">
              <div class="settings-section">
                <h2 class="section-title">Security Settings</h2>
                <div class="settings-list">
                  <div class="settings-item">
                    <div class="item-text">
                      <p class="item-title">Two-Factor Authentication</p>
                      <p class="item-desc">Secure your account with 2FA.</p>
                    </div>
                    <prism-toggle [(checked)]="security.twoFactor"></prism-toggle>
                  </div>
                  <div class="settings-item">
                    <prism-button variant="outline">Change Password</prism-button>
                  </div>
                </div>
              </div>
            </prism-tab>

            <prism-tab label="Notifications">
              <div class="settings-section">
                <h2 class="section-title">Notification Preferences</h2>
                <div class="settings-list">
                  <div class="settings-item">
                    <div class="item-text">
                      <p class="item-title">Email Notifications</p>
                      <p class="item-desc">Receive updates via email.</p>
                    </div>
                    <prism-toggle [(checked)]="notifications.email"></prism-toggle>
                  </div>
                  <div class="settings-item">
                    <div class="item-text">
                      <p class="item-title">Push Notifications</p>
                      <p class="item-desc">Receive real-time alerts.</p>
                    </div>
                    <prism-toggle [(checked)]="notifications.push"></prism-toggle>
                  </div>
                  <div class="settings-item">
                    <div class="item-text">
                      <p class="item-title">Marketing Emails</p>
                      <p class="item-desc">News and promotional content.</p>
                    </div>
                    <prism-toggle [(checked)]="notifications.marketing"></prism-toggle>
                  </div>
                </div>
              </div>
            </prism-tab>
          </prism-tab-group>
        </prism-grid-item>
      </prism-grid>
    </prism-container>
  `,
  styles: [`
    .profile-header {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
    }

    .profile-avatar {
      border: 4px solid var(--color-background);
      box-shadow: var(--shadow-md);
    }

    .profile-info {
      flex: 1;
    }

    .profile-name {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-primary);
    }

    .profile-email {
      margin: 0.25rem 0 0;
      color: var(--color-text-secondary);
    }

    .theme-toggle-container {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 1rem;
      background: var(--color-surface-elevated);
      border-radius: var(--radius-full);
    }

    .theme-label {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .settings-section {
      max-width: 800px;
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--color-text-primary);
    }

    .settings-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .settings-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }

    .item-text {
      flex: 1;
    }

    .item-title {
      margin: 0;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .item-desc {
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
      color: var(--color-text-secondary);
    }

    .actions {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class SettingsComponent {
  profile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  };

  security = {
    twoFactor: false
  };

  notifications = {
    email: true,
    push: false,
    marketing: true
  };

  constructor(public themeService: ThemeService) { }

  onTabChange(index: number) {
    console.log('Tab changed to:', index);
  }

  saveGeneral() {
    console.log('Saving general profile settings:', this.profile);
  }
}
