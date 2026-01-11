import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from './drawer.component';
import { ButtonComponent } from '../button/button.component';

/**
 * The Drawer component is a slide-in panel that appears from the right side of the screen.
 * It is used for secondary tasks, filters, or detail views that don't require a full page navigation.
 */
const meta: Meta<DrawerComponent> = {
  title: 'Overlays/Drawer',
  component: DrawerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the drawer is visible',
    },
    width: {
      control: 'text',
      description: 'Width of the drawer panel',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the drawer',
    },
  },
};

export default meta;
type Story = StoryObj<DrawerComponent>;

export const Default: Story = {
  args: {
    isOpen: false,
    width: '400px',
    closeOnBackdrop: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; border: 1px dashed #ccc; padding: 2rem; position: relative; overflow: hidden; background: #fff;">
        <prism-button (click)="isOpen = true">Open Drawer</prism-button>
        <p style="margin-top: 1rem; color: #666;">
          This container represents the Storybook canvas. The drawer will slide in from the right.
        </p>
        
        <prism-drawer 
          [isOpen]="isOpen" 
          [width]="width" 
          [closeOnBackdrop]="closeOnBackdrop"
          (closed)="isOpen = false"
        >
          <ng-container drawer-title>New User Profile</ng-container>
          
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <p>Enter the details for the new user below.</p>
            <div style="height: 100px; background: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
              Form content goes here...
            </div>
            <p>You can add any custom HTML or components into the body.</p>
          </div>

          <ng-container drawer-footer>
            <prism-button variant="ghost" (click)="isOpen = false">Cancel</prism-button>
            <prism-button variant="primary" (click)="isOpen = false">Save User</prism-button>
          </ng-container>
        </prism-drawer>
      </div>
    `,
  }),
};

export const WithDangerAction: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 400px; border: 1px dashed #ccc; padding: 2rem; position: relative; overflow: hidden; background: #fff;">
        <prism-button variant="danger" (click)="isOpen = true">Delete Account</prism-button>
        
        <prism-drawer 
          [isOpen]="isOpen" 
          [width]="width" 
          (closed)="isOpen = false"
        >
          <ng-container drawer-title>Confirm Deletion</ng-container>
          
          <p>Are you sure you want to delete this account? This action cannot be undone.</p>

          <ng-container drawer-footer>
            <prism-button variant="ghost" (click)="isOpen = false">Keep Account</prism-button>
            <prism-button variant="danger" (click)="isOpen = false">Delete Permanently</prism-button>
          </ng-container>
        </prism-drawer>
      </div>
    `,
  }),
};
