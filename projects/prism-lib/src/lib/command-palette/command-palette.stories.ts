import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { PrismCommandPaletteComponent } from './command-palette.component';
import { PrismHighlightPipe } from '../highlight/highlight.pipe';

const meta: Meta<PrismCommandPaletteComponent> = {
  title: 'Overlays/CommandPalette',
  component: PrismCommandPaletteComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismCommandPaletteComponent, PrismHighlightPipe],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `A 'Spotlight' style command palette for global quick actions.
        
### Usage
- Bind \`[isOpen]\` to a boolean.
- Provide \`[commands]\`.
- Listen to \`(execute)\` to run actions.
        `
      }
    }
  },
  args: {
    isOpen: true,
    commands: [
      { id: '1', title: 'Go to Dashboard', group: 'Navigation', action: () => { }, shortcut: 'G D' },
      { id: '2', title: 'Go to Settings', group: 'Navigation', action: () => { }, shortcut: 'G S' },
      { id: '3', title: 'Toggle Dark Mode', group: 'Theme', action: () => { }, icon: '🌙' },
      { id: '4', title: 'Logout', group: 'Account', action: () => { } },
    ]
  }
};

export default meta;

type Story = StoryObj<PrismCommandPaletteComponent>;

export const Default: Story = {
  args: {
    isOpen: true
  }
};

export const Filtered: Story = {
  args: {
    isOpen: true
  },
  play: async ({ canvasElement }) => {
    // Simulating user typing 'Dash' could be done here in interactions test
  }
};
