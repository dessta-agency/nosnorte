# How It Works

High-level functional description of the project (no technical details).

## Main Flows

### Homepage hero

1. Visitor opens the home page.
2. A full-width image carousel shows rotating slides with a short headline, supporting text, and a call-to-action.
3. The visitor can change slides via the bottom indicators or wait for automatic rotation.

### Products catalog

1. Visitor opens the products page.
2. The page shows a search field, sort control, filters, and a grid of product cards.
3. Each card shows brand, name, reference, optional “more options” info, availability (in stock or on order), and price or “on request”.
4. Clicking a product opens a dialog to request information (name, email, and optional message). Submitting is UI-only until email integration exists.
5. Products with extra options also show “View options”, which opens a dialog with image, details, quantity, optional color choices, product information, and a link to request information. Products without extra options have no “View options” button.
6. The visitor can filter, search, sort, and paginate the catalog (previous/next use arrow icons). Extra construction filters (finish, material, size, etc.) work against simulated product attributes until a real catalog API exists. Filter groups with active options keep a red title and show a count badge. When results change, only leaving cards fade out and only new cards fade in — cards that stay do not blink (reduced motion skips this).

### Ambientes inspiration

1. Visitor opens the Ambientes page (bathroom inspiration only).
2. A full-bleed hero introduces the section, followed by an intro with a short description, bathroom-style cards, and a link to the gallery.
3. A “Galeria” section lists curated bathroom environments in an asymmetric editorial layout. Each tile shows a name and short text and fades in as it scrolls into view.
4. Opening an environment shows a detail page with a large cover image, description, a materials list (type and name only, no product links), additional images, and a back link to Ambientes.
5. Detail URLs use stable numeric identifiers (for example `/ambientes/1`).

### Showroom gallery

1. Visitor opens the Showroom page.
2. A full-bleed hero introduces the section.
3. Below the hero, a masonry photo gallery lists every image from the shared showroom media folder. The first tiles are visible immediately; later tiles fade in as the visitor scrolls.
4. Clicking a photo opens a lightbox with previous/next navigation (and keyboard arrows). The lightbox has no gray panel behind the image.
5. Adding or removing image files in the showroom media folder updates the Showroom listing automatically. Ambientes uses the same media folder but a separate curated catalog, so it does not change from file add/remove alone.

### Back to top

1. After scrolling further down a page (past most of the first viewport), a control appears in the bottom-right corner.
2. Clicking it scrolls smoothly back to the top of the page.

## Key States

TBD

## Edge Cases

TBD

## Rules (Strict)

- Describe ONLY functional behavior.

- Do NOT include technical implementation details.

- Do NOT describe architecture, libraries, or code structure.

- Focus on what the system does, not how it is built.

- Only include flows that are explicitly known.

- If a flow is incomplete or unclear, keep it as `TBD`.

- Do NOT infer missing steps or behaviors.

- Use simple, clear, and high-level descriptions.
