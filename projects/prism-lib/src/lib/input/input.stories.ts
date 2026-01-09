import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from './input.component';
import { Component } from '@angular/core';

/**
 * Input Component - Form field with floating label and validation
 * 
 * Features:
 * - ControlValueAccessor for Angular Forms integration
 * - Floating label animation (CSS + JS fallback)
 * - Validation state display
 * - Prefix/Suffix slots for icons
 */
const meta: Meta<InputComponent> = {
  title: 'Forms/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule],
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
      description: 'Manual error message',
    },
    hintText: {
      control: 'text',
      description: 'Helper text below input',
    },
    required: {
      control: 'boolean',
    },
    readonly: {
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
// With Validation (Reactive Forms)
// ===========================================
export const WithValidation: Story = {
  name: 'With Validation',
  render: () => {
    // Create form controls for the story
    const emailControl = new FormControl('', [Validators.required, Validators.email]);

    return {
      props: { emailControl },
      template: `
        <div style="max-width: 320px;">
          <prism-input 
            label="Email Address" 
            type="email"
            [formControl]="emailControl"
            hintText="We'll never share your email"
          ></prism-input>
          
          <p style="margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
            Try typing an invalid email and clicking outside the input.
          </p>
        </div>
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
// With Suffix Icon (Password Toggle)
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
// With Both Icons
// ===========================================
export const WithBothIcons: Story = {
  name: 'With Both Icons',
  args: {
    label: 'Amount',
    type: 'number',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 320px;">
        <prism-input [label]="label" [type]="type">
          <span prismPrefix style="font-weight: 500; color: var(--color-text-secondary);">$</span>
          <span prismSuffix style="font-size: 0.875rem; color: var(--color-text-secondary);">USD</span>
        </prism-input>
      </div>
    `,
  }),
};

// ===========================================
// Error State (Manual)
// ===========================================
export const ErrorState: Story = {
  name: 'Error State',
  args: {
    label: 'Username',
    errorText: 'Username is already taken',
  },
  render: (args) => ({
    props: { ...args, value: 'johndoe' },
    template: `
      <div style="max-width: 320px;">
        <prism-input 
          [label]="label" 
          [errorText]="errorText"
          [(ngModel)]="value"
        ></prism-input>
      </div>
    `,
  }),
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
// Required Field
// ===========================================
export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 320px;">
        <prism-input 
          [label]="label" 
          [required]="required"
          hintText="This field is required"
        ></prism-input>
      </div>
    `,
  }),
};

// ===========================================
// Form Example (Multiple Inputs)
// ===========================================
export const FormExample: Story = {
  name: 'Form Example',
  render: () => {
    const form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    return {
      props: { form },
      template: `
        <form [formGroup]="form" style="display: flex; flex-direction: column; gap: 1.5rem; max-width: 400px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <prism-input 
              label="First Name" 
              formControlName="firstName"
              [required]="true"
            ></prism-input>
            <prism-input 
              label="Last Name" 
              formControlName="lastName"
              [required]="true"
            ></prism-input>
          </div>
          <prism-input 
            label="Email" 
            type="email"
            formControlName="email"
            [required]="true"
          ></prism-input>
          
          <p style="font-size: 0.75rem; color: #9ca3af;">
            Form Valid: {{ form.valid }} | Form Touched: {{ form.touched }}
          </p>
        </form>
      `,
    };
  },
};
