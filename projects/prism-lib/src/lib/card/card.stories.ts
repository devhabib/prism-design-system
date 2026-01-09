import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CardComponent } from './card.component';
import {
  CardHeaderDirective,
  CardMediaDirective,
  CardBodyDirective,
  CardActionsDirective,
  CardTitleDirective,
  CardSubtitleDirective
} from './card.directives';
import { ButtonComponent } from '../button/button.component';

/**
 * Card Component - Multi-slot content projection container
 * 
 * Features:
 * - Named slots: header, media, body, actions
 * - Elevation levels (0-5) for depth control
 * - Hoverable state with lift animation
 * - Responsive layout
 */
const meta: Meta<CardComponent> = {
  title: 'Primitives/Card',
  component: CardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CardHeaderDirective,
        CardMediaDirective,
        CardBodyDirective,
        CardActionsDirective,
        CardTitleDirective,
        CardSubtitleDirective,
        ButtonComponent,
      ],
    }),
  ],
  argTypes: {
    elevation: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5],
      description: 'Shadow depth level',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover lift animation',
    },
    noPadding: {
      control: 'boolean',
      description: 'Remove internal padding',
    },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

// ===========================================
// Basic Card
// ===========================================
export const Default: Story = {
  args: {
    elevation: 1,
    hoverable: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-card [elevation]="elevation" [hoverable]="hoverable" style="max-width: 320px;">
        <div prism-card-header>
          <h3 prism-card-title>Simple Card</h3>
        </div>
        <div prism-card-body>
          <p>This is a basic card with just a header and body content.</p>
        </div>
      </prism-card>
    `,
  }),
};

// ===========================================
// Rich Media Card (All Slots)
// ===========================================
export const RichMediaCard: Story = {
  name: 'Rich Media Card',
  args: {
    elevation: 2,
    hoverable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-card [elevation]="elevation" [hoverable]="hoverable" style="max-width: 360px;">
        <img 
          prism-card-media 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop" 
          alt="Mountain landscape"
          data-aspect="16:9"
        />
        <div prism-card-header>
          <h3 prism-card-title>Alpine Adventure</h3>
          <span prism-card-subtitle>Photography Collection</span>
        </div>
        <div prism-card-body>
          <p>Experience breathtaking mountain vistas and pristine wilderness. 
             This collection captures the raw beauty of alpine landscapes.</p>
        </div>
        <div prism-card-actions>
          <prism-button variant="ghost" size="sm">Share</prism-button>
          <prism-button variant="primary" size="sm">Explore</prism-button>
        </div>
      </prism-card>
    `,
  }),
};

// ===========================================
// Elevation Levels
// ===========================================
export const ElevationLevels: Story = {
  name: 'Elevation Levels',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; padding: 1rem;">
        <prism-card [elevation]="0" style="width: 140px;">
          <div prism-card-body>
            <p><strong>Level 0</strong><br/>No shadow</p>
          </div>
        </prism-card>
        <prism-card [elevation]="1" style="width: 140px;">
          <div prism-card-body>
            <p><strong>Level 1</strong><br/>Subtle</p>
          </div>
        </prism-card>
        <prism-card [elevation]="2" style="width: 140px;">
          <div prism-card-body>
            <p><strong>Level 2</strong><br/>Default</p>
          </div>
        </prism-card>
        <prism-card [elevation]="3" style="width: 140px;">
          <div prism-card-body>
            <p><strong>Level 3</strong><br/>Raised</p>
          </div>
        </prism-card>
        <prism-card [elevation]="4" style="width: 140px;">
          <div prism-card-body>
            <p><strong>Level 4</strong><br/>Modal</p>
          </div>
        </prism-card>
        <prism-card [elevation]="5" style="width: 140px;">
          <div prism-card-body>
            <p><strong>Level 5</strong><br/>Max</p>
          </div>
        </prism-card>
      </div>
    `,
  }),
};

// ===========================================
// Hoverable Cards
// ===========================================
export const HoverableCards: Story = {
  name: 'Hoverable Cards',
  render: () => ({
    template: `
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap;">
        <prism-card [hoverable]="true" style="width: 280px;">
          <div prism-card-header>
            <h3 prism-card-title>Interactive Card</h3>
          </div>
          <div prism-card-body>
            <p>Hover over me to see the lift animation and shadow increase.</p>
          </div>
          <div prism-card-actions>
            <prism-button variant="outline" size="sm">Click Me</prism-button>
          </div>
        </prism-card>
        <prism-card [hoverable]="true" style="width: 280px;">
          <div prism-card-header>
            <h3 prism-card-title>Another Card</h3>
          </div>
          <div prism-card-body>
            <p>Cards with hoverable enabled feel interactive and clickable.</p>
          </div>
          <div prism-card-actions>
            <prism-button variant="primary" size="sm">Learn More</prism-button>
          </div>
        </prism-card>
      </div>
    `,
  }),
};

// ===========================================
// Product Card Example
// ===========================================
export const ProductCard: Story = {
  name: 'Product Card',
  args: {
    elevation: 1,
    hoverable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <prism-card [elevation]="elevation" [hoverable]="hoverable" style="max-width: 300px;">
        <img 
          prism-card-media 
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop" 
          alt="Smart Watch"
          data-aspect="4:3"
        />
        <div prism-card-header>
          <h3 prism-card-title>Smart Watch Pro</h3>
          <span prism-card-subtitle>$299.00</span>
        </div>
        <div prism-card-body>
          <p>Advanced fitness tracking, heart rate monitoring, and 7-day battery life.</p>
        </div>
        <div prism-card-actions>
          <prism-button variant="ghost" size="sm">Details</prism-button>
          <prism-button variant="primary" size="sm">Add to Cart</prism-button>
        </div>
      </prism-card>
    `,
  }),
};
