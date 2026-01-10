# Prism Design System

![Angular](https://img.shields.io/badge/Angular-19+-DD0031?style=flat-square&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-8.0-FF4785?style=flat-square&logo=storybook&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> An enterprise-grade, accessible component library built to demonstrate advanced Angular patterns and modern SCSS architecture.

---

## ✨ Features

- **4 Production-Ready Components** — Button, Card, Input, Table
- **Full Reactive Forms Support** — ControlValueAccessor implementation
- **Theming via CSS Custom Properties** — Easy customization
- **Storybook Documentation** — Interactive component playground

---

## 🏗️ Architecture Highlights

| Pattern | Implementation |
|---------|----------------|
| **ControlValueAccessor** | `PrismInput` integrates seamlessly with `[formControl]` and `[(ngModel)]` using `@Self() @Optional() NgControl` injection |
| **SCSS 7-1 Pattern** | Organized abstracts (`_variables`, `_tokens`, `_mixins`) with CSS Custom Properties for theming |
| **Content Projection** | `PrismCard` uses multi-slot projection (`prism-card-header`, `prism-card-body`, `prism-card-actions`) |
| **Generic Data Tables** | `PrismTable` accepts `TableColumn[]` config with `TemplateRef` support for custom cell rendering |
| **Dumb Pagination** | Table exposes `pageChange` output — parent handles logic |

---

## 🚀 Quick Start

```bash
# Clone and install
git clone https://github.com/devhabib/prism-design-system.git
cd prism-design-system
npm install

# Run Storybook
npm run storybook
# → http://localhost:6006

# Build the library
npm run build:lib
```

---

## 📦 Installation (in your project)

```bash
npm install prism-lib
```

```typescript
// app.config.ts or standalone component
import { ButtonComponent, CardComponent, InputComponent, TableComponent } from 'prism-lib';

@Component({
  standalone: true,
  imports: [ButtonComponent, CardComponent, InputComponent, TableComponent],
  // ...
})
```

---

## 🎨 Component Showcase

### Button

```html
<prism-button variant="primary" size="md">Submit</prism-button>
<prism-button variant="outline" [loading]="true">Loading...</prism-button>
```

### Card (Content Projection)

```html
<prism-card [elevation]="2" [hoverable]="true">
  <prism-card-header>
    <h3>Card Title</h3>
  </prism-card-header>
  <prism-card-body>
    <p>Card content goes here.</p>
  </prism-card-body>
  <prism-card-actions>
    <prism-button variant="primary">Action</prism-button>
  </prism-card-actions>
</prism-card>
```

### Input (Reactive Forms)

```html
<prism-input 
  label="Email" 
  type="email"
  [formControl]="emailControl"
>
  <svg prismPrefix><!-- icon --></svg>
</prism-input>
```

### Table (Custom Templates)

```html
<!-- Define status badge template -->
<ng-template #statusBadge let-row>
  <span class="badge" [class.active]="row.status === 'Active'">
    {{ row.status }}
  </span>
</ng-template>

<!-- Use in table -->
<prism-table 
  [data]="users" 
  [columns]="[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', template: statusBadge }
  ]"
  [showPagination]="true"
  [totalItems]="100"
  [pageSize]="10"
  (pageChange)="onPageChange($event)"
></prism-table>
```

---

## 📁 Project Structure

```
prism/
├── projects/
│   ├── prism-lib/           # Component library
│   │   ├── src/lib/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── input/
│   │   │   └── table/
│   │   └── src/styles/      # SCSS 7-1 architecture
│   │       ├── abstracts/   # _variables, _tokens, _mixins
│   │       └── base/        # _reset
│   └── showcase-app/        # Demo application
└── .storybook/              # Storybook configuration
```

---

## 🛠️ Development

```bash
# Run tests
npm test

# Build production library
npm run build:lib

# Lint
npm run lint
```

---

## 📄 License

MIT © 2026 Habib
