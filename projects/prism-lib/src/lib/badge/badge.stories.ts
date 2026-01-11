import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismBadgeComponent } from './badge.component';

const meta: Meta<PrismBadgeComponent> = {
  title: 'Components/Badge',
  component: PrismBadgeComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismBadgeComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A status indicator component for displaying labels and tags. Supports 5 semantic color variants and 2 shape styles.

### Features
- **5 Variants**: Success, Warning, Error, Neutral, Primary
- **2 Shapes**: Pill (fully rounded) and Rectangle (slightly rounded)
- **Token-based Colors**: Light background with dark text for readability
- **Compact Design**: Minimal padding for inline use
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'neutral', 'primary'],
      description: 'Semantic color variant'
    },
    shape: {
      control: 'select',
      options: ['pill', 'rectangle'],
      description: 'Shape style of the badge'
    }
  }
};

export default meta;

type Story = StoryObj<PrismBadgeComponent>;

export const Success: Story = {
  args: {
    variant: 'success',
    shape: 'pill'
  },
  render: (args) => ({
    props: args,
    template: `<prism-badge [variant]="variant" [shape]="shape">Completed</prism-badge>`
  })
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    shape: 'pill'
  },
  render: (args) => ({
    props: args,
    template: `<prism-badge [variant]="variant" [shape]="shape">Pending</prism-badge>`
  })
};

export const Error: Story = {
  args: {
    variant: 'error',
    shape: 'pill'
  },
  render: (args) => ({
    props: args,
    template: `<prism-badge [variant]="variant" [shape]="shape">Failed</prism-badge>`
  })
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    shape: 'pill'
  },
  render: (args) => ({
    props: args,
    template: `<prism-badge [variant]="variant" [shape]="shape">Draft</prism-badge>`
  })
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    shape: 'pill'
  },
  render: (args) => ({
    props: args,
    template: `<prism-badge [variant]="variant" [shape]="shape">Active</prism-badge>`
  })
};

export const AllVariants: Story = {
  name: 'All Variants (Pill)',
  render: () => ({
    template: `
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <prism-badge variant="success">Success</prism-badge>
        <prism-badge variant="warning">Warning</prism-badge>
        <prism-badge variant="error">Error</prism-badge>
        <prism-badge variant="neutral">Neutral</prism-badge>
        <prism-badge variant="primary">Primary</prism-badge>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'All color variants with pill shape.'
      }
    }
  }
};

export const AllShapes: Story = {
  name: 'Shape Comparison',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 600;">Pill Shape</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <prism-badge variant="success" shape="pill">Completed</prism-badge>
            <prism-badge variant="warning" shape="pill">Pending</prism-badge>
            <prism-badge variant="error" shape="pill">Failed</prism-badge>
          </div>
        </div>
        <div>
          <h4 style="margin: 0 0 0.5rem; font-size: 0.875rem; font-weight: 600;">Rectangle Shape</h4>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <prism-badge variant="success" shape="rectangle">Completed</prism-badge>
            <prism-badge variant="warning" shape="rectangle">Pending</prism-badge>
            <prism-badge variant="error" shape="rectangle">Failed</prism-badge>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of pill and rectangle shapes.'
      }
    }
  }
};

export const InTable: Story = {
  name: 'In Table Context',
  render: () => ({
    template: `
      <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
        <thead style="background: #f3f4f6;">
          <tr>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e5e7eb;">Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e5e7eb;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Order #1234</td>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">
              <prism-badge variant="success">Completed</prism-badge>
            </td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Order #1235</td>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">
              <prism-badge variant="warning">Pending</prism-badge>
            </td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Order #1236</td>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">
              <prism-badge variant="error">Failed</prism-badge>
            </td>
          </tr>
          <tr>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">Order #1237</td>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">
              <prism-badge variant="neutral">Draft</prism-badge>
            </td>
          </tr>
        </tbody>
      </table>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example of badges used in a table to show status.'
      }
    }
  }
};
