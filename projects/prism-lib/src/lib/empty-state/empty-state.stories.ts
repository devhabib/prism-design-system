import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismEmptyStateComponent } from './empty-state.component';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<PrismEmptyStateComponent> = {
  title: 'Data Display/EmptyState',
  component: PrismEmptyStateComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismEmptyStateComponent, ButtonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A component for displaying placeholder content when data is empty or missing.

### Features
- **Configurable Content**: Custom title, description, and icon
- **Action Slots**: Supports projecting buttons or links
- **Centered Layout**: Ideal for tables, lists, or card grids
        `
      }
    }
  },
  argTypes: {
    icon: {
      control: 'select',
      options: ['search', 'folder-open', 'users'],
      description: 'Icon to display'
    },
    title: {
      control: 'text',
      description: 'Main heading text'
    },
    description: {
      control: 'text',
      description: 'Subtext explanation'
    }
  }
};

export default meta;

type Story = StoryObj<PrismEmptyStateComponent>;

export const NoResults: Story = {
  args: {
    icon: 'search',
    title: 'No results found',
    description: 'Try adjusting your search filters to find what you are looking for.'
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-empty-state [icon]="icon" [title]="title" [description]="description">
        <prism-button variant="secondary" size="sm">Clear Filters</prism-button>
      </prism-empty-state>
    `
  })
};

export const Starter: Story = {
  args: {
    icon: 'users',
    title: 'No users yet',
    description: 'Get started by creating your first user account.'
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-empty-state [icon]="icon" [title]="title" [description]="description">
        <prism-button variant="primary" size="sm">Add User</prism-button>
      </prism-empty-state>
    `
  })
};

export const Basic: Story = {
  args: {
    icon: 'folder-open',
    title: 'Folder is empty',
    description: 'There are no files in this directory.'
  }
};
