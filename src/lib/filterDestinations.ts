import type { Destination, Vibe } from '../types';

export interface FilterOptions {
  query: string;
  vibes: Vibe[];
}

export function filterDestinations(
  destinations: Destination[],
  { query, vibes }: FilterOptions,
): Destination[] {
  const normalizedQuery = query.trim().toLowerCase();

  return destinations.filter((destination) => {
    const matchesVibe = vibes.length === 0 || destination.vibes.some((v) => vibes.includes(v));
    if (!matchesVibe) return false;

    if (!normalizedQuery) return true;

    const haystack = `${destination.name} ${destination.country} ${destination.tagline}`.toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}
