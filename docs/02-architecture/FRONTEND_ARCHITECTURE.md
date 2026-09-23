# Frontend Architecture

Frontend architecture and overall structure.

## Overview

This is a Next.js 16 application using the App Router with TypeScript, React 19, and Tailwind CSS.

The architecture follows a folder-based organization where responsibilities are separated by domain and concern.

## Technology Stack

- **Framework**: Next.js 16.3.4 (App Router)
- **UI Library**: React 19.2.8
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint with `eslint-config-next`

## Folder Structure

```
starter-kit/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── ui/                 # UI primitives (buttons, inputs, cards)
│   ├── layout/             # Layout components (header, footer)
│   ├── forms/              # Form components
│   └── features/           # Feature-specific components
├── context/                # React Context providers
├── services/               # API calls and external integrations
├── lib/                    # Library setup and configuration
├── hooks/                  # Custom React hooks
├── types/                  # Shared TypeScript definitions
├── utils/                  # Helper functions
├── config/                 # Application configuration
├── constants/              # Fixed values and enums
├── public/                 # Static assets
└── docs/                   # Documentation
```

## Responsibility Separation

### `app/`
Contains Next.js routing, layouts, and page-level components. Follows the App Router file conventions.

### `components/`
Reusable React components organized by category:
- **ui**: Low-level, reusable interface elements
- **layout**: Structural components used across pages
- **forms**: Form-related components and input wrappers
- **features**: Domain-specific, feature-focused components

### `context/`
React Context providers for global state (authentication, theme, user preferences). Each context encapsulates state and related logic.

### `services/`
API communication layer and external integrations. Contains HTTP client logic, API endpoint calls, and third-party service wrappers.

### `lib/`
Third-party library initialization and configuration (e.g., axios setup, analytics initialization).

### `hooks/`
Custom React hooks that encapsulate reusable stateful logic.

### `types/`
Shared TypeScript interfaces and type definitions used across the application.

### `utils/`
Pure functions for data transformation, formatting, validation, and other helpers.

### `config/`
Application configuration that may vary by environment (feature flags, runtime settings, environment-specific values).

### `constants/`
Fixed, immutable values (enums, UI constants, default values) that do not change between environments.

### `public/`
Static assets served directly (images, fonts, icons).

## Import Strategy

All project modules use the `@/*` path alias configured in `tsconfig.json`:

```typescript
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import type { User } from '@/types/user'
```

This alias resolves to the project root (`./`).

## Rendering Strategy

Next.js 16 App Router defaults to Server Components. Client components must use `"use client"` directive explicitly.

Current approach:
- Layouts and static pages: Server Components (default)
- Interactive UI: Client Components (marked with `"use client"`)

## Styling Approach

Tailwind CSS utility classes are used for styling. Design tokens (colors, typography) are defined in `app/globals.css` using `:root` CSS variables and the Tailwind v4 `@theme inline` directive.

**Current values are placeholders** — each project should customize colors and fonts to match its visual identity.

### Available tokens

| Token | Tailwind class examples |
|-------|------------------------|
| `background` / `foreground` | `bg-background`, `text-foreground` |
| `primary` | `bg-primary`, `text-primary` |
| `secondary` | `bg-secondary`, `text-secondary` |
| `muted` | `text-muted` |
| `border` | `border-border` |
| `success` / `error` / `warning` | `text-success`, `text-error`, `text-warning` |
| `font-sans` / `font-mono` | `font-sans`, `font-mono` |

Dark mode is not enabled by default. Add `@media (prefers-color-scheme: dark)` variants in `globals.css` per project if needed.

## Metadata and SEO

Default metadata is defined in `app/layout.tsx` with placeholder values. Each project must update:

- `title` and `description`
- `metadataBase` (required for correct Open Graph URLs)
- `openGraph` and `twitter` blocks when sharing matters

Page-level metadata can override defaults using the `metadata` export or `generateMetadata` in individual route files.

No favicon is included. Add `app/favicon.ico` or `app/icon.png` per project.

## Performance

Use `next/image` for all content images. It provides automatic optimization, lazy loading, and responsive sizing.

```tsx
import Image from "next/image";

<Image src="/photo.jpg" alt="Description" width={800} height={600} />
```

Rules:

- Static assets go in `public/`
- Always include `alt` text
- Always set dimensions (`width`/`height`) or use `fill` with a positioned parent
- Avoid raw `<img>` tags for content images
