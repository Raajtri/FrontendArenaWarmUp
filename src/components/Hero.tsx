import { motion, useReducedMotion } from 'framer-motion';
import { Compass, Heart, MapPin, Plane, SlidersHorizontal } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const FEATURES = [
  { icon: Compass, label: 'Discover Destinations' },
  { icon: MapPin, label: 'Find Places' },
  { icon: SlidersHorizontal, label: 'Explore Options' },
  { icon: Heart, label: 'Save Favorites' },
];

const FLOAT_CARDS = [
  { name: 'Santorini', country: 'Greece', gradient: 'linear-gradient(135deg,#2b5876,#4e4376)', emoji: '🌅', favorite: true },
  { name: 'Banff', country: 'Canada', gradient: 'linear-gradient(135deg,#1e3c72,#2a5298)', emoji: '🏔️', favorite: false },
  { name: 'Kyoto', country: 'Japan', gradient: 'linear-gradient(135deg,#eb3349,#f45c43)', emoji: '⛩️', favorite: false },
];

export function Hero({ onExplore }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const floatTransition = (delay: number) =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration: 4, repeat: Infinity, ease: 'easeInOut' as const, delay };

  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__grid">
        <motion.div
          className="hero__copy"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="hero__kicker">
            <Plane size={14} aria-hidden="true" /> Plan your next weekend
          </p>
          <h1 className="hero__brand">
            Escape<span className="hero__brand-accent">.</span>
          </h1>
          <p className="hero__title">Weekend Trip Planner</p>
          <p className="hero__tagline">Discover · Plan · Explore</p>
          <p className="hero__subtitle">A short trip can create a long story.</p>

          <ul className="hero__features">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="hero__feature-icon" aria-hidden="true">
                  <Icon size={18} />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <button type="button" className="hero__cta" onClick={onExplore}>
            Explore destinations
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>

        <motion.div
          className="hero__visual"
          role="img"
          aria-label="Stack of postcard-style destination previews"
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="hero__flight-path" aria-hidden="true">
            <Plane size={20} />
          </div>
          {FLOAT_CARDS.map((card, index) => (
            <motion.div
              key={card.name}
              className={`hero__postcard hero__postcard--${index}`}
              style={{ background: card.gradient }}
              animate={{ y: prefersReducedMotion ? 0 : [0, -10, 0] }}
              transition={floatTransition(index * 0.6)}
            >
              <span className="hero__postcard-emoji" aria-hidden="true">
                {card.emoji}
              </span>
              <span className="hero__postcard-tag">
                <MapPin size={12} aria-hidden="true" /> {card.name}
              </span>
              {card.favorite && (
                <span className="hero__postcard-heart" aria-hidden="true">
                  <Heart size={14} fill="currentColor" />
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
