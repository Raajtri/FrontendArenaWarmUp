import { Heart, MapPin } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function SyncSection() {
  return (
    <section className="sync">
      <ScrollReveal className="sync__copy">
        <h3>
          One planner, open on <span className="accent-serif">any screen</span>
        </h3>
        <p>
          Start narrowing down destinations on your laptop, then hand the shortlist to whoever
          you're travelling with — everything you saved is right there on their phone too.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="sync__phone">
        <div className="phone">
          <img src="/images/beach-sunrise.jpg" alt="" className="phone__bg" loading="lazy" />
          <div className="phone__notch" aria-hidden="true" />
          <div className="phone__content">
            <p className="phone__title">Your shortlist</p>
            <div className="phone__chip">
              <MapPin size={12} aria-hidden="true" /> Maldives
              <Heart size={12} aria-hidden="true" fill="currentColor" />
            </div>
            <div className="phone__chip">
              <MapPin size={12} aria-hidden="true" /> Santorini
              <Heart size={12} aria-hidden="true" fill="currentColor" />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
