import { Clock } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function FeatureShowcase() {
  return (
    <section className="showcase">
      <ScrollReveal className="showcase__intro">
        <h3>See the plan. Stay on track.</h3>
        <p>
          Every destination comes with a rating, travel time, and budget at a glance — so comparing
          three options feels as easy as scanning one.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1} className="showcase__frame">
        <img
          src="/images/hiker-valley.jpg"
          alt="A hiker looking out over a misty green valley from a rocky outcrop"
          loading="lazy"
        />
        <div className="showcase__widget">
          <div className="showcase__widget-header">
            <span>Saturday</span>
            <span className="showcase__avatar" aria-hidden="true">
              🌄
            </span>
          </div>
          <div className="showcase__widget-row">
            <Clock size={14} aria-hidden="true" />
            <div>
              <p className="showcase__widget-title">Morning check-in</p>
              <p className="showcase__widget-time">9:00 AM · Kyoto</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
