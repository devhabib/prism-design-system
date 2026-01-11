import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'prism-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prism-chart-container" [style.height]="height">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [`
    .prism-chart-container {
      position: relative;
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @ViewChild('chartCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() type: ChartType = 'line';
  @Input() data: any;
  @Input() labels: string[] = [];
  @Input() options: any = {};
  @Input() height: string = '300px';

  private chart?: Chart;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Only update if chart is already created and data or labels changed
    if (this.chart && (changes['data'] || changes['labels'])) {
      this.updateChart();
    }
  }

  private createChart() {
    if (!this.canvasRef || !this.data) return;

    // Read CSS variables from the DOM for theme-aware colors
    const styles = getComputedStyle(document.documentElement);
    const primaryColor = styles.getPropertyValue('--color-primary').trim() || '#3b82f6';
    const textColor = styles.getPropertyValue('--color-text-primary').trim() || '#1f2937';
    const borderColor = styles.getPropertyValue('--color-border').trim() || '#e5e7eb';
    const surfaceColor = styles.getPropertyValue('--color-surface').trim() || '#ffffff';

    const config: ChartConfiguration = {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: Array.isArray(this.data) ? this.data.map((dataset: any) => ({
          ...dataset,
          backgroundColor: dataset.backgroundColor || this.hexToRgba(primaryColor, 0.2),
          borderColor: dataset.borderColor || primaryColor,
          borderWidth: dataset.borderWidth || 2,
        })) : []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            }
          },
          tooltip: {
            backgroundColor: surfaceColor,
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: borderColor,
            borderWidth: 1,
          }
        },
        scales: this.type !== 'doughnut' && this.type !== 'pie' ? {
          y: {
            grid: {
              color: borderColor,
            },
            ticks: {
              color: textColor,
            }
          },
          x: {
            grid: {
              color: borderColor,
            },
            ticks: {
              color: textColor,
            }
          }
        } : {},
        ...this.options
      }
    };

    this.chart = new Chart(this.canvasRef.nativeElement, config);
    this.cdr.markForCheck();
  }

  private hexToRgba(hex: string, alpha: number): string {
    // Remove # if present
    hex = hex.replace('#', '');

    // Parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private updateChart() {
    if (!this.chart) return;

    // Update labels
    this.chart.data.labels = this.labels;

    // Update datasets
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#3b82f6';
    this.chart.data.datasets = Array.isArray(this.data) ? this.data.map((dataset: any) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || this.hexToRgba(primaryColor, 0.2),
      borderColor: dataset.borderColor || primaryColor,
      borderWidth: dataset.borderWidth || 2,
    })) : [];

    this.chart.update();
    this.cdr.markForCheck();
  }

  // Public method to update chart data
  updateData(newData: any, newLabels?: string[]) {
    if (!this.chart) return;

    if (newLabels) {
      this.chart.data.labels = newLabels;
    }

    if (Array.isArray(newData)) {
      this.chart.data.datasets = newData;
    }

    this.chart.update();
    this.cdr.markForCheck();
  }
}
