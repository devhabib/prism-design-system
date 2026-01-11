import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { PrismBreadcrumbsComponent } from './breadcrumbs.component';

const meta: Meta<PrismBreadcrumbsComponent> = {
  title: 'Navigation/Breadcrumbs',
  component: PrismBreadcrumbsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule, PrismBreadcrumbsComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A breadcrumb navigation component to visualize page hierarchy.

### Features
- **Flexible Items**: Supports array of labeled items with optional URLs
- **Router Integration**: Uses \`routerLink\` for navigation
- **Visual Separation**: Chevron icons separate items
- **Accessoblity**: ARIA support for current page
        `
      }
    }
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items'
    }
  }
};

export default meta;

type Story = StoryObj<PrismBreadcrumbsComponent>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', url: '/' },
      { label: 'Users', url: '/users' },
      { label: 'John Doe' }
    ]
  }
};

export const DeepPath: Story = {
  args: {
    items: [
      { label: 'Dashboard', url: '/dashboard' },
      { label: 'Settings', url: '/settings' },
      { label: 'Profile', url: '/settings/profile' },
      { label: 'Security' }
    ]
  }
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', url: '/' },
      { label: 'Users' }
    ]
  }
};
