import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { PrismCheckboxComponent } from './checkbox.component';

// Demo component for forms example
@Component({
  selector: 'checkbox-form-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, PrismCheckboxComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <prism-checkbox [(ngModel)]="accepted" label="I accept the terms and conditions"></prism-checkbox>
      <prism-checkbox [(ngModel)]="newsletter" label="Subscribe to newsletter"></prism-checkbox>
      
      <div style="padding: 1rem; background: #f3f4f6; border-radius: 8px; margin-top: 1rem;">
        <p style="margin: 0; font-size: 0.875rem;"><strong>Form Values:</strong></p>
        <pre style="margin: 0.5rem 0 0; font-size: 0.75rem;">{{ {accepted, newsletter} | json }}</pre>
      </div>
    </div>
  `
})
class CheckboxFormDemoComponent {
  accepted = false;
  newsletter = true;
}

const meta: Meta<PrismCheckboxComponent> = {
  title: 'Forms/Checkbox',
  component: PrismCheckboxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, PrismCheckboxComponent, CheckboxFormDemoComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A custom-styled checkbox component with full form support via ControlValueAccessor. Works seamlessly with both template-driven and reactive forms.

### Features
- **Custom Styling**: Hides native checkbox, replaces with branded design
- **Form Support**: Implements ControlValueAccessor for ngModel and FormControl
- **Disabled State**: Visual and functional disabled mode
- **Flexible Labels**: Supports both label prop and content projection
- **Accessibility**: Maintains native checkbox semantics with proper focus states
        `
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the checkbox'
    }
  }
};

export default meta;

type Story = StoryObj<PrismCheckboxComponent>;

export const Unchecked: Story = {
  render: () => ({
    template: `<prism-checkbox label="Accept terms and conditions"></prism-checkbox>`
  })
};

export const Checked: Story = {
  render: () => ({
    template: `<prism-checkbox [ngModel]="true" label="Remember me"></prism-checkbox>`,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        <prism-checkbox [disabled]="true" label="Disabled unchecked"></prism-checkbox>
        <prism-checkbox [ngModel]="true" [disabled]="true" label="Disabled checked"></prism-checkbox>
      </div>
    `,
    moduleMetadata: {
      imports: [FormsModule]
    }
  })
};

export const WithContentProjection: Story = {
  name: 'With Content Projection',
  render: () => ({
    template: `
      <prism-checkbox>
        <span style="font-size: 0.875rem;">
          I agree to the <a href="#" style="color: var(--color-primary);">Terms of Service</a> and 
          <a href="#" style="color: var(--color-primary);">Privacy Policy</a>
        </span>
      </prism-checkbox>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Use content projection for complex labels with links or formatting.'
      }
    }
  }
};

export const FormIntegration: Story = {
  name: 'Form Integration (ngModel)',
  render: () => ({
    template: `<checkbox-form-demo></checkbox-form-demo>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates two-way binding with ngModel in template-driven forms.'
      }
    }
  }
};

export const CheckboxGroup: Story = {
  name: 'Checkbox Group',
  render: () => ({
    template: `
      <div style="border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
        <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; font-weight: 600;">Notification Preferences</h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <prism-checkbox label="Email notifications"></prism-checkbox>
          <prism-checkbox label="Push notifications"></prism-checkbox>
          <prism-checkbox label="SMS notifications"></prism-checkbox>
          <prism-checkbox label="Marketing emails"></prism-checkbox>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes in a grouped layout for related options.'
      }
    }
  }
};
