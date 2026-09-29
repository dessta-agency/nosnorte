# Footer

## Responsibility

Site-wide footer with brand logo, information links, company contacts, social links, copyright, and locale switcher.

## When to use

Use once in the locale layout, after page content, so it appears on every page.

## When not to use

Do not duplicate inside individual pages. Do not use for page-specific secondary content.

## Structure

- Logo: white logo (centred in the column)
- Information: internal pages, external Livro de Reclamações, plain text when no URL yet
- Contacts: icons and contact details (email, phone, WhatsApp, address, Google Maps)
- Follow us: Instagram and Facebook icon links
- Bottom: full-width divider aligned to `Container`; copyright left-aligned with language links (PT EN ES FR) on the right, preceded by a short vertical divider

## Behaviour

- All user-visible strings come from `messages/{locale}.json` via `getTranslations('footer')`.
- Language links switch locale while keeping the current pathname (`LanguageSwitcher`).
- The active locale is visually highlighted.
- Information links are defined in `FOOTER_INFO_LINKS` (`constants/contacts.ts`):
  - Internal: `/politica-de-qualidade`, `/politica-de-privacidade`, `/codigo-de-conduta`
  - External: Livro de Reclamações → [livroreclamacoes.pt](https://www.livroreclamacoes.pt/Inicio/)
  - No URL yet: Resolução Alternativa de Litígios (plain text)

## Notes

- Footer uses `Container` so side spacing matches the navbar and `PageContainer`.
- Footer colours use dedicated design tokens: `footer-bg`, `footer-border`, `footer-text`, `footer-text-secondary`, `footer-text-muted`, `footer-icon-bg`.
- Company contact data lives in `constants/contacts.ts` (`COMPANY_CONTACT`). Reuse that object anywhere in the app; do not hardcode contact details in components.
- Footer display structure for contacts uses `FOOTER_CONTACT_ITEMS` from the same file (labels/notes are translation keys).
- Social links use `FOOTER_SOCIAL_LINKS` from the same file (Instagram, Facebook).

