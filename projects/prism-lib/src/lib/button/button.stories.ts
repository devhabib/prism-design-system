import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

/**
 * The Button component is a foundational primitive in the Prism Design System.
 * It supports multiple variants, sizes, and loading states.
 */
const meta: Meta<ButtonComponent> = {
  title: 'Primitives/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ===========================================
// Primary Variants
// ===========================================

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `<prism-button [variant]="variant" [size]="size" [loading]="loading" [disabled]="disabled">Primary Button</prism-button>`,
  }),
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<prism-button [variant]="variant" [size]="size">Secondary</prism-button>`,
  }),
};

export const Outline: Story = {
  args: { variant: 'outline', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<prism-button [variant]="variant" [size]="size">Outline</prism-button>`,
  }),
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<prism-button [variant]="variant" [size]="size">Ghost</prism-button>`,
  }),
};

// ===========================================
// Size Variants
// ===========================================

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <prism-button size="sm">Small</prism-button>
        <prism-button size="md">Medium</prism-button>
        <prism-button size="lg">Large</prism-button>
      </div>
    `,
  }),
};

// ===========================================
// States
// ===========================================

export const Loading: Story = {
  args: { variant: 'primary', size: 'md', loading: true },
  render: (args) => ({
    props: args,
    template: `<prism-button [variant]="variant" [size]="size" [loading]="loading">Loading...</prism-button>`,
  }),
};

export const Disabled: Story = {
  args: { variant: 'primary', size: 'md', disabled: true },
  render: (args) => ({
    props: args,
    template: `<prism-button [variant]="variant" [size]="size" [disabled]="disabled">Disabled</prism-button>`,
  }),
};

// ===========================================
// All Variants Grid
// ===========================================

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <prism-button variant="primary">Primary</prism-button>
          <prism-button variant="secondary">Secondary</prism-button>
          <prism-button variant="outline">Outline</prism-button>
          <prism-button variant="ghost">Ghost</prism-button>
        </div>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <prism-button variant="primary" [loading]="true">Loading</prism-button>
          <prism-button variant="secondary" [disabled]="true">Disabled</prism-button>
        </div>
      </div>
    `,
  }),
};
