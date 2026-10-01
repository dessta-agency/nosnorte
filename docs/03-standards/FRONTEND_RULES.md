# FRONTEND_RULES

## Part A — General Principles (Fixed)

- Clarity is more important than abstraction.

- Code must be easy to read before being easy to reuse.

- Prefer composition over inheritance or implicit coupling.

- Components must have a single, clear responsibility.

- Avoid duplicated logic; when real repetition appears, extract a pattern.

- Accessibility is not optional and must be considered from the start.

- Performance should be considered, but premature optimization must be avoided.

- Non-obvious decisions must be documented.

## Part B — Project-Specific Rules

- Keep routing, layouts, and route-level files in `app/`. Locale-aware pages live under `app/[locale]/`. Do not move `app/` under another directory.
- Follow [I18N Rules](I18N_RULES.md) for all user-visible copy and locale-aware navigation.

- Place reusable React components in `components/` using the existing subfolders: `ui/`, `layout/`, `forms/`, and `features/`.

- Place React Context providers in `context/`, API calls in `services/`, custom hooks in `hooks/`, shared types in `types/`, helpers in `utils/`, environment-specific config in `config/`, fixed values in `constants/`, and library setup in `lib/`.

- Import project modules with the `@/*` alias defined in `tsconfig.json`. Do not add new path aliases without updating configuration.

- Write application code in TypeScript (`.ts` / `.tsx`) with `strict` mode enabled.

- Style UI with Tailwind CSS utility classes. Define design tokens (colors, typography) in `app/globals.css` via `@theme`; use semantic Tailwind classes (`bg-primary`, `text-error`, etc.), not hardcoded values.

- Use `PageContainer` on every page except the homepage. Navbar, Footer, and `PageContainer` share `Container` for horizontal alignment. Full-bleed heroes share `FULL_BLEED_HERO_INSET` (`constants/layout.ts`) — see [Style Guide](STYLE_GUIDE.md). Surface cards (product cards, contact panels, etc.) share `SURFACE_CARD` from the same file. Ambientes and Showroom gallery tiles share `GALLERY_MEDIA_RADIUS` and `GALLERY_MEDIA_GAP`.

- Use `next/image` for content images; store static assets in `public/` and always provide `alt` text and dimensions.

- Customize metadata in `app/layout.tsx` per project; no favicon is included by default — add `app/favicon.ico` or `app/icon.png` when needed.

- Keep static assets in `public/`.

- Run `npm run lint` before finishing frontend changes. Resolve issues reported by the configured `eslint-config-next` rules.

- Keep project documentation in `docs/` only. Do not add documentation files inside `app/`, `components/`, or other source folders.