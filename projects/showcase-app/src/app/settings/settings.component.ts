import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  ButtonComponent,
  InputComponent,
  ContainerComponent,
  GridComponent,
  GridItemComponent,
  PrismFileUploadComponent,
} from 'prism-lib';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    InputComponent,
    ContainerComponent,
    GridComponent,
    GridItemComponent,
    PrismFileUploadComponent,
  ],
  template: `
    <prism-container maxWidth="full" paddingX="xl" paddingY="lg">
      <!-- Page Header -->
      <div class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="page-subtitle">Manage your account and preferences.</p>
      </div>

      <prism-grid columns="12" gap="xl">
        <!-- Main Content -->
        <prism-grid-item colSpan="8">
          <!-- Profile Settings -->
          <prism-card [elevation]="1" class="settings-card">
            <div prism-card-header>
              <h3 class="section-title">Profile Settings</h3>
            </div>
            <div prism-card-body>
              <prism-grid columns="2" gap="lg">
                <prism-grid-item colSpan="1">
                  <prism-input label="First Name" placeholder="John" value="John"></prism-input>
                </prism-grid-item>
                <prism-grid-item colSpan="1">
                  <prism-input label="Last Name" placeholder="Doe" value="Doe"></prism-input>
                </prism-grid-item>
                <prism-grid-item colSpan="2">
                  <prism-input label="Email Address" type="email" placeholder="john&#64;example.com" value="john&#64;example.com"></prism-input>
                </prism-grid-item>
                <prism-grid-item colSpan="2">
                  <prism-input label="Company" placeholder="Acme Inc." value="Acme Inc."></prism-input>
                </prism-grid-item>
              </prism-grid>
            </div>
            <div prism-card-actions>
              <prism-button variant="primary">Save Changes</prism-button>
            </div>
          </prism-card>

          <!-- Security Settings -->
          <prism-card [elevation]="1" class="settings-card">
            <div prism-card-header>
              <h3 class="section-title">Security</h3>
            </div>
            <div prism-card-body>
              <prism-grid columns="2" gap="lg">
                <prism-grid-item colSpan="1">
                  <prism-input label="Current Password" type="password" placeholder="••••••••"></prism-input>
                </prism-grid-item>
                <prism-grid-item colSpan="1">
                  <div></div>
                </prism-grid-item>
                <prism-grid-item colSpan="1">
                  <prism-input label="New Password" type="password" placeholder="••••••••"></prism-input>
                </prism-grid-item>
                <prism-grid-item colSpan="1">
                  <prism-input label="Confirm Password" type="password" placeholder="••••••••"></prism-input>
                </prism-grid-item>
              </prism-grid>
            </div>
            <div prism-card-actions>
              <prism-button variant="outline">Change Password</prism-button>
            </div>
          </prism-card>
        </prism-grid-item>

        <!-- Sidebar -->
        <prism-grid-item colSpan="4">
          <prism-card [elevation]="1">
            <div prism-card-header>
              <h3 class="section-title">Account Info</h3>
            </div>
            <div prism-card-body>
              <div class="account-info">
                <div class="account-info__avatar-upload">
                  <prism-file-upload 
                    [initialPreview]="avatarUrl"
                    accept="image/*"
                    hint="Update Avatar"
                    (filesSelected)="onAvatarSelected($event)">
                  </prism-file-upload>
                </div>
                <div class="account-info__name">John Doe</div>
                <div class="account-info__email">john&#64;example.com</div>
                <div class="account-info__role">Administrator</div>
              </div>
              <div class="account-stats">
                <div class="account-stat">
                  <span class="account-stat__label">Member Since</span>
                  <span class="account-stat__value">Jan 2024</span>
                </div>
                <div class="account-stat">
                  <span class="account-stat__label">Last Login</span>
                  <span class="account-stat__value">2 hours ago</span>
                </div>
                <div class="account-stat">
                  <span class="account-stat__label">Plan</span>
                  <span class="account-stat__value">Enterprise</span>
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

    .section-title {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
    }

    .settings-card {
      margin-bottom: 1.5rem;
    }

    .account-info {
      text-align: center;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #f3f4f6;
      margin-bottom: 1.5rem;
    }

    .account-info__avatar-upload {
      width: 100%;
      max-width: 200px;
      margin: 0 auto 1.5rem;
    }

    /* .account-info__avatar removed as it is replaced by file upload */

    .account-info__name {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
    }

    .account-info__email {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.25rem;
    }

    .account-info__role {
      display: inline-block;
      margin-top: 0.75rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: #eef2ff;
      color: #6366f1;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .account-stats {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .account-stat {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .account-stat__label {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .account-stat__value {
      font-size: 0.875rem;
      font-weight: 500;
      color: #111827;
    }
  `],
})
export class SettingsComponent {
  avatarUrl = 'https://api.dicebear.com/7.x/avataaars/svg?seed=John';

  onAvatarSelected(files: File[]) {
    if (files.length > 0) {
      // Simulate upload and update preview logic
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log('Avatar file selected:', file.name);
    }
  }
}
