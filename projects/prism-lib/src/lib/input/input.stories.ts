import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from './input.component';
import { ButtonComponent } from '../button/button.component';

/**
 * Input Component - Form field with floating label and validation
 * 
 * Features:
 * - ControlValueAccessor for Angular Forms integration
 * - Floating label animation (CSS-only using :placeholder-shown)
 * - Validation state display via NgControl injection
 * - Prefix/Suffix slots for icons
 * 
 * Architecture Note:
 * Uses @Self() @Optional() NgControl injection instead of NG_VALUE_ACCESSOR
 * in providers to access ngControl.control.invalid and ngControl.control.touched
 * directly for error state detection.
 */
const meta: Meta<InputComponent> = {
  title: 'Forms/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, ButtonComponent],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Floating label text',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    placeholder: {
      control: 'text',
    },
    errorText: {
      control: 'text',
      description: 'Manual error message (overrides validation errors)',
    },
    hintText: {
      control: 'text',
      description: 'Helper text below input',
    },
    required: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

// ===========================================
// Basic Input
// ===========================================
export const Default: Story = {
  args: {
    label: 'Full Name',
    placeholder: ' ',
    type: 'text',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 320px;">
        <prism-input 
          [label]="label" 
          [placeholder]="placeholder" 
          [type]="type"
        ></prism-input>
      </div>
    `,
  }),
};

// ===========================================
// Interactive Form with Validation (MAIN DEMO)
// ===========================================
export const InteractiveForm: Story = {
  name: '🔥 Interactive Form',
  render: () => {
    // Create reactive form with validators
    const form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    // Function to mark all controls as touched (simulates submit)
    const markAllTouched = () => {
      Object.keys(form.controls).forEach(key => {
        form.get(key)?.markAsTouched();
      });
    };

    return {
      props: { form, markAllTouched },
      template: `
        <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 360px;">
          <prism-input 
            label="Email Address" 
            type="email"
            formControlName="email"
            [required]="true"
            hintText="We'll never share your email"
          ></prism-input>
          
          <prism-input 
            label="Password" 
            type="password"
            formControlName="password"
            [required]="true"
            hintText="Minimum 8 characters"
          ></prism-input>
          
          <div style="display: flex; gap: 1rem; align-items: center;">
            <prism-button 
              variant="primary" 
              (click)="markAllTouched()"
            >
              Submit (Mark Touched)
            </prism-button>
            
            <span style="font-size: 0.75rem; color: var(--color-text-secondary);">
              Form Valid: {{ form.valid ? '✅' : '❌' }}
            </span>
          </div>
          
          <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: -0.5rem;">
            Click "Submit" with empty fields to see validation errors
          </p>
        </form>
      `,
    };
  },
};

// ===========================================
// With Prefix Icon
// ===========================================
export const WithPrefixIcon: Story = {
  name: 'With Prefix Icon',
  args: {
    label: 'Search',
    type: 'search',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 320px;">
        <prism-input [label]="label" [type]="type">
          <svg prismPrefix xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </prism-input>
      </div>
    `,
  }),
};

// ===========================================
// With Suffix Icon (Password Toggle Style)
// ===========================================
export const WithSuffixIcon: Story = {
  name: 'With Suffix Icon',
  args: {
    label: 'Password',
    type: 'password',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 320px;">
        <prism-input [label]="label" [type]="type">
          <svg prismSuffix xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor: pointer;">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </prism-input>
      </div>
    `,
  }),
};

// ===========================================
// With Both Icons (Currency Input)
// ===========================================
export const WithBothIcons: Story = {
  name: 'With Both Icons',
  render: () => ({
    template: `
      <div style="max-width: 320px;">
        <prism-input label="Amount" type="number">
          <span prismPrefix style="font-weight: 500; color: var(--color-text-secondary);">$</span>
          <span prismSuffix style="font-size: 0.875rem; color: var(--color-text-secondary);">USD</span>
        </prism-input>
      </div>
    `,
  }),
};

// ===========================================
// Error State (Manual Override)
// ===========================================
export const ManualError: Story = {
  name: 'Manual Error State',
  render: () => {
    const control = new FormControl('johndoe');
    control.markAsTouched();

    return {
      props: { control },
      template: `
        <div style="max-width: 320px;">
          <prism-input 
            label="Username" 
            [formControl]="control"
            errorText="Username is already taken"
          ></prism-input>
        </div>
      `,
    };
  },
};

// ===========================================
// Disabled State
// ===========================================
export const Disabled: Story = {
  render: () => {
    const disabledControl = new FormControl({ value: 'Disabled Value', disabled: true });

    return {
      props: { disabledControl },
      template: `
        <div style="max-width: 320px;">
          <prism-input 
            label="Disabled Input" 
            [formControl]="disabledControl"
          ></prism-input>
        </div>
      `,
    };
  },
};

// ===========================================
// All Input Types
// ===========================================
export const InputTypes: Story = {
  name: 'All Input Types',
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 320px;">
        <prism-input label="Text" type="text"></prism-input>
        <prism-input label="Email" type="email"></prism-input>
        <prism-input label="Password" type="password"></prism-input>
        <prism-input label="Number" type="number"></prism-input>
        <prism-input label="Telephone" type="tel"></prism-input>
        <prism-input label="Search" type="search"></prism-input>
      </div>
    `,
  }),
};
