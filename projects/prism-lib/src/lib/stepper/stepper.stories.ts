import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismStepperComponent } from './stepper.component';

const meta: Meta<PrismStepperComponent> = {
  title: 'Navigation/Stepper',
  component: PrismStepperComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismStepperComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A visual process indicator for multi-step workflows.

### Features
- **Visual Progress**: Clearly identifies completed, active, and pending steps.
- **Auto-connectors**: Draws lines between steps.
- **Status Icons**: Replaces numbers with checkmarks for completed steps.
        `
      }
    }
  },
  args: {
    steps: ['Account Details', 'Profile Info', 'Review & Submit'],
    currentStep: 0
  }
};

export default meta;

type Story = StoryObj<PrismStepperComponent>;

export const Step1: Story = {
  args: {
    currentStep: 0
  }
};

export const Step2: Story = {
  args: {
    currentStep: 1
  }
};

export const Step3: Story = {
  args: {
    currentStep: 2
  }
};

export const ManySteps: Story = {
  args: {
    steps: ['Cart', 'Shipping', 'Payment', 'Confirmation'],
    currentStep: 2
  }
};
