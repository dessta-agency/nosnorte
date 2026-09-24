# I18N Rules

Mandatory rules for internationalization and translations.

## Core Rules

- Never hardcode user-visible text in components, pages, or constants when that text must change by locale.
- Put all translatable copy in `messages/{locale}.json` for every supported locale: `pt`, `en`, `es`, `fr`.
- Keep route pathnames/slugs in Portuguese. Translate UI labels only.
- Use `getTranslations` / `useTranslations` from `next-intl` (or `next-intl/server`) to read messages.
- Use `@/i18n/navigation` (`Link`, `usePathname`, `useRouter`) for in-app navigation so the locale prefix is preserved.
- Do not add inline translation maps inside components.
- When adding new copy, update **all four** locale files in the same change.

## Server vs Client Components

| Component type | API |
|----------------|-----|
| Server Component | `getTranslations` from `next-intl/server` |
| Client Component (`"use client"`) | `useTranslations` from `next-intl` |

In locale layouts/pages that should stay statically renderable, call `setRequestLocale(locale)` before using next-intl APIs.

## Naming Conventions

- **Namespaces**: lowercase words, no spaces (`footer`, `navigation`, `contact_form`)
- **Keys**: `snake_case` (`privacy_policy`, `company_name`)
- Prefer nested objects over overly flat keys when grouping related copy

Example:

```json
{
  "footer": {
    "privacy_policy": "Privacy Policy"
  }
}
```

Usage:

```tsx
const t = useTranslations("footer");
return <span>{t("privacy_policy")}</span>;
```

## Workflow When Creating Components With Text

1. List every user-visible string (labels, headings, buttons, aria labels, empty states, errors).
2. Choose an existing namespace or create a new one if the domain is distinct.
3. Add the keys to `messages/pt.json` first.
4. Add matching keys to `messages/en.json`, `messages/es.json`, and `messages/fr.json`.
5. Wire the component with `useTranslations` or `getTranslations`.
6. Verify the UI in all four locales (`/pt`, `/en`, `/es`, `/fr`).

## What Must Not Be Translated Here

- Brand-critical identifiers when they must stay fixed (for example the company legal name in copyright may still include the Portuguese legal form).
- Non-UI constants such as emails, phone numbers, map URLs, and asset paths.
- Route slugs (`/produtos`, `/historia`, …).

Contact values live in `constants/contacts.ts`. Contact **labels** and helper notes live in message files.

## Navigation Constants

`constants/navigation.ts` stores `href` + `translationKey` (not a hardcoded label). Components resolve the label through the `navigation` namespace.

## Language Switcher

Footer language links must:

- Switch locale while keeping the current pathname
- Indicate the active locale visually
- Use locale-aware navigation helpers

## Checklist

- [ ] No hardcoded user-facing strings remain in the changed UI
- [ ] Keys exist in `pt`, `en`, `es`, and `fr`
- [ ] Namespace/key naming follows conventions
- [ ] In-app links use `@/i18n/navigation`
- [ ] Active locale still works after navigation
