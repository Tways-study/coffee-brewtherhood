# Design

## Visual Theme

Committed color strategy: deep navy as the dominant ground (pulled from the logo), warm coffee/wood tones carried entirely by real photography, and a single hot-pink accent (also from the logo's "R") reserved for CTAs and key emphasis. No cream/sand/beige body background. Reference: "navy-ground specialty-coffee brand with one hot-pink spark accent."

## Color Palette (OKLCH)

- `--ink` (navy ground): `oklch(0.22 0.06 255)`
- `--ink-deep` (darker navy, footer/overlays): `oklch(0.16 0.05 255)`
- `--paper` (off-white text/surfaces on navy): `oklch(0.96 0.01 255)`
- `--accent` (hot pink, sparingly): `oklch(0.62 0.23 0)`
- `--muted` (tinted neutral for secondary text on navy): `oklch(0.78 0.03 255)`
- `--surface` (slightly lighter navy panel): `oklch(0.27 0.06 255)`

## Typography

- Display: **Bricolage Grotesque** (variable, self-hosted via `next/font/google`) — headlines, hero type, stat callouts.
- Body/UI: **Geist Sans** (via `next/font/google` or `geist` package) — body copy, nav, labels, buttons.
- Modular scale, fluid `clamp()` for headings, ratio ≥1.25. Hero heading ceiling ≤6rem. Letter-spacing floor ≥ -0.04em.
- `text-wrap: balance` on headings, `text-wrap: pretty` on long-form prose (reviews, story copy).

## Layout

- Long-scroll single page, asymmetric/image-led sections. No identical card grids, no eyebrows, no numbered section markers, no gradient text, no side-stripe borders.
- Responsive grids without fixed breakpoints: `repeat(auto-fit, minmax(280px, 1fr))` where grids are genuinely the right affordance (drink gallery).
- Full-bleed hero photography with overlaid headline — canonical move for an image-led, place-based brief.

## Components

- Hero: full-bleed photo, logo mark, headline, rating badge, CTA pair (Get Directions / Call).
- Quick-facts strip: pill-style tags (Dine-in / Takeout / Delivery / LGBTQ+ friendly), not a side-stripe list.
- Drink gallery: asymmetric image grid, varied tile sizes, named items overlaid.
- Review cards: full-border (not stripe-accented), reviewer name + real quote.
- Visit section: two-column layout — address/plus-code/CTAs on the left, a real embedded Google Map (exact pin, no API key, `output=embed`) on the right in a rounded-3xl bordered card; map desaturates slightly at rest and sharpens on hover.

## Motion

- One orchestrated hero reveal (logo → headline → rating, staggered) on load.
- Drink gallery staggers in on scroll; other sections use a single, simple crossfade/rise — not uniform identical reveals everywhere.
- Ease-out-expo/quint curves, no bounce/elastic.
- Full `@media (prefers-reduced-motion: reduce)` fallback: instant or simple crossfade, no transforms.
