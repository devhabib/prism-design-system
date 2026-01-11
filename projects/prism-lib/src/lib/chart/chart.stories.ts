import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PrismChartComponent } from './chart.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'chart-interactive-demo',
  standalone: true,
  imports: [CommonModule, PrismChartComponent, ButtonComponent],
  template: `
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <div style="height: 300px;">
        <prism-chart
          [type]="'line'"
          [labels]="labels"
          [data]="datasets"
        ></prism-chart>
      </div>
      <prism-button variant="primary" (click)="randomizeData()">
        Randomize Data
      </prism-button>
    </div>
  `
})
class ChartInteractiveDemoComponent {
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  datasets = [
    {
      label: 'Revenue',
      data: [12, 19, 3, 5, 2, 3],
    }
  ];

  randomizeData() {
    this.datasets = [
      {
        label: 'Revenue',
        data: this.labels.map(() => Math.floor(Math.random() * 20)),
      }
    ];
  }
}

const meta: Meta<PrismChartComponent> = {
  title: 'Data/Chart',
  component: PrismChartComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, PrismChartComponent, ChartInteractiveDemoComponent, ButtonComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `A theme-aware Chart.js wrapper component that automatically reads CSS variables for colors. Supports line, bar, and doughnut chart types.

### Features
- **Theme Awareness**: Reads CSS variables from DOM for automatic color theming
- **Dark Mode Support**: Chart colors update automatically when dark mode is toggled
- **Multiple Types**: Line, Bar, Doughnut chart support
- **Responsive**: Adapts to container size
- **Animated**: Smooth transitions when data updates
        `
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'bar', 'doughnut'],
      description: 'Type of chart to render'
    },
    data: {
      control: 'object',
      description: 'Chart dataset(s)'
    },
    labels: {
      control: 'object',
      description: 'X-axis labels'
    }
  }
};

export default meta;

type Story = StoryObj<PrismChartComponent>;

export const LineChart: Story = {
  args: {
    type: 'line',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [
      {
        label: 'Revenue',
        data: [12, 19, 3, 5, 2, 3],
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px;">
        <prism-chart [type]="type" [labels]="labels" [data]="data"></prism-chart>
      </div>
    `
  })
};

export const BarChart: Story = {
  args: {
    type: 'bar',
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [
      {
        label: 'Signups',
        data: [65, 59, 80, 81, 56, 55, 40],
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px;">
        <prism-chart [type]="type" [labels]="labels" [data]="data"></prism-chart>
      </div>
    `
  })
};

export const DoughnutChart: Story = {
  args: {
    type: 'doughnut',
    labels: ['Desktop', 'Mobile', 'Tablet'],
    data: [
      {
        label: 'Traffic Sources',
        data: [300, 50, 100],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(245, 158, 11, 0.5)'
        ]
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px;">
        <prism-chart [type]="type" [labels]="labels" [data]="data"></prism-chart>
      </div>
    `
  })
};

export const MultipleDatasets: Story = {
  name: 'Multiple Datasets',
  args: {
    type: 'line',
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [
      {
        label: 'Product A',
        data: [65, 59, 80, 81],
      },
      {
        label: 'Product B',
        data: [28, 48, 40, 19],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
      }
    ]
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 300px;">
        <prism-chart [type]="type" [labels]="labels" [data]="data"></prism-chart>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Chart with multiple datasets for comparison.'
      }
    }
  }
};

export const Interactive: Story = {
  name: 'Interactive Demo',
  render: () => ({
    template: `<chart-interactive-demo></chart-interactive-demo>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Click the button to randomize data and see the chart animate.'
      }
    }
  }
};
