# Weekendly

A small, frontend-only experience for discovering and choosing a destination for a short weekend trip. Browse by vibe (chill, adventure, culture, romantic, nightlife), search by name/country/theme, or hit **Surprise me** for a random pick from the current results. Save favorites to a shortlist that persists in `localStorage`.

Built with React 19, TypeScript, and Vite. All data is static/mocked (`src/data/destinations.ts`) — no backend.

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
- `src/components/` — presentational components: `DestinationCard`, `VibeFilterBar`, `DestinationModal`, `EmptyState`.
- `src/App.tsx` — wires state (search, filters, active modal) to the components above.

## Accessibility

- Semantic landmarks (`header`/`main`/`footer`), a skip link, and `aria-live` result counts.
- Cards and filter pills are real `<button>`s with `aria-pressed`/`aria-label`, fully keyboard operable.
- The destination detail view is a proper `role="dialog"` with focus trapping, `Escape` to close, and focus restored to the triggering element on close.

## Notes

- No network requests: destination art is CSS gradients + emoji, which keeps things fast and avoids third-party image dependencies (good for Core Web Vitals and reduces attack surface).
- `localStorage` reads/writes are wrapped in `try/catch` so the app degrades gracefully if storage is unavailable.
