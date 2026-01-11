# Prism Design System

Prism is a high-performance, aesthetically rich UI component library built for modern Angular applications. It emphasizes visual excellence through glassmorphism, smooth animations, and a robust token-based design system.

## 🚀 Technlogy Stack

- **Angular 20**: Leveraging the latest features and performance enhancements of the Angular framework.
- **Storybook 8**: Fully documented component sandbox with interactive demos and autodoc prop tables.
- **SCSS**: Modular styling using a global design token system for consistent branding.
- **TypeScript**: Strictly typed components and services for a reliable developer experience.

## 📁 Project Structure

The workspace follows a monorepo structure:

- **`projects/prism-lib`**: The heart of the design system. Contains all reusable UI components, services, and tokens.
- **`projects/showcase-app`**: A demonstration application showcasing the library components in real-world scenarios.
- **`.storybook`**: Global Storybook configuration, including decorators for Angular animations and global styles.

## 🛠️ Key Components & Features

### Core Components
- **PrismButton**: Multi-variant button system (Primary, Secondary, Outline, Ghost, Danger) with loading states and size mappings.
- **PrismDrawer**: Accessible slide-out overlay for navigation and side-actions.
- **PrismDialog**: A programmatic service-based modal system for confirmations and alerts, featuring focus trapping and smooth scaling animations.
- **PrismToast**: A stacking notification system with glassmorphism effects, managed via `PrismToastService`.
- **PrismTable**: Data-dense table component with stylized headers and grid layouts.
- **PrismCard**, **PrismInput**, **PrismSelect**: Foundational building blocks for data entry and display.

### Infrastructure Features
- **Global Error Listening**: Built-in global error handling provided at the application level.
- **Animation Support**: Pre-configured Angular animations support in both the app and Storybook.
- **Service-Based APIs**: Overlays (Dialogs/Toasts) are managed programmatically via dedicated services to reduce template clutter.

## 🏁 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- Angular CLI: `npm install -g @angular/cli`

### Installation
Clone the repository and install dependencies using the legacy peer deps flag due to the cutting-edge Angular 20 environment:
```bash
npm install --legacy-peer-deps
```

### Running the Development Environment

**Start Storybook (Component Documentation)**
```bash
npm run storybook
```

**Start Showcase Application**
```bash
npm start
```

## 📚 Component Documentation
Each component is documented in Storybook with:
- **Playground**: Interactive controls to test different props in real-time.
- **Docs Tab**: Auto-generated prop tables from JSDoc comments and usage snippets.
- **Service Demos**: Dedicated stories for service-based components (Toast/Dialog) to simulate programmatic triggers.

---
Built with ❤️ by the Prism Team.
