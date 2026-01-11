import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  ContainerComponent,
  GridComponent,
  GridItemComponent,
} from 'prism-lib';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ContainerComponent,
    GridComponent,
    GridItemComponent,
  ],
  template: `
    <prism-container maxWidth="full" paddingX="xl" paddingY="lg">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Dashboard</h1>
          <p class="page-subtitle">Welcome back, John! Here's what's happening.</p>
        </div>
      </div>

      <!-- Stats Grid -->
      <prism-grid columns="4" gap="lg" class="stats-section">
        <prism-grid-item *ngFor="let stat of stats">
          <prism-card [elevation]="1" class="stat-card">
            <div prism-card-body>
              <div class="stat-card__label">{{ stat.label }}</div>
              <div class="stat-card__value">{{ stat.value }}</div>
              <div class="stat-card__change" [class.positive]="stat.positive" [class.negative]="!stat.positive">
                {{ stat.positive ? '↑' : '↓' }} {{ stat.change }}
              </div>
            </div>
          </prism-card>
        </prism-grid-item>
      </prism-grid>

      <!-- Content Grid -->
      <prism-grid columns="12" gap="xl" class="content-section">
        <!-- Recent Activity -->
        <prism-grid-item colSpan="8">
          <prism-card [elevation]="1">
            <div prism-card-header>
              <h3 class="section-title">Recent Activity</h3>
            </div>
            <div prism-card-body>
              <div class="activity-list">
                <div class="activity-item" *ngFor="let activity of activities">
                  <div class="activity-item__avatar" [style.background]="activity.color">
                    {{ activity.initials }}
                  </div>
                  <div class="activity-item__content">
                    <div class="activity-item__title">{{ activity.title }}</div>
                    <div class="activity-item__time">{{ activity.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </prism-card>
        </prism-grid-item>

        <!-- Quick Actions Sidebar -->
        <prism-grid-item colSpan="4">
          <prism-card [elevation]="1">
            <div prism-card-header>
              <h3 class="section-title">Quick Stats</h3>
            </div>
            <div prism-card-body>
              <div class="quick-stats">
                <div class="quick-stat">
                  <span class="quick-stat__label">Conversion Rate</span>
                  <span class="quick-stat__value">4.2%</span>
                </div>
                <div class="quick-stat">
                  <span class="quick-stat__label">Avg Session</span>
                  <span class="quick-stat__value">12m 34s</span>
                </div>
                <div class="quick-stat">
                  <span class="quick-stat__label">Active Users</span>
                  <span class="quick-stat__value">847</span>
                </div>
                <div class="quick-stat">
                  <span class="quick-stat__label">Peak Hours</span>
                  <span class="quick-stat__value">2-4 PM</span>
                </div>
              </div>
            </div>
          </prism-card>
        </prism-grid-item>
      </prism-grid>
    </prism-container>
  `,
  styles: [`
    .page-header {
      margin-bottom: 2rem;
    }

    .page-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }

    .page-subtitle {
      font-size: 0.9375rem;
      color: #6b7280;
      margin: 0.5rem 0 0 0;
    }

    .stats-section {
      margin-bottom: 2rem;
    }

    .content-section {
      margin-bottom: 2rem;
    }

    .section-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
    }

    /* Stat Card */
    .stat-card__label {
      font-size: 0.875rem;
      color: #6b7280;
      margin-bottom: 0.5rem;
    }

    .stat-card__value {
      font-size: 2rem;
      font-weight: 700;
      color: #111827;
      line-height: 1.2;
    }

    .stat-card__change {
      font-size: 0.8125rem;
      margin-top: 0.5rem;
    }

    .stat-card__change.positive {
      color: #10b981;
    }

    .stat-card__change.negative {
      color: #ef4444;
    }

    /* Activity List */
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.875rem;
      border-radius: 10px;
      transition: background 0.15s ease;
    }

    .activity-item:hover {
      background: #f9fafb;
    }

    .activity-item__avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
      font-weight: 600;
      flex-shrink: 0;
    }

    .activity-item__content {
      flex: 1;
      min-width: 0;
    }

    .activity-item__title {
      font-size: 0.9375rem;
      font-weight: 500;
      color: #111827;
    }

    .activity-item__time {
      font-size: 0.8125rem;
      color: #9ca3af;
      margin-top: 0.25rem;
    }

    /* Quick Stats */
    .quick-stats {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .quick-stat {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid #f3f4f6;
    }

    .quick-stat:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .quick-stat__label {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .quick-stat__value {
      font-size: 0.9375rem;
      font-weight: 600;
      color: #111827;
    }
  `],
})
export class DashboardComponent {
  stats = [
    { label: 'Total Users', value: '2,847', change: '12% from last month', positive: true },
    { label: 'Active Sessions', value: '1,234', change: '8% from last week', positive: true },
    { label: 'Revenue', value: '$48,290', change: '23% from last month', positive: true },
    { label: 'Bounce Rate', value: '24.8%', change: '3% from last month', positive: false },
  ];

  activities = [
    { initials: 'JD', title: 'John Doe updated their profile', time: '2 minutes ago', color: '#6366f1' },
    { initials: 'AS', title: 'Alice Smith created a new project', time: '15 minutes ago', color: '#10b981' },
    { initials: 'BJ', title: 'Bob Johnson uploaded 3 files', time: '1 hour ago', color: '#f59e0b' },
    { initials: 'MK', title: 'Mary Kim invited 2 team members', time: '3 hours ago', color: '#ef4444' },
  ];
}
