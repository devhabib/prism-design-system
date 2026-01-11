import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'prism-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="prism-file-upload"
      [class.prism-file-upload--dragging]="isDragging"
      [class.prism-file-upload--disabled]="disabled"
      [class.prism-file-upload--has-file]="previewUrl || fileName"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
      (click)="fileInput.click()"
    >
      <input
        #fileInput
        type="file"
        [accept]="accept"
        [multiple]="multiple"
        class="prism-file-upload__input"
        (change)="onFileSelected($event)"
      />

      <div class="prism-file-upload__content">
        <!-- Preview Image -->
        <div *ngIf="previewUrl" class="prism-file-upload__preview">
          <img [src]="previewUrl" alt="File preview" />
          <div class="prism-file-upload__remove" (click)="removeFile($event)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        <!-- Placeholder State -->
        <ng-container *ngIf="!previewUrl">
          <div class="prism-file-upload__icon">
            <svg *ngIf="!isDragging" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            <svg *ngIf="isDragging" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
               <polyline points="7 10 12 15 17 10"/>
               <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          <div class="prism-file-upload__text">
            <span *ngIf="!isDragging; else dropText">
              <span class="prism-file-upload__link">Click to upload</span> or drag and drop
            </span>
            <ng-template #dropText>Drop file here</ng-template>
          </div>
          <div class="prism-file-upload__hint" *ngIf="hint">
            {{ hint }}
          </div>
        </ng-container>

        <!-- Loading State (Simulated) -->
        <div *ngIf="uploading" class="prism-file-upload__progress">
          <div class="prism-file-upload__progress-bar" [style.width.%]="progress"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prism-file-upload {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 160px;
      padding: 1.5rem;
      border: 2px dashed var(--color-border, #e5e7eb);
      border-radius: var(--radius-lg, 12px);
      background: var(--color-surface, white);
      cursor: pointer;
      transition: all 0.2s ease;
      overflow: hidden;
    }

    .prism-file-upload:hover {
      border-color: var(--color-primary, #3b82f6);
      background: var(--color-surface-elevated, #f9fafb);
    }

    .prism-file-upload--dragging {
      border-color: var(--color-primary, #3b82f6);
      border-style: solid;
      background: var(--color-primary-light, #eff6ff);
    }

    .prism-file-upload--has-file {
      border-style: solid;
      padding: 0;
    }

    .prism-file-upload--disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    .prism-file-upload__input {
      display: none;
    }

    .prism-file-upload__content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .prism-file-upload__preview {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .prism-file-upload__preview img {
      max-width: 100%;
      max-height: 200px;
      object-fit: cover;
      border-radius: var(--radius-md, 8px);
    }

    .prism-file-upload__remove {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 28px;
      height: 28px;
      background: rgba(0, 0, 0, 0.6);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .prism-file-upload__preview:hover .prism-file-upload__remove {
      opacity: 1;
    }

    .prism-file-upload__icon {
      margin-bottom: 0.75rem;
      color: var(--color-text-tertiary, #9ca3af);
    }

    .prism-file-upload--dragging .prism-file-upload__icon {
      color: var(--color-primary, #3b82f6);
    }

    .prism-file-upload__text {
      font-size: 0.875rem;
      color: var(--color-text-secondary, #6b7280);
      margin-bottom: 0.25rem;
    }

    .prism-file-upload__link {
      color: var(--color-primary, #3b82f6);
      font-weight: 500;
      text-decoration: none;
    }

    .prism-file-upload__hint {
      font-size: 0.75rem;
      color: var(--color-text-tertiary, #9ca3af);
    }

    .prism-file-upload__progress {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--color-border, #e5e7eb);
    }

    .prism-file-upload__progress-bar {
      height: 100%;
      background: var(--color-primary, #3b82f6);
      transition: width 0.3s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrismFileUploadComponent {
  @Input() accept: string = '*/*';
  @Input() multiple: boolean = false;
  @Input() hint: string = '';
  @Input() disabled: boolean = false;

  // Can be passed an initial image URL
  @Input() set initialPreview(url: string | null) {
    this.previewUrl = url;
  }

  @Output() filesSelected = new EventEmitter<File[]>();

  isDragging = false;
  previewUrl: string | null = null;
  fileName: string | null = null;
  uploading = false;
  progress = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) return;
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    if (this.disabled) return;

    if (event.dataTransfer?.files.length) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFiles(Array.from(input.files));
    }
  }

  removeFile(event: Event) {
    event.stopPropagation();
    this.previewUrl = null;
    this.fileName = null;
    this.filesSelected.emit([]);
    // Note: We can't clear the file input value programmatically in a reliable cross-browser way strictly with binding, 
    // but the emit([]) handles the logic. 
    this.cdr.markForCheck();
  }

  private handleFiles(files: File[]) {
    // Basic validation based on accept (simplified)
    // In a real app, strict MIME type checking would be better.

    this.filesSelected.emit(files);

    const file = files[0];
    this.fileName = file.name;

    // If it's an image, create a preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    } else {
      this.previewUrl = null; // No preview for non-images
      this.cdr.markForCheck();
    }
  }
}
