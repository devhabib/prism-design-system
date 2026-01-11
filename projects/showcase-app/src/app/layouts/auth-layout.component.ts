import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from 'prism-lib';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, ContainerComponent],
  template: `
    <div class="auth-layout">
      <prism-container size="sm" class="auth-container">
        <router-outlet></router-outlet>
      </prism-container>
    </div>
  `,
  styles: [`
    .auth-layout {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: var(--color-background, #f3f4f6);
      padding: 2rem 1rem;
    }

    .auth-container {
      width: 100%;
      max-width: 400px;
    }
  `]
})
export class AuthLayoutComponent { }
