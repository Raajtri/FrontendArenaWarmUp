import { useEffect, useRef } from 'react';
import type { Destination } from '../types';

interface DestinationModalProps {
  destination: Destination;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function DestinationModal({
  destination,
  isFavorite,
  onClose,
  onToggleFavorite,
}: DestinationModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = `destination-modal-title-${destination.id}`;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;

      const elements = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal__hero" style={{ background: destination.gradient }}>
          <span aria-hidden="true" className="modal__emoji">
            {destination.emoji}
          </span>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>
        <div className="modal__content">
          <h2 id={titleId}>
            {destination.name}, {destination.country}
          </h2>
          <p className="modal__tagline">{destination.tagline}</p>
          <p>{destination.description}</p>

          <dl className="modal__facts">
            <div>
              <dt>Rating</dt>
              <dd>⭐ {destination.rating.toFixed(1)}</dd>
            </div>
            <div>
              <dt>Travel time</dt>
              <dd>{destination.travelTime}</dd>
            </div>
            <div>
              <dt>Budget</dt>
              <dd className="modal__badge">{destination.budget}</dd>
            </div>
          </dl>

          <h3>Highlights</h3>
          <ul className="modal__highlights">
            {destination.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <button
            type="button"
            className="modal__favorite-btn"
            aria-pressed={isFavorite}
            onClick={() => onToggleFavorite(destination.id)}
          >
            {isFavorite ? '♥ In your shortlist' : '♡ Add to shortlist'}
          </button>
        </div>
      </div>
    </div>
  );
}
