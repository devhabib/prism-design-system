import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrismTagsInputComponent } from './tags-input.component';

const meta: Meta<PrismTagsInputComponent> = {
  title: 'Forms/TagsInput',
  component: PrismTagsInputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, PrismTagsInputComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A chip-based array input component.

### Features
- **Chip Conversion**: Converts text to chips on Enter or Comma.
- **Backspace Deletion**: Removes the last chip when input is empty.
- **Duplicate Prevention**: Automatically prevents duplicate tags.
- **Model Support**: Fully supports \`ControlValueAccessor\` (\`ngModel\`).
        `
      }
    }
  },
  args: {
    placeholder: 'Add specific skills...'
  }
};

export default meta;

type Story = StoryObj<PrismTagsInputComponent>;

export const Default: Story = {
  args: {}
};

export const PrePopulated: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <prism-tags-input [ngModel]="['Angular', 'TypeScript', 'Storybook']"></prism-tags-input>
    `
  })
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-tags-input [ngModel]="['Read Only', 'Tags']" [disabled]="true"></prism-tags-input>
    `
  })
};
