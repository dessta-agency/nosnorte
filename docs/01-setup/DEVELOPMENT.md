# Development

How to run the project locally and basic workflow.

## Prerequisites

- Node.js 20+
- npm (comes with Node.js)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Available Commands

- `npm run dev` — Start development server with hot reload
- `npm run build` — Create production build
- `npm start` — Run production build locally
- `npm run lint` — Run ESLint to check code quality

## Development Workflow

1. Start the dev server (`npm run dev`)
2. Make changes to files in `app/`, `components/`, or other source folders
3. Changes hot-reload automatically in the browser
4. Run `npm run lint` before committing to catch issues
5. Build with `npm run build` to verify production readiness

## Project Structure

- `app/` — Next.js App Router (pages, layouts, routes)
- `components/` — Reusable React components
- `context/` — React Context providers
- `services/` — API calls and external integrations
- `lib/` — Library setup and utilities
- `hooks/` — Custom React hooks
- `types/` — TypeScript type definitions
- `utils/` — Helper functions
- `config/` — Application configuration
- `constants/` — Fixed values and enums
- `public/` — Static assets
- `docs/` — Project documentation

## Key Files

- `next.config.ts` — Next.js configuration
- `tsconfig.json` — TypeScript configuration
- `postcss.config.mjs` — PostCSS configuration (Tailwind)
- `eslint.config.mjs` — ESLint configuration
- `.cursorrules` — AI assistant rules

## New Project Setup

When starting a new project from this starter, customize the following:

- [ ] **Design tokens** — Update colors and fonts in `app/globals.css`
- [ ] **Metadata** — Update `title`, `description`, and uncomment `metadataBase`, `openGraph`, and `twitter` in `app/layout.tsx`
- [ ] **Favicon** — Add project icon to `app/` (see below)
- [ ] **Project context** — Fill in `docs/00-overview/PROJECT_CONTEXT.md`

### Favicon

No favicon is included in the starter. Add one per project using either:

- `app/favicon.ico` — classic favicon
- `app/icon.png` — app icon (Next.js generates the required sizes)
- `app/apple-icon.png` — Apple touch icon (optional)

Place the file directly in `app/`. Next.js serves it automatically.

### Images and Performance

Use `next/image` for all content images (photos, illustrations, logos in page content):

```tsx
import Image from "next/image";

<Image
  src="/example.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

- Store static images in `public/` and reference them by path (e.g. `/example.jpg`)
- Always provide meaningful `alt` text
- Always set `width` and `height` (or use `fill` with a sized parent container)
- Do not use `<img>` for content images unless there is a documented exception
