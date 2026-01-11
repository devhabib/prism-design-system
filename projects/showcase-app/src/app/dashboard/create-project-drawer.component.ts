import { Component, ViewChild, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  ContainerComponent,
  GridComponent,
  GridItemComponent,
  PrismStepperComponent,
  PrismTagsInputComponent,
  PrismFileUploadComponent
} from 'prism-lib';

@Component({
  selector: 'app-create-project-drawer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    ContainerComponent,
    GridComponent,
    GridItemComponent,
    PrismStepperComponent,
    PrismTagsInputComponent,
    PrismFileUploadComponent
  ],
  template: `
    <div class="drawer-overlay" *ngIf="isOpen" (click)="close()">
      <div 
        class="drawer-content" 
        (click)="$event.stopPropagation()"
        [class.drawer-content--open]="isOpen"
      >
        <div class="drawer-header">
          <h2 class="drawer-title">New Project</h2>
          <button class="close-btn" (click)="close()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="drawer-stepper">
          <prism-stepper [steps]="steps" [currentStep]="currentStep"></prism-stepper>
        </div>

        <div class="drawer-body">
          <!-- Step 1: Details -->
          <div *ngIf="currentStep === 0" class="step-content">
            <h3 class="step-title">Project Details</h3>
            <p class="step-desc">Enter basic information about your new project.</p>
            
            <div class="form-group">
              <prism-input label="Project Name" placeholder="e.g. My Awesome App" [(ngModel)]="projectData.name"></prism-input>
            </div>
            
            <div class="form-group">
              <label class="form-label">Description</label>
              <textarea 
                class="form-textarea" 
                rows="4" 
                placeholder="Describe your project..."
                [(ngModel)]="projectData.description"
              ></textarea>
            </div>
          </div>

          <!-- Step 2: Tags -->
          <div *ngIf="currentStep === 1" class="step-content">
            <h3 class="step-title">Technologies</h3>
            <p class="step-desc">Add tags for the tech stack you'll be using.</p>
            
            <div class="form-group">
              <label class="form-label">Tech Stack</label>
              <prism-tags-input 
                [(ngModel)]="projectData.tags"
                placeholder="Type and press Enter (e.g. Angular, Node.js)"
              ></prism-tags-input>
            </div>
          </div>

          <!-- Step 3: Files -->
          <div *ngIf="currentStep === 2" class="step-content">
            <h3 class="step-title">Assets</h3>
            <p class="step-desc">Upload any initial design files or logos.</p>
            
            <div class="form-group">
              <prism-file-upload
                accept="image/*,.pdf"
                [multiple]="true"
                hint="Drag and drop or click to upload"
                (filesSelected)="onFilesSelected($event)"
              ></prism-file-upload>
            </div>

            <div *ngIf="projectData.files.length" class="file-list">
              <div *ngFor="let file of projectData.files" class="file-item">
                <span class="file-icon">📄</span>
                <span class="file-name">{{ file.name }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="drawer-footer">
          <prism-button 
            variant="ghost" 
            (click)="prevStep()" 
            [disabled]="currentStep === 0"
          >
            Back
          </prism-button>
          
          <prism-button 
            *ngIf="currentStep < steps.length - 1" 
            variant="primary" 
            (click)="nextStep()"
          >
            Next
          </prism-button>
          
          <prism-button 
            *ngIf="currentStep === steps.length - 1" 
            variant="primary" 
            (click)="finish()"
          >
            Create Project
          </prism-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      justify-content: flex-end;
    }

    .drawer-content {
      width: 100%;
      max-width: 500px;
      height: 100%;
      background: var(--color-surface, white);
      box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    .drawer-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--color-border, #e5e7eb);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: var(--color-text-primary, #111827);
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text-secondary, #6b7280);
      padding: 0.25rem;
      display: flex;
    }
    
    .close-btn:hover {
      color: var(--color-text-primary, #111827);
    }

    .drawer-stepper {
      padding: 1.5rem 2rem;
      background: var(--color-surface-elevated, #f9fafb);
      border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
    }

    .step-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
      color: var(--color-text-primary, #111827);
    }
    
    .step-desc {
      font-size: 0.875rem;
      color: var(--color-text-secondary, #6b7280);
      margin: 0 0 2rem 0;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-primary, #111827);
      margin-bottom: 0.5rem;
    }

    .form-textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: var(--radius-md, 6px);
      font-family: inherit;
      font-size: 0.875rem;
      resize: vertical;
    }
    
    .form-textarea:focus {
      outline: none;
      border-color: var(--color-primary, #3b82f6);
      box-shadow: 0 0 0 3px var(--color-primary-light, #bfdbfe);
    }

    .file-list {
      margin-top: 1rem;
      border: 1px solid var(--color-border, #e5e7eb);
      border-radius: var(--radius-md, 6px);
      overflow: hidden;
    }

    .file-item {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--color-border, #e5e7eb);
      display: flex;
      align-items: center;
      font-size: 0.875rem;
    }

    .file-item:last-child {
      border-bottom: none;
    }

    .file-icon {
      margin-right: 0.5rem;
    }

    .drawer-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--color-border, #e5e7eb);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--color-surface, white);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectDrawerComponent {
  isOpen = false;

  steps = ['Details', 'Tags', 'Files'];
  currentStep = 0;

  projectData = {
    name: '',
    description: '',
    tags: [] as string[],
    files: [] as File[]
  };

  constructor(private cdr: ChangeDetectorRef) { }

  open() {
    this.isOpen = true;
    this.currentStep = 0;
    this.resetForm();
    this.cdr.markForCheck();
  }

  close() {
    this.isOpen = false;
    this.cdr.markForCheck();
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      if (this.validateStep()) {
        this.currentStep++;
      }
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  validateStep(): boolean {
    if (this.currentStep === 0) {
      return !!this.projectData.name;
    }
    return true; // Other steps optional for demo
  }

  onFilesSelected(files: File[]) {
    this.projectData.files = [...this.projectData.files, ...files];
  }

  finish() {
    console.log('Project Created:', this.projectData);
    this.close();
    // Here we would emit an event or call a service
  }

  private resetForm() {
    this.projectData = {
      name: '',
      description: '',
      tags: [],
      files: []
    };
  }
}
