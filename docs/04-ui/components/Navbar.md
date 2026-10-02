# Navbar

## Responsibility

Primary site navigation: brand logo, section links, and mobile menu.

## When to use

Use once in the locale layout as the global top navigation.

## When not to use

Do not use for in-page section menus, sidebars, or secondary navigation.

## Layout

Inner content uses `Container` so logo and links align with the footer and with page content wrapped in `PageContainer`.

## Behaviour

- Stays sticky at the top; after scrolling past a moderate threshold, height and logo shrink, and border/shadow appear.
- Logo is larger at the top of the page and shrinks when compact.
- Compact transition uses a longer, decelerating ease (~700ms).
- On desktop, the active link background slides between items.
- On small screens, links open in a full-screen panel that slides in from the right, with a backdrop, body scroll lock, and a close control using `/icons/close.png`.

## Accessibility

- Exposes a labelled landmark for main navigation.
- Mobile toggle communicates expanded/collapsed state.
- Escape, backdrop click, and the close icon dismiss the open mobile menu.

## Internationalization

- Labels and aria strings come from `navigation` / `common` message namespaces.
- Links use `@/i18n/navigation` so the active locale is preserved.
