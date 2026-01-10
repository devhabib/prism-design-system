import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, componentWrapperDecorator } from '@storybook/angular';
import { Component, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { TableComponent, TableColumn } from './table.component';
import { CommonModule } from '@angular/common';

/**
 * Table Component - Generic data table with sorting, pagination, and custom templates
 * 
 * Features:
 * - Generic data input with column configuration
 * - Custom cell templates via TemplateRef (the "magic" part!)
 * - Sortable columns with visual indicators
 * - Pagination (dumb component pattern)
 * - Striped, hoverable, and compact variants
 */
const meta: Meta<TableComponent> = {
  title: 'Data Display/Table',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    compact: { control: 'boolean' },
    loading: { control: 'boolean' },
    emptyMessage: { control: 'text' },
    showPagination: { control: 'boolean' },
    totalItems: { control: 'number' },
    pageSize: { control: 'number' },
    currentPage: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<TableComponent>;

// ============================================
// Mock Data
// ============================================
const MOCK_USERS = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Pending' },
];

const BASIC_COLUMNS: TableColumn[] = [
  { key: 'id', label: 'ID', width: '60px', align: 'center' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status' },
];

// ============================================
// Default Table
// ============================================
export const Default: Story = {
  args: {
    data: MOCK_USERS,
    columns: BASIC_COLUMNS,
    striped: false,
    hoverable: true,
    compact: false,
  },
};

// ============================================
// Wrapper Component for TemplateRef Demo
// ============================================
@Component({
  selector: 'user-management-demo',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <!-- Define the status badge template -->
    <ng-template #statusBadge let-row>
      <span 
        class="badge"
        [class.badge--active]="row.status === 'Active'"
        [class.badge--inactive]="row.status === 'Inactive'"
        [class.badge--pending]="row.status === 'Pending'"
      >
        {{ row.status }}
      </span>
    </ng-template>

    <!-- The table with columns including the template -->
    <prism-table 
      [data]="data" 
      [columns]="columnsWithTemplate"
      [striped]="true"
      [hoverable]="true"
    ></prism-table>
    
    <p style="margin-top: 1rem; font-size: 0.75rem; color: #6b7280;">
      ✨ The "Status" column uses a custom TemplateRef to render styled badges!
    </p>
  `,
  styles: [`
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    .badge--active {
      background: #dcfce7;
      color: #166534;
    }
    .badge--inactive {
      background: #f3f4f6;
      color: #6b7280;
    }
    .badge--pending {
      background: #fef3c7;
      color: #92400e;
    }
  `],
})
class UserManagementDemoComponent implements AfterViewInit {
  @ViewChild('statusBadge') statusBadge!: TemplateRef<any>;

  data = MOCK_USERS;
  columnsWithTemplate: TableColumn[] = [];

  private baseColumns: TableColumn[] = [
    { key: 'id', label: 'ID', width: '60px', align: 'center' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status' },
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    // Inject the template into the status column
    this.columnsWithTemplate = this.baseColumns.map(col =>
      col.key === 'status' ? { ...col, template: this.statusBadge } : col
    );
    this.cdr.detectChanges();
  }
}

// ============================================
// 🔥 User Management with Custom Template
// ============================================
export const UserManagement: Story = {
  name: '🔥 User Management (Custom Template)',
  decorators: [
    moduleMetadata({
      imports: [UserManagementDemoComponent],
    }),
  ],
  render: () => ({
    template: `<user-management-demo></user-management-demo>`,
  }),
};

// ============================================
// Striped Variant
// ============================================
export const Striped: Story = {
  args: {
    data: MOCK_USERS,
    columns: BASIC_COLUMNS,
    striped: true,
    hoverable: true,
  },
};

// ============================================
// With Pagination
// ============================================
export const WithPagination: Story = {
  name: 'With Pagination',
  render: () => {
    // Simulated paginated data (page 1 of 3)
    const pageData = MOCK_USERS.slice(0, 2);

    return {
      props: {
        data: pageData,
        columns: BASIC_COLUMNS.slice(0, 4),
        currentPage: 1,
        totalItems: 5,
        pageSize: 2,
      },
      template: `
        <prism-table 
          [data]="data" 
          [columns]="columns"
          [showPagination]="true"
          [totalItems]="totalItems"
          [pageSize]="pageSize"
          [currentPage]="currentPage"
          (pageChange)="onPageChange($event)"
        ></prism-table>
        
        <p style="margin-top: 1rem; font-size: 0.75rem; color: #6b7280;">
          Showing 2 items per page (total: 5 items, 3 pages)
        </p>
      `,
    };
  },
};

// ============================================
// Loading State
// ============================================
export const Loading: Story = {
  args: {
    data: MOCK_USERS,
    columns: BASIC_COLUMNS,
    loading: true,
  },
};

// ============================================
// Empty State
// ============================================
export const Empty: Story = {
  args: {
    data: [],
    columns: BASIC_COLUMNS,
    emptyMessage: 'No users found. Try adjusting your filters.',
  },
};

// ============================================
// Compact Mode
// ============================================
export const Compact: Story = {
  args: {
    data: MOCK_USERS,
    columns: BASIC_COLUMNS,
    compact: true,
    striped: true,
  },
};

// ============================================
// Sortable (Click Headers)
// ============================================
export const Sortable: Story = {
  name: 'Sortable (Click Headers)',
  render: () => ({
    props: {
      data: MOCK_USERS,
      columns: BASIC_COLUMNS,
    },
    template: `
      <prism-table 
        [data]="data" 
        [columns]="columns"
        [striped]="true"
        (sortChange)="onSort($event)"
      ></prism-table>
      <p style="margin-top: 1rem; font-size: 0.75rem; color: #6b7280;">
        Click on "Name", "Email", or "Role" headers to sort
      </p>
    `,
  }),
};
