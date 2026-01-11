import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismAlertComponent } from './alert.component';

const meta: Meta<PrismAlertComponent> = {
  title: 'Feedback/Alert',
  component: PrismAlertComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismAlertComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A contextual feedback component for displaying important messages. Supports 4 visual variants (success, error, warning, info) with appropriate color coding and icons.

### Features
- **Visual Variants**: Success (green), Error (red), Warning (amber), Info (blue)
- **Left Border Accent**: High-contrast 4px border for quick identification
- **Icon Support**: Contextual icons for each variant
- **Optional Title**: Bold heading for emphasis
- **Content Projection**: Flexible message content via ng-content
        `
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Visual variant of the alert'
    },
    title: {
      control: 'text',
      description: 'Optional bold title for the alert'
    }
  }
};

export default meta;

type Story = StoryObj<PrismAlertComponent>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!'
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-alert [type]="type" [title]="title">
        Your changes have been saved successfully.
      </prism-alert>
    `
  })
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error'
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-alert [type]="type" [title]="title">
        There was a problem processing your request. Please try again.
      </prism-alert>
    `
  })
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Warning'
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-alert [type]="type" [title]="title">
        This action cannot be undone. Please review before proceeding.
      </prism-alert>
    `
  })
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Information'
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-alert [type]="type" [title]="title">
        You can now customize your profile settings from the user menu.
      </prism-alert>
    `
  })
};

export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    type: 'info'
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-alert [type]="type">
        This is an alert without a title. The message stands alone for simpler notifications.
      </prism-alert>
    `
  })
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <prism-alert type="success" title="Success">
          Your payment has been processed successfully.
        </prism-alert>
        
        <prism-alert type="error" title="Error">
          Failed to connect to server. Please check your internet connection.
        </prism-alert>
        
        <prism-alert type="warning" title="Warning">
          Your session will expire in 5 minutes. Please save your work.
        </prism-alert>
        
        <prism-alert type="info" title="Info">
          We've updated our privacy policy. Please review the changes.
        </prism-alert>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all alert variants side by side.'
      }
    }
  }
};
