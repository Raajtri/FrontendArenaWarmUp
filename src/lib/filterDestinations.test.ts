import { describe, expect, it } from 'vitest';
import type { Destination } from '../types';
import { filterDestinations } from './filterDestinations';

const sample: Destination[] = [
  {
    id: 'a',
    name: 'Santorini',
    country: 'Greece',
    tagline: 'Sunset cliffs',
    description: '',
    vibes: ['romantic', 'chill'],
    budget: 'splurge',
    travelTime: '3h flight',
    rating: 4.8,
    highlights: [],
    image: '/images/destinations/santorini.jpg',
  },
  {
    id: 'b',
    name: 'Queenstown',
    country: 'New Zealand',
    tagline: 'Adrenaline capital',
    description: '',
    vibes: ['adventure'],
    budget: 'mid',
    travelTime: '4h flight',
    rating: 4.7,
    highlights: [],
    image: '/images/destinations/queenstown.jpg',
  },
];

describe('filterDestinations', () => {
  it('returns all destinations when no filters are applied', () => {
    expect(filterDestinations(sample, { query: '', vibes: [] })).toHaveLength(2);
  });

  it('filters by vibe', () => {
    const result = filterDestinations(sample, { query: '', vibes: ['adventure'] });
    expect(result.map((d) => d.id)).toEqual(['b']);
  });

  it('filters by search query across name, country, and tagline', () => {
    expect(filterDestinations(sample, { query: 'greece', vibes: [] })).toHaveLength(1);
    expect(filterDestinations(sample, { query: 'capital', vibes: [] })).toHaveLength(1);
  });

  it('is case-insensitive and trims whitespace', () => {
    expect(filterDestinations(sample, { query: '  SANTORINI  ', vibes: [] })).toHaveLength(1);
  });

  it('combines vibe and query filters', () => {
    expect(
      filterDestinations(sample, { query: 'queenstown', vibes: ['romantic'] }),
    ).toHaveLength(0);
  });

  it('returns no results for a query that matches nothing', () => {
    expect(filterDestinations(sample, { query: 'atlantis', vibes: [] })).toHaveLength(0);
  });
});
