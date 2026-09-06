export type Vibe = 'chill' | 'adventure' | 'culture' | 'romantic' | 'nightlife';

export type Budget = 'budget' | 'mid' | 'splurge';

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  vibes: Vibe[];
  budget: Budget;
  travelTime: string;
  rating: number;
  highlights: string[];
  gradient: string;
  emoji: string;
}

export interface VibeMeta {
  id: Vibe;
  label: string;
  emoji: string;
}
