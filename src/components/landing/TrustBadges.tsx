import { Globe2, MapPinned, Star, Users } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const STATS = [
  { icon: MapPinned, value: '10', label: 'curated destinations' },
  { icon: Star, value: '4.9/5', label: 'planning experience' },
  { icon: Users, value: '5 min', label: 'to a finished plan' },
  { icon: Globe2, value: '5', label: 'vibes to explore' },
];

export function TrustBadges() {
  return (
    <section className="trust" aria-label="Escape at a glance">
      <ScrollReveal className="trust__grid">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div className="trust__item" key={label}>
            <Icon size={20} aria-hidden="true" />
            <span className="trust__value">{value}</span>
            <span className="trust__label">{label}</span>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
