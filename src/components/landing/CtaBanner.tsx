import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface CtaBannerProps {
  onExplore: () => void;
}

export function CtaBanner({ onExplore }: CtaBannerProps) {
  return (
    <section className="cta-banner">
      <img
        src="/images/starry-mountains.jpg"
        alt="Starry night sky over snow-capped mountains"
        className="cta-banner__bg"
        loading="lazy"
      />
      <div className="cta-banner__scrim" aria-hidden="true" />
      <ScrollReveal className="cta-banner__content">
        <h3>
          Ready for your next <span className="accent-serif">escape</span>?
        </h3>
        <p>Ten destinations are waiting below — pick a vibe and see what fits your weekend.</p>
        <button type="button" className="btn-primary" onClick={onExplore}>
          Start planning <ArrowRight size={18} aria-hidden="true" />
        </button>
      </ScrollReveal>
    </section>
  );
}
