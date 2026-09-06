import { motion, useReducedMotion } from 'framer-motion';
import { Heart, Plane, Star } from 'lucide-react';
import { memo } from 'react';
import type { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  isFavorite: boolean;
  onOpen: (destination: Destination) => void;
  onToggleFavorite: (id: string) => void;
}

function DestinationCardImpl({
  destination,
  isFavorite,
  onOpen,
  onToggleFavorite,
}: DestinationCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li
      className="card"
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        className="card__surface"
        style={{ background: destination.gradient }}
        onClick={() => onOpen(destination)}
        aria-haspopup="dialog"
        aria-label={`View details for ${destination.name}, ${destination.country}`}
      >
        <span className="card__emoji" aria-hidden="true">
          {destination.emoji}
        </span>
        <span className="card__body">
          <span className="card__title">{destination.name}</span>
          <span className="card__country">{destination.country}</span>
          <span className="card__tagline">{destination.tagline}</span>
          <span className="card__meta">
            <span className="card__meta-item">
              <Star size={14} aria-hidden="true" fill="currentColor" /> {destination.rating.toFixed(1)}
            </span>
            <span className="card__meta-item">
              <Plane size={14} aria-hidden="true" /> {destination.travelTime}
            </span>
          </span>
        </span>
      </button>
      <button
        type="button"
        className="card__favorite"
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${destination.name} from your shortlist`
            : `Add ${destination.name} to your shortlist`
        }
        onClick={() => onToggleFavorite(destination.id)}
      >
        <Heart size={16} aria-hidden="true" fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
    </motion.li>
  );
}

export const DestinationCard = memo(DestinationCardImpl);
