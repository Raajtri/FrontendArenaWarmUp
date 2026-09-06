# Escape — Weekend Trip Planner

A frontend-only landing page and planner for choosing a short weekend trip. A photo-led hero and
feature sections introduce the idea, then an interactive planner lets you browse destinations by
vibe (chill, adventure, culture, romantic, nightlife), search by name/country/theme, or hit
**Surprise me** for a random pick from the current results. Favorites are saved to a shortlist
that persists in `localStorage`.

Built with React 19, TypeScript, Vite, and Framer Motion. All destination data is static/mocked
(`src/data/destinations.ts`) — no backend.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run test      # run the Vitest + Testing Library suite
npm run lint      # oxlint
```

## Architecture

- `src/types.ts` — shared domain types (`Destination`, `Vibe`).
- `src/data/destinations.ts` — static mock dataset and vibe metadata.
- `src/lib/filterDestinations.ts` — pure, unit-tested filtering logic (search + vibe).
- `src/hooks/useFavorites.ts` — shortlist state, persisted to `localStorage` with defensive parsing.
- `src/components/landing/` — the marketing page: nav, hero, trust stats, feature sections, CTA
  banner, footer, and a shared `ScrollReveal` wrapper that drives the scroll-in animations.
- `src/components/` — the planner itself: `DestinationCard`, `VibeFilterBar`, `DestinationModal`,
  `EmptyState`.
- `src/App.tsx` — assembles the landing sections and the planner, and wires shared state (search,
  filters, active modal, favorites) down to them.

## Accessibility

- Semantic landmarks, a skip link, and `aria-live` result counts.
- Cards, filter pills, and nav controls are real `<button>`/`<a>` elements with
  `aria-pressed`/`aria-label`, fully keyboard operable.
- The destination detail view is a proper `role="dialog"` with focus trapping, `Escape` to close,
  and focus restored to the triggering element on close.
- All scroll and hover animations respect `prefers-reduced-motion`.

## Notes

- Photography is real, licensed-for-reuse Unsplash images downloaded into `public/images/` at
  build time (rather than hotlinked), so the page has no third-party image requests at runtime —
  better for Core Web Vitals and one less thing that can break.
- `localStorage` reads/writes are wrapped in `try/catch` so the app degrades gracefully if storage
  is unavailable.
