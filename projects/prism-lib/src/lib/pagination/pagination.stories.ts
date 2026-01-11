import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrismPaginationComponent } from './pagination.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'pagination-demo',
  standalone: true,
  imports: [CommonModule, PrismPaginationComponent],
  template: `
    <div>
      <prism-pagination
        [totalItems]="totalItems"
        [pageSize]="pageSize"
        [currentPage]="currentPage"
        (pageChange)="onPageChange($event)"
      ></prism-pagination>
      <p style="text-align: center; margin-top: 1rem; font-size: 0.875rem; color: #6b7280;">
        Page {{ currentPage }} of {{ Math.ceil(totalItems / pageSize) }} ({{ totalItems }} items total)
      </p>
    </div>
  `
})
class PaginationDemoComponent {
  totalItems = 100;
  pageSize = 10;
  currentPage = 1;
  Math = Math;

  onPageChange(page: number) {
    this.currentPage = page;
  }
}

const meta: Meta<PrismPaginationComponent> = {
  title: 'Navigation/Pagination',
  component: PrismPaginationComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismPaginationComponent, PaginationDemoComponent, ButtonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A pagination control for navigating through pages of data. Intelligently shows page numbers with ellipsis for large page counts.

### Features
- **Smart Page Display**: Shows ellipsis for large page counts
- **Previous/Next Navigation**: Disabled when at boundaries
- **Active State**: Highlights current page
- **Accessible**: Properly disabled states
        `
      }
    }
  },
  argTypes: {
    totalItems: {
      control: 'number',
      description: 'Total number of items'
    },
    pageSize: {
      control: 'number',
      description: 'Number of items per page'
    },
    currentPage: {
      control: 'number',
      description: 'Current active page number'
    }
  }
};

export default meta;

type Story = StoryObj<PrismPaginationComponent>;

export const Default: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 1
  }
};

export const ManyPages: Story = {
  args: {
    totalItems: 500,
    pageSize: 10,
    currentPage: 25
  }
};

export const FewPages: Story = {
  args: {
    totalItems: 50,
    pageSize: 10,
    currentPage: 3
  }
};

export const Interactive: Story = {
  name: 'Interactive Demo',
  render: () => ({
    template: `<pagination-demo></pagination-demo>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Click page numbers to navigate. Current page updates dynamically.'
      }
    }
  }
};
