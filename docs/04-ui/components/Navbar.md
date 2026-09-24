# Navbar

## Responsibility

Primary site navigation: brand logo, section links, and mobile menu.

## When to use

Use once in the locale layout as the global top navigation.

## When not to use

Do not use for in-page section menus, sidebars, or secondary navigation.

## Behaviour

- Becomes fixed to the top after the page is scrolled past a short threshold; border and shadow appear only then.
- Logo is larger at the top of the page and shrinks when sticky.
- On desktop, the active link background slides between items.
- On small screens, links collapse behind a hamburger control.

## Accessibility

- Exposes a labelled landmark for main navigation.
- Mobile toggle communicates expanded/collapsed state.
- Escape closes the open mobile menu.

## Internationalization

- Labels and aria strings come from `navigation` / `common` message namespaces.
- Links use `@/i18n/navigation` so the active locale is preserved.
