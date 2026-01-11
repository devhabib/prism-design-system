import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PrismSearchInputComponent } from './search-input.component';
import { action } from '@storybook/addon-actions';

const meta: Meta<PrismSearchInputComponent> = {
  title: 'Forms/SearchInput',
  component: PrismSearchInputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, PrismSearchInputComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A standardized search input component with built-in debouncing (300ms) and clear functionality.

### Features
- **Debounced Output**: Emits events only after typing stops
- **Clear Button**: Appears when text is present
- **Iconized**: Includes search icon
- **Accessible**: Keyboard navigable
        `
      }
    }
  },
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    }
  }
};

export default meta;

type Story = StoryObj<PrismSearchInputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Search users...'
  },
  render: (args) => ({
    props: {
      ...args,
      onSearchChange: action('searchChange')
    },
    template: `
      <div style="padding: 2rem; background: #f9fafb;">
        <prism-search [placeholder]="placeholder" (searchChange)="onSearchChange($event)"></prism-search>
      </div>
    `
  })
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Filter by email...'
  },
  render: (args) => ({
    props: {
      ...args,
      onSearchChange: action('searchChange')
    },
    template: `
      <div style="padding: 2rem; background: #f9fafb;">
        <prism-search [placeholder]="placeholder" (searchChange)="onSearchChange($event)"></prism-search>
      </div>
    `
  })
};
