import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrismDatePickerComponent } from './date-picker.component';

const meta: Meta<PrismDatePickerComponent> = {
  title: 'Forms/DatePicker',
  component: PrismDatePickerComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, PrismDatePickerComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A unified date picker that wraps the native browser date input.

### Features
- **Custom Trigger**: Consistent styling matching other text inputs
- **Native Implementation**: Uses \`showPicker()\` and native mobile drawers
- **Model Support**: Fully supports \`ControlValueAccessor\` (ngModel / FormControl)
- **Formatted Display**: Shows selected date in readable format "MMM DD, YYYY"
        `
      }
    }
  },
  args: {
    placeholder: 'Pick a date...'
  }
};

export default meta;

type Story = StoryObj<PrismDatePickerComponent>;

export const Default: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px; padding: 2rem;">
        <prism-date-picker [placeholder]="placeholder"></prism-date-picker>
      </div>
    `
  })
};

export const Preselected: Story = {
  args: {},
  render: (args) => ({
    props: {
      date: '2024-05-15'
    },
    template: `
      <div style="height: 300px; padding: 2rem;">
        <label style="display:block; margin-bottom: 0.5rem; font-weight: 500;">Start Date</label>
        <prism-date-picker [(ngModel)]="date"></prism-date-picker>
        <p style="margin-top: 1rem; color: #666;">Model value: {{ date }}</p>
      </div>
    `
  })
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Cannot select date'
  }
};
