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
- **i18n**: next-intl (locale-prefixed routes)
- **Carousel**: Embla Carousel (`embla-carousel-react`, `embla-carousel-autoplay`)
- **Linting**: ESLint with `eslint-config-next`

## Folder Structure

```
nosnorte/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Minimal root layout
│   ├── [locale]/           # Locale-prefixed routes (pt, en, es, fr)
│   │   ├── layout.tsx      # Locale layout (Navbar, Footer, providers)
│   │   ├── page.tsx        # Home
│   │   ├── ambientes/      # Ambientes (+ [slug] detail; slug = numeric id)
│   │   ├── produtos/       # Produtos
│   │   ├── showroom/       # Showroom
│   │   ├── historia/       # História
│   │   ├── contactos/      # Contactos
│   │   ├── politica-de-qualidade/
│   │   ├── politica-de-privacidade/
│   │   └── codigo-de-conduta/
│   └── globals.css         # Design tokens and global styles
├── components/
│   ├── ui/                 # Carousel and other low-level UI
│   ├── layout/             # Navbar, Footer, Container, PageContainer
│   └── features/           # HeroCarousel and domain features
├── constants/              # Fixed values (navigation, company contacts)
├── i18n/                   # next-intl routing, request config, navigation
├── messages/               # Translation JSON files (pt, en, es, fr)
├── proxy.ts                # Locale negotiation (next-intl)
├── public/
│   ├── logos/              # Brand logos
│   ├── icons/              # UI icons
│   └── images/             # Content images (home, showroom, backgrounds, …)
└── docs/                   # Documentation
```

## Responsibility Separation

### `app/`
Contains Next.js routing, layouts, and page-level components. Follows the App Router file conventions. Most pages wrap content in `PageContainer`. The home page uses a full-bleed `HeroCarousel` instead.

### `components/`
Reusable React components organized by category:
- **ui**: Low-level, reusable interface elements (`Button`, `IconButton`, `TextLink`, `Carousel`, `Modal`, `PageHero`, `Reveal`, `Skeleton`)
- **layout**: Structural components used across pages (`Navbar`, `Footer`, `BackToTop`, `Container`, `PageContainer`)
- **forms**: Form-related components and input wrappers
- **features**: Domain-specific, feature-focused components (`HeroCarousel`, `ProductsCatalog`, `ProductCard`, `ProductCardSkeleton`, `ProductOptionsModal`, `ShowroomGallery`, Ambientes intro/gallery/detail)

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
Fixed, immutable values (enums, UI constants, default values) that do not change between environments. Navigation links and company contact details live here (`navigation.ts`, `contacts.ts`). Navigation stores `translationKey` values resolved through message files; contact labels/notes are also translation keys.

### `public/`
Static assets served directly (images, fonts, icons). Brand logos under `public/logos/`; UI icons under `public/icons/`; homepage hero images under `public/images/home/`; shared Showroom/Ambientes media under `public/images/showroom/`.

## Layout Grid

- `Container` — shared horizontal width and side spacing (proportional to the viewport)
- `PageContainer` — page content wrapper using `Container`, with consistent top spacing
- `Navbar` inner content uses the same `Container` so navigation and pages stay aligned
- `Footer` uses the same `Container` and company contacts from `constants/contacts.ts`

Full-bleed visuals stay outside `Container` / `PageContainer` (homepage `HeroCarousel`).

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

**Brand colors, Manrope (`font-sans`), and DM Serif Display (`font-display`) are configured.** Status colors (`success`, `warning`, `error`) are defined in `globals.css`.

### Available tokens

| Token | Tailwind class examples |
|-------|------------------------|
| `background` / `foreground` | `bg-background`, `text-foreground` |
| `primary` | `bg-primary`, `text-primary` |
| `primary-hover` | `bg-primary-hover` |
| `secondary` | `bg-secondary`, `text-secondary` |
| `muted` | `text-muted` |
| `gray-light` | `bg-gray-light` |
| `surface` | `bg-surface` |
| `border` | `border-border` |
| `success` / `error` / `warning` | `text-success`, `text-error`, `text-warning` |
| `footer-bg` / `footer-border` / `footer-text` / `footer-text-secondary` / `footer-text-muted` / `footer-icon-bg` | `bg-footer-bg`, `text-footer-text-muted`, `bg-footer-icon-bg` |
| `font-sans` | `font-sans` |
| `font-display` | `font-display` |

Dark mode is not enabled by default. Add `@media (prefers-color-scheme: dark)` variants in `globals.css` per project if needed.

## Metadata and SEO

Default metadata is defined in `app/layout.tsx`.

- **Title**: `Nós-Norte - Materiais de Construção` (page template: `%s | Nós-Norte`)
- **Still TBD**: `description`, `metadataBase`, `openGraph`, and `twitter`

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
