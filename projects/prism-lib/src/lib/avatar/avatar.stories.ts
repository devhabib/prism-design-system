import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismAvatarComponent } from './avatar.component';

// ============================================
// Storybook Meta
// ============================================
const meta: Meta<PrismAvatarComponent> = {
  title: 'Components/Avatar',
  component: PrismAvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismAvatarComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A circular avatar component that displays user images with automatic fallback to initials. Supports multiple sizes and gracefully handles image loading failures.

### Features
- **Image Display**: Shows user profile pictures in a circular frame
- **Automatic Fallback**: Falls back to displaying initials if image fails to load
- **Multiple Sizes**: sm (2rem), md (3rem), lg (5rem)
- **Accessible**: Includes proper alt text support
        `
      }
    }
  },
  argTypes: {
    imageSrc: {
      control: 'text',
      description: 'URL of the image to display'
    },
    initials: {
      control: 'text',
      description: 'Fallback initials to display if image fails or is not provided'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the avatar'
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image (accessibility)'
    }
  }
};

export default meta;

type Story = StoryObj<PrismAvatarComponent>;

// ============================================
// Stories
// ============================================

export const Default: Story = {
  args: {
    imageSrc: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    initials: 'JD',
    size: 'md',
    alt: 'John Doe'
  }
};

export const WithInitials: Story = {
  name: 'Initials Only',
  args: {
    initials: 'AB',
    size: 'md'
  }
};

export const BrokenImage: Story = {
  name: 'Image Fallback (Broken URL)',
  args: {
    imageSrc: 'https://invalid-url-that-will-fail.com/image.jpg',
    initials: 'ER',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the automatic fallback to initials when an image fails to load.'
      }
    }
  }
};

export const Sizes: Story = {
  name: 'Size Variants',
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 1.5rem;">
        <div style="text-align: center;">
          <prism-avatar size="sm" initials="SM" imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=Small"></prism-avatar>
          <p style="margin-top: 0.5rem; font-size: 0.75rem; color: #6b7280;">Small</p>
        </div>
        <div style="text-align: center;">
          <prism-avatar size="md" initials="MD" imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=Medium"></prism-avatar>
          <p style="margin-top: 0.5rem; font-size: 0.75rem; color: #6b7280;">Medium</p>
        </div>
        <div style="text-align: center;">
          <prism-avatar size="lg" initials="LG" imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=Large"></prism-avatar>
          <p style="margin-top: 0.5rem; font-size: 0.75rem; color: #6b7280;">Large</p>
        </div>
      </div>
    `
  })
};

export const Gallery: Story = {
  name: 'Avatar Gallery',
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
        <prism-avatar size="md" initials="AB" imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"></prism-avatar>
        <prism-avatar size="md" initials="BC" imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"></prism-avatar>
        <prism-avatar size="md" initials="CD" imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie"></prism-avatar>
        <prism-avatar size="md" initials="DE" imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=David"></prism-avatar>
        <prism-avatar size="md" initials="EF"></prism-avatar>
        <prism-avatar size="md" initials="FG"></prism-avatar>
        <prism-avatar size="md" initials="GH"></prism-avatar>
        <prism-avatar size="md" initials="HI"></prism-avatar>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'A collection of avatars showing both image and initials variants.'
      }
    }
  }
};

export const InContext: Story = {
  name: 'User Profile Example',
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; max-width: 400px;">
        <prism-avatar 
          size="lg" 
          initials="JD" 
          imageSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=Profile"
        ></prism-avatar>
        <div>
          <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600; color: var(--color-text-primary);">John Doe</h3>
          <p style="margin: 0.25rem 0 0; font-size: 0.875rem; color: var(--color-text-secondary);">john.doe@example.com</p>
          <p style="margin: 0.25rem 0 0; font-size: 0.75rem; color: var(--color-text-muted);">Premium Member</p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example of using the avatar in a user profile card layout.'
      }
    }
  }
};
