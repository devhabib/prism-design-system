import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismSkeletonComponent } from './skeleton.component';

const meta: Meta<PrismSkeletonComponent> = {
  title: 'Feedback/Skeleton',
  component: PrismSkeletonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismSkeletonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A loading placeholder component with shimmer animation. Used to indicate content is loading and improve perceived performance.

### Features
- **Shimmer Animation**: Smooth gradient animation indicates loading state
- **Flexible Sizing**: Configurable width and height
- **Shape Variants**: Text, Circle, Rectangle shapes
- **Dark Mode Support**: Automatically adapts colors for dark theme
        `
      }
    }
  },
  argTypes: {
    width: {
      control: 'text',
      description: 'Width of the skeleton (CSS value)'
    },
    height: {
      control: 'text',
      description: 'Height of the skeleton (CSS value)'
    },
    shape: {
      control: 'select',
      options: ['text', 'circle', 'rect'],
      description: 'Shape of the skeleton'
    }
  }
};

export default meta;

type Story = StoryObj<PrismSkeletonComponent>;

export const Text: Story = {
  args: {
    width: '200px',
    height: '1rem',
    shape: 'text'
  }
};

export const Circle: Story = {
  args: {
    width: '3rem',
    height: '3rem',
    shape: 'circle'
  }
};

export const Rectangle: Story = {
  args: {
    width: '100%',
    height: '200px',
    shape: 'rect'
  }
};

export const TableRowLoading: Story = {
  name: 'Table Row Loading Pattern',
  render: () => ({
    template: `
      <table style="width: 100%; border-collapse: collapse;">
        <thead style="background: #f3f4f6;">
          <tr>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e5e7eb;">Name</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e5e7eb;">Email</th>
            <th style="padding: 0.75rem; text-align: left; border: 1px solid #e5e7eb;">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let i of [1,2,3,4,5]">
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">
              <prism-skeleton width="120px" height="1rem"></prism-skeleton>
            </td>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">
              <prism-skeleton width="180px" height="1rem"></prism-skeleton>
            </td>
            <td style="padding: 0.75rem; border: 1px solid #e5e7eb;">
              <prism-skeleton width="80px" height="1rem"></prism-skeleton>
            </td>
          </tr>
        </tbody>
      </table>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Common pattern for loading table data with skeletons.'
      }
    }
  }
};

export const CardLoading: Story = {
  name: 'Card Loading Pattern',
  render: () => ({
    template: `
      <div style="padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; max-width: 400px;">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
          <prism-skeleton width="3rem" height="3rem" shape="circle"></prism-skeleton>
          <div style="flex: 1;">
            <prism-skeleton width="60%" height="1rem" style="margin-bottom: 0.5rem;"></prism-skeleton>
            <prism-skeleton width="40%" height="0.875rem"></prism-skeleton>
          </div>
        </div>
        <prism-skeleton width="100%" height="4rem" shape="rect"></prism-skeleton>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Loading state for a card with avatar and content.'
      }
    }
  }
};
