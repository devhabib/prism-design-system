import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismTooltipDirective } from './tooltip.directive';
import { ButtonComponent } from '../button/button.component';

const meta: Meta<PrismTooltipDirective> = {
  title: 'Overlay/Tooltip',
  component: PrismTooltipDirective,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismTooltipDirective, ButtonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A lightweight directive for showing helper text on hover. Supports 4-way positioning with automatic arrow indicators.

### Features
- **4-Way Positioning**: Top, Bottom, Left, Right
- **Automatic Arrows**: Visual indicators point to target element
- **Dark Theme**: High contrast with inverted surface color
- **Fade Animation**: Smooth entrance effect
- **Accessibility**: Non-interactive overlay

### Usage
\`\`\`html
<button prismTooltip="Click to submit" placement="top">Submit</button>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    prismTooltip: {
      control: 'text',
      description: 'Text to display in the tooltip'
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the element'
    }
  }
};

export default meta;

type Story = StoryObj<PrismTooltipDirective>;

export const Top: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 4rem;">
        <prism-button prismTooltip="This tooltip appears on top" placement="top">
          Hover Me (Top)
        </prism-button>
      </div>
    `
  })
};

export const Bottom: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 4rem;">
        <prism-button prismTooltip="This tooltip appears on bottom" placement="bottom">
          Hover Me (Bottom)
        </prism-button>
      </div>
    `
  })
};

export const Left: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 4rem;">
        <prism-button prismTooltip="This tooltip appears on left" placement="left">
          Hover Me (Left)
        </prism-button>
      </div>
    `
  })
};

export const Right: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 4rem;">
        <prism-button prismTooltip="This tooltip appears on right" placement="right">
          Hover Me (Right)
        </prism-button>
      </div>
    `
  })
};

export const AllPlacements: Story = {
  name: 'All Placements',
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; padding: 4rem;">
        <div style="text-align: center;">
          <prism-button prismTooltip="Top placement" placement="top">Top</prism-button>
        </div>
        <div style="text-align: center;">
          <prism-button prismTooltip="Bottom placement" placement="bottom">Bottom</prism-button>
        </div>
        <div style="text-align: center;">
          <prism-button prismTooltip="Left placement" placement="left">Left</prism-button>
        </div>
        <div style="text-align: center;">
          <prism-button prismTooltip="Right placement" placement="right">Right</prism-button>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of all tooltip placements.'
      }
    }
  }
};

export const OnIcons: Story = {
  name: 'On Icons',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; justify-content: center; padding: 4rem;">
        <button 
          prismTooltip="Notifications" 
          placement="bottom"
          style="background: none; border: none; cursor: pointer; padding: 0.5rem;"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        
        <button 
          prismTooltip="Settings" 
          placement="bottom"
          style="background: none; border: none; cursor: pointer; padding: 0.5rem;"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m8.66-13.66l-4.24 4.24m-8.48 0l-4.24-4.24"/>
          </svg>
        </button>
        
        <button 
          prismTooltip="Help" 
          placement="bottom"
          style="background: none; border: none; cursor: pointer; padding: 0.5rem;"
        >  
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </button>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tooltips work great on icon buttons for explaining actions.'
      }
    }
  }
};
