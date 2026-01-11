import { Component, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  TableComponent,
  ButtonComponent,
  DialogService,
  ToastService,
  ContainerComponent,
  GridComponent,
  GridItemComponent,
  CardComponent,
  PrismSkeletonComponent,
  PrismPaginationComponent,
  PrismBreadcrumbsComponent,
  PrismSearchInputComponent,
  PrismEmptyStateComponent,
  PrismDatePickerComponent,
} from 'prism-lib';
import { UserDialogComponent } from './user-dialog.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';
import { AddUserDrawerComponent } from './add-user-drawer.component';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,   // Add FormsModule for ngModel binding
    TableComponent,
    ButtonComponent,
    ContainerComponent,
    GridComponent,
    GridItemComponent,
    CardComponent,
    PrismBreadcrumbsComponent,
    PrismSearchInputComponent,
    PrismEmptyStateComponent,
    PrismDatePickerComponent,
    AddUserDrawerComponent,
  ],
  template: `
    <prism-container maxWidth="full" paddingX="xl" paddingY="lg">
      <!-- Breadcrumbs -->
      <prism-breadcrumbs [items]="breadcrumbs" class="mb-6 block"></prism-breadcrumbs>

      <!-- Page Header -->
      <prism-grid columns="12" gap="lg" alignItems="center" class="page-header">
        <prism-grid-item colSpan="8">
          <h1 class="page-title">Users</h1>
          <p class="page-subtitle">Manage your team members and their permissions.</p>
        </prism-grid-item>
        <prism-grid-item colSpan="4" class="header-actions">
          <prism-button variant="primary" (click)="openAddUserDrawer()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.5rem;">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add User
          </prism-button>
        </prism-grid-item>
      </prism-grid>

      <!-- Add User Drawer -->
      <app-add-user-drawer #addUserDrawer></app-add-user-drawer>

      <!-- Summary Cards -->
      <prism-grid columns="4" gap="lg" class="summary-section">
        <prism-grid-item>
          <prism-card [elevation]="1" class="summary-card">
            <div prism-card-body>
              <div class="summary-card__icon summary-card__icon--primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <div class="summary-card__content">
                <div class="summary-card__value">{{ users.length }}</div>
                <div class="summary-card__label">Total Users</div>
              </div>
            </div>
          </prism-card>
        </prism-grid-item>
        <prism-grid-item>
          <prism-card [elevation]="1" class="summary-card">
            <div prism-card-body>
              <div class="summary-card__icon summary-card__icon--success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <div class="summary-card__content">
                <div class="summary-card__value">{{ activeCount }}</div>
                <div class="summary-card__label">Active</div>
              </div>
            </div>
          </prism-card>
        </prism-grid-item>
        <prism-grid-item>
          <prism-card [elevation]="1" class="summary-card">
            <div prism-card-body>
              <div class="summary-card__icon summary-card__icon--warning">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div class="summary-card__content">
                <div class="summary-card__value">{{ pendingCount }}</div>
                <div class="summary-card__label">Pending</div>
              </div>
            </div>
          </prism-card>
        </prism-grid-item>
        <prism-grid-item>
          <prism-card [elevation]="1" class="summary-card">
            <div prism-card-body>
              <div class="summary-card__icon summary-card__icon--gray">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <div class="summary-card__content">
                <div class="summary-card__value">{{ inactiveCount }}</div>
                <div class="summary-card__label">Inactive</div>
              </div>
            </div>
          </prism-card>
        </prism-grid-item>
      </prism-grid>

      <!-- Users Table Section -->
      <div class="table-section">
        <!-- Filter Bar -->
        <div class="filter-bar">
          <div class="filter-search">
            <prism-search 
              placeholder="Search users by name, email or role..." 
              (searchChange)="filterUsers($event)">
            </prism-search>
          </div>
          <div class="filter-date">
            <prism-date-picker 
              placeholder="Filter by Joined Date"
              (ngModelChange)="filterByDate($event)"
              [(ngModel)]="selectedDate">
            </prism-date-picker>
          </div>
        </div>

        <prism-card [elevation]="1">
          <div prism-card-body style="padding: 0;">
            <ng-container *ngIf="filteredUsers.length > 0; else noResults">
              <prism-table
                [data]="filteredUsers"
                [columns]="columns"
                [striped]="true"
                [hoverable]="true"
              >
                <!-- Status Column Template -->
                <ng-template #statusTemplate let-row>
                  <span class="badge" [ngClass]="{
                    'badge--success': row.status === 'active',
                    'badge--gray': row.status === 'inactive',
                    'badge--warning': row.status === 'pending'
                  }">
                    {{ row.status | titlecase }}
                  </span>
                </ng-template>
    
                <!-- Actions Column Template -->
                <ng-template #actionsTemplate let-row>
                  <div class="action-buttons">
                    <prism-button variant="ghost" size="sm" (click)="editUser(row)">Edit</prism-button>
                    <prism-button variant="ghost" size="sm" (click)="deleteUser(row)">Delete</prism-button>
                  </div>
                </ng-template>
              </prism-table>
            </ng-container>

            <ng-template #noResults>
              <prism-empty-state
                icon="search"
                title="No users found"
                description="We couldn't find any users matching your search. Try adjusting your filters."
              >
                <prism-button variant="secondary" size="sm" (click)="resetFilter()">Clear Search</prism-button>
              </prism-empty-state>
            </ng-template>
          </div>
        </prism-card>
      </div>
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

    .header-actions {
      display: flex;
      justify-content: flex-end;
    }

    .summary-section {
      margin-bottom: 2rem;
    }

    .summary-card {
      height: 100%;
    }

    .summary-card [prism-card-body] {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .summary-card__icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .summary-card__icon--primary {
      background: #eef2ff;
      color: #6366f1;
    }

    .summary-card__icon--success {
      background: #d1fae5;
      color: #10b981;
    }

    .summary-card__icon--warning {
      background: #fef3c7;
      color: #f59e0b;
    }

    .summary-card__icon--gray {
      background: #f3f4f6;
      color: #6b7280;
    }

    .summary-card__content {
      flex: 1;
    }

    .summary-card__value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #111827;
      line-height: 1.2;
    }

    .summary-card__label {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .action-buttons {
      gap: 0.5rem;
    }

    .mb-6 { margin-bottom: 1.5rem; }
    .block { display: block; }
    
    .table-section {
      margin-top: 1rem;
    }

    .filter-bar {
      margin-bottom: 1rem;
      display: flex;
      gap: 1rem;
    }
    
    .filter-search {
      flex: 1;
    }

    .filter-date {
      width: 200px;
    }
  `],
})
export class UsersComponent implements AfterViewInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;
  @ViewChild('addUserDrawer') addUserDrawer!: AddUserDrawerComponent;

  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinedAt: '2024-01-15' },
    { id: 2, name: 'Alice Smith', email: 'alice@example.com', role: 'Editor', status: 'active', joinedAt: '2024-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'inactive', joinedAt: '2024-03-10' },
    { id: 4, name: 'Mary Kim', email: 'mary@example.com', role: 'Editor', status: 'active', joinedAt: '2024-04-05' },
    { id: 5, name: 'Tom Wilson', email: 'tom@example.com', role: 'Viewer', status: 'pending', joinedAt: '2024-05-12' },
    { id: 6, name: 'Sara Davis', email: 'sara@example.com', role: 'Admin', status: 'active', joinedAt: '2024-06-08' },
    { id: 7, name: 'Mike Brown', email: 'mike@example.com', role: 'Editor', status: 'inactive', joinedAt: '2024-07-22' },
    { id: 8, name: 'Lisa Taylor', email: 'lisa@example.com', role: 'Viewer', status: 'active', joinedAt: '2024-08-14' },
    { id: 9, name: 'Chris Lee', email: 'chris@example.com', role: 'Editor', status: 'active', joinedAt: '2024-09-03' },
    { id: 10, name: 'Emma White', email: 'emma@example.com', role: 'Admin', status: 'pending', joinedAt: '2024-10-18' },
  ];

  columns: any[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'joinedAt', label: 'Joined', sortable: true },
    { key: 'id', label: 'Actions', sortable: false },
  ];

  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Users' }
  ];

  searchTerm: string = '';
  selectedDate: string = '';

  constructor(
    private dialog: DialogService,
    private toast: ToastService,
    private cdr: ChangeDetectorRef
  ) { }

  get activeCount(): number {
    return this.users.filter(u => u.status === 'active').length;
  }

  get pendingCount(): number {
    return this.users.filter(u => u.status === 'pending').length;
  }

  get inactiveCount(): number {
    return this.users.filter(u => u.status === 'inactive').length;
  }

  get filteredUsers(): User[] {
    let result = this.users;

    // Filter by Search Term
    if (this.searchTerm) {
      const lowerTerm = this.searchTerm.toLowerCase();
      result = result.filter(user =>
        user.name.toLowerCase().includes(lowerTerm) ||
        user.email.toLowerCase().includes(lowerTerm) ||
        user.role.toLowerCase().includes(lowerTerm)
      );
    }

    // Filter by Date (Joined After)
    if (this.selectedDate) {
      const filterDate = new Date(this.selectedDate).getTime();
      result = result.filter(user => {
        const userDate = new Date(user.joinedAt).getTime();
        return userDate >= filterDate;
      });
    }

    return result;
  }

  filterUsers(term: string): void {
    this.searchTerm = term;
  }

  filterByDate(date: string): void {
    this.selectedDate = date;
  }

  resetFilter(): void {
    // This requires access to the child component to clear input, 
    // or we can rely on data binding if input supports it. 
    // For now, just clearing the term will update the list, 
    // but the input might stay populated unless we use ViewChild or two-way binding.
    // The PrismSearchInput uses local FormControl.
    // Ideally we re-render or call a method on it.
    // Simple workaround: reload users or just clear term.
    this.searchTerm = '';
    this.selectedDate = '';
    // To clear the actual input visual, we would need @ViewChild(PrismSearchInputComponent).
    // I'll add that ViewChild.
    if (this.searchInput) {
      this.searchInput.clear();
    }
  }

  @ViewChild(PrismSearchInputComponent) searchInput!: PrismSearchInputComponent;

  ngAfterViewInit(): void {
    this.columns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
      { key: 'status', label: 'Status', sortable: true, template: this.statusTemplate },
      { key: 'joinedAt', label: 'Joined', sortable: true },
      { key: 'id', label: 'Actions', sortable: false, template: this.actionsTemplate },
    ];
    this.cdr.detectChanges();
  }

  openAddUserDrawer(): void {
    this.addUserDrawer.open((data) => {
      const newUser: User = {
        id: Math.max(...this.users.map(u => u.id)) + 1,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status as 'active' | 'inactive' | 'pending',
        joinedAt: new Date().toISOString().split('T')[0],
      };
      this.users = [...this.users, newUser];
      this.toast.success('User added successfully!');
      this.cdr.detectChanges();
    });
  }

  editUser(user: User): void {
    const ref = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: { mode: 'edit', user },
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.toast.success('User updated successfully!');
      }
    });
  }

  deleteUser(user: User): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDanger: true,
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.users = this.users.filter((u) => u.id !== user.id);
        this.toast.success(`User "${user.name}" deleted`);
        this.cdr.detectChanges();
      }
    });
  }
}

