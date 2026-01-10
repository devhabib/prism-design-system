/**
 * Toast notification types and interfaces
 */

/**
 * Types of toast notifications
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Configuration for a toast notification
 */
export interface ToastConfig {
  /** Message to display */
  message: string;

  /** Type of toast (affects styling) */
  type: ToastType;

  /** Duration in milliseconds before auto-dismiss (default: 3000) */
  duration?: number;

  /** Whether to show a close button */
  dismissible?: boolean;
}

/**
 * Internal reference to a toast instance
 */
export interface ToastRef {
  /** Unique identifier */
  id: string;

  /** Configuration */
  config: ToastConfig;

  /** Dismiss this toast */
  dismiss: () => void;
}
