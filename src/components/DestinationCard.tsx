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
  return (
    <li className="card">
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
            <span>⭐ {destination.rating.toFixed(1)}</span>
            <span>·</span>
            <span>{destination.travelTime}</span>
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
        <span aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
      </button>
    </li>
  );
}

export const DestinationCard = memo(DestinationCardImpl);
