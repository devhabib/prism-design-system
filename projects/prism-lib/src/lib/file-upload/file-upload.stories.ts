import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismFileUploadComponent } from './file-upload.component';

const meta: Meta<PrismFileUploadComponent> = {
  title: 'Forms/FileUpload',
  component: PrismFileUploadComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismFileUploadComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A robust file upload component with drag & drop, file preview, and state management.

### Features
- **Drag & Drop**: Intuitive visual feedback
- **Image Preview**: Automatically displays selected images
- **Native Implementation**: Uses standard file APIs
- **Accessible**: Keyboard support via hidden input
        `
      }
    }
  },
  args: {
    accept: 'image/*',
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)'
  }
};

export default meta;

type Story = StoryObj<PrismFileUploadComponent>;

export const Default: Story = {
  args: {}
};

export const WithPreview: Story = {
  args: {
    initialPreview: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    hint: 'Uploads are currently disabled'
  }
};

export const DocumentUpload: Story = {
  args: {
    accept: '.pdf,.doc,.docx',
    hint: 'Upload your resume (PDF only)'
  }
};
