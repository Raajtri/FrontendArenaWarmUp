import { Heart, Plus } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function FeatureDuo() {
  return (
    <section className="feature-duo">
      <ScrollReveal className="feature-duo__card">
        <h3>Structure you can see</h3>
        <p>Filter by vibe and budget, then scan a visual grid instead of a wall of text.</p>
        <div className="feature-duo__frame">
          <img
            src="/images/kyoto-street.jpg"
            alt="A quiet lantern-lit street in Kyoto at dusk"
            loading="lazy"
          />
          <div className="feature-duo__chip">
            <Plus size={14} aria-hidden="true" /> Add to itinerary
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="feature-duo__card">
        <h3>Your shortlist, one tap away</h3>
        <p>Favorite as you browse — your shortlist stays with you across every visit.</p>
        <div className="feature-duo__frame">
          <img
            src="/images/boat-lake.jpg"
            alt="A wooden boat crossing a turquoise alpine lake"
            loading="lazy"
          />
          <div className="feature-duo__chip feature-duo__chip--accent">
            <Heart size={14} aria-hidden="true" fill="currentColor" /> Saved to shortlist
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
