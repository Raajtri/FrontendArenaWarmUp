import { ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FeatureCalloutProps {
  onExplore: () => void;
}

export function FeatureCallout({ onExplore }: FeatureCalloutProps) {
  return (
    <section className="callout">
      <ScrollReveal className="callout__card">
        <img
          src="/images/sunset-silhouette.jpg"
          alt="Silhouetted mountain ridgeline at sunset"
          className="callout__image"
          loading="lazy"
        />
        <div className="callout__body">
          <p className="callout__kicker">
            <Sparkles size={14} aria-hidden="true" /> New
          </p>
          <h3>
            Meet your <span className="accent-serif">smart shortlist</span>
          </h3>
          <p>
            Heart a destination anywhere in Escape and it lands in your shortlist instantly, saved
            on this device so it's ready the next time you open the planner.
          </p>
          <button type="button" className="btn-link" onClick={onExplore}>
            See how it works <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}
