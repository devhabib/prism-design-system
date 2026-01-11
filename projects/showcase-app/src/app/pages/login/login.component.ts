import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  InputComponent,
  ButtonComponent,
  PrismCheckboxComponent,
  PrismAlertComponent
} from 'prism-lib';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    ButtonComponent,
    PrismCheckboxComponent,
    PrismAlertComponent
  ],
  template: `
    <div class="login-container">
      <!-- Header -->
      <div class="login-header">
        <h1 class="login-title">Sign in to Prism</h1>
        <p class="login-subtitle">Welcome back! Please enter your details.</p>
      </div>

      <!-- Alert (shown on validation error) -->
      <prism-alert 
        *ngIf="showError" 
        type="error" 
        title="Authentication Failed"
      >
        {{ errorMessage }}
      </prism-alert>

      <!-- Login Form -->
      <form class="login-form" (ngSubmit)="onSubmit()">
        <prism-input 
          label="Email" 
          type="email" 
          [(ngModel)]="email"
          name="email"
          placeholder="Enter your email"
        ></prism-input>

        <prism-input 
          label="Password" 
          type="password" 
          [(ngModel)]="password"
          name="password"
          placeholder="Enter your password"
        ></prism-input>

        <div class="login-options">
          <prism-checkbox [(ngModel)]="rememberMe" name="rememberMe" label="Remember me"></prism-checkbox>
          <a href="#" class="forgot-link">Forgot password?</a>
        </div>

        <prism-button 
          variant="primary" 
          size="lg" 
          type="submit"
          [style.width]="'100%'"
        >
          Sign In
        </prism-button>
      </form>

      <!-- Footer -->
      <div class="login-footer">
        <p>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 2rem;
      background: var(--color-surface, white);
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: var(--radius-lg, 12px);
      box-shadow: var(--shadow-md);
    }

    .login-header {
      text-align: center;
    }

    .login-title {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text-primary, #1f2937);
    }

    .login-subtitle {
      margin: 0.5rem 0 0;
      font-size: 0.875rem;
      color: var(--color-text-secondary, #6b7280);
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .login-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .forgot-link {
      font-size: 0.875rem;
      color: var(--color-primary, #3b82f6);
      text-decoration: none;
      white-space: nowrap;
    }

    .forgot-link:hover {
      text-decoration: underline;
    }

    .login-footer {
      text-align: center;
      font-size: 0.875rem;
      color: var(--color-text-secondary, #6b7280);
      padding-top: 1rem;
      border-top: 1px solid var(--color-border, #e5e7eb);
    }

    .login-footer a {
      color: var(--color-primary, #3b82f6);
      text-decoration: none;
      font-weight: 600;
    }

    .login-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showError = false;
  errorMessage = '';

  constructor(private router: Router) { }

  onSubmit() {
    // Simple validation to demonstrate alert component
    if (!this.email || !this.password) {
      this.showError = true;
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    if (!this.email.includes('@')) {
      this.showError = true;
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    // Demo: Show error for any credentials (since this is just a UI demo)
    this.showError = true;
    this.errorMessage = 'Invalid credentials. This is a demo - try navigating to /dashboard instead.';

    // In a real app, you would authenticate here
    // this.router.navigate(['/dashboard']);
  }
}
