# Limitations

Known limitations and consciously accepted trade-offs.

## Product catalog data

- Product list data currently comes from DummyJSON (external mock API), not from a Nós-Norte catalog backend.
- Card fields such as reference, availability, “more options”, price-on-request, SKU, unit, and color options are enriched locally for UI purposes; they are not authoritative business data.

## Add to order

- “Add to order” only shows temporary UI feedback on the button. There is no cart, order persistence, or backend submission yet.

## Status badge color for “on order”

- The “on order” badge uses a fixed amber color (`#AD7225`) rather than a shared design token.
