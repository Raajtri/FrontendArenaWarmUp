import { ArrowRight, Compass } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface FinaleProps {
  onExplore: () => void;
}

export function Finale({ onExplore }: FinaleProps) {
  return (
    <section className="finale">
      <img
        src="/images/starry-mountains.jpg"
        alt="Starry night sky over snow-capped mountains"
        className="finale__bg"
        loading="lazy"
      />
      <div className="finale__scrim" aria-hidden="true" />

      <ScrollReveal className="finale__cta">
        <h3>
          Ready for your next <span className="accent-serif">escape</span>?
        </h3>
        <p>Ten destinations are waiting below — pick a vibe and see what fits your weekend.</p>
        <button type="button" className="btn-primary" onClick={onExplore}>
          Start planning <ArrowRight size={18} aria-hidden="true" />
        </button>
      </ScrollReveal>

      <div className="finale__footer">
        <div className="page-container finale__footer-content">
          <a href="#hero" className="finale__brand">
            <Compass size={20} aria-hidden="true" />
            Escape
          </a>

          <nav className="finale__links" aria-label="Footer">
            <a href="#hero">Home</a>
            <a href="#features">Features</a>
            <a href="#planner">Explore destinations</a>
          </nav>
        </div>

        <p className="finale__wordmark" aria-hidden="true">
          Escape
        </p>
      </div>
    </section>
  );
}
