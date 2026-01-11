import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { PrismMenuComponent } from './menu.component';
import { PrismMenuItemComponent } from './menu-item.component';
import { PrismMenuTriggerDirective } from './menu-trigger.directive';
import { ButtonComponent } from '../button/button.component';
import { PrismAvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'menu-demo',
  standalone: true,
  imports: [
    CommonModule,
    PrismMenuComponent,
    PrismMenuItemComponent,
    PrismMenuTriggerDirective,
    ButtonComponent,
    PrismAvatarComponent
  ],
  template: `
    <div style="padding: 4rem; display: flex; justify-content: center;">
      <div>
        <button
          [prismMenuTriggerFor]="userMenu"
          style="display: flex; align-items: center; gap: 0.5rem; background: none; border: none; cursor: pointer; padding: 0.5rem; border-radius: 8px;"
        >
          <prism-avatar size="sm" initials="JD"></prism-avatar>
          <span style="font-size: 0.875rem; font-weight: 500;">John Doe</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        <prism-menu #userMenu>
          <prism-menu-item (click)="onProfileClick()">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Profile</span>
            </div>
          </prism-menu-item>
          
          <prism-menu-item (click)="onSettingsClick()">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6"/>
              </svg>
              <span>Settings</span>
            </div>
          </prism-menu-item>

          <div style="height: 1px; background: #e5e7eb; margin: 0.5rem 0;"></div>

          <prism-menu-item (click)="onLogoutClick()">
            <div style="display: flex; align-items: center; gap: 0.75rem; color: #ef4444;">
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
  `
})
class MenuDemoComponent {
  onProfileClick() {
    console.log('Profile clicked');
  }

  onSettingsClick() {
    console.log('Settings clicked');
  }

  onLogoutClick() {
    console.log('Logout clicked');
  }
}

const meta: Meta<PrismMenuComponent> = {
  title: 'Overlay/Menu',
  component: PrismMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        PrismMenuComponent,
        PrismMenuItemComponent,
        PrismMenuTriggerDirective,
        ButtonComponent,
        PrismAvatarComponent,
        MenuDemoComponent
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A dropdown menu component for contextual actions. Includes trigger directive, menu container, and menu items with click-outside detection.

### Features
- **Click-Outside Detection**: Automatically closes when clicking elsewhere
- **Smooth Animation**: Fade-in effect on open
- **Flexible Items**: Support for icons, text, and custom content
- **Positioned**: Appears below trigger, aligned to right

### Usage
\`\`\`html
<button [prismMenuTriggerFor]="menu">
  Open Menu
</button>

<prism-menu #menu>
  <prism-menu-item (click)="action1()">Action 1</prism-menu-item>
  <prism-menu-item (click)="action2()">Action 2</prism-menu-item>
</prism-menu>
\`\`\`
        `
      }
    }
  }
};

export default meta;

type Story = StoryObj<PrismMenuComponent>;

export const UserProfile: Story = {
  name: 'User Profile Dropdown',
  render: () => ({
    template: `<menu-demo></menu-demo>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Click the avatar to open a profile menu with various actions.'
      }
    }
  }
};

export const SimpleMenu: Story = {
  name: 'Simple Action Menu',
  render: () => ({
    template: `
      <div style="padding: 4rem; display: flex; justify-content: center;">
        <div>
          <prism-button [prismMenuTriggerFor]="actionMenu">
            Actions
          </prism-button>

          <prism-menu #actionMenu>
            <prism-menu-item>Edit</prism-menu-item>
            <prism-menu-item>Duplicate</prism-menu-item>
            <prism-menu-item>Archive</prism-menu-item>
            <div style="height: 1px; background: #e5e7eb; margin: 0.5rem 0;"></div>
            <prism-menu-item style="color: #ef4444;">Delete</prism-menu-item>
          </prism-menu>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'A simple menu with basic actions and a divider.'
      }
    }
  }
};
