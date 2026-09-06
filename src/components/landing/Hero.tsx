import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

interface HeroProps {
  onExplore: () => void;
  onLearnMore: () => void;
}

export function Hero({ onExplore, onLearnMore }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 140]);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      <motion.img
        src="/images/hero-clouds.jpg"
        alt="Sunrise breaking over a sea of clouds and mountain peaks"
        className="hero__bg"
        style={{ y: parallaxY }}
        fetchPriority="high"
      />
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__content">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="hero__kicker">Weekend trip planner</p>
          <h1 className="hero__heading">
            A getaway planner
            <br />
            built for <span className="accent-serif">short escapes</span>
          </h1>
          <p className="hero__subtitle">
            Escape turns a spare weekend into a real plan — pick a vibe, compare short trips, and save
            your shortlist in a couple of taps.
          </p>
          <div className="hero__ctas">
            <button type="button" className="btn-primary" onClick={onExplore}>
              Start planning <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="btn-ghost" onClick={onLearnMore}>
              See how it works
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
