import type { Vibe, VibeMeta } from '../types';

interface VibeFilterBarProps {
  vibes: VibeMeta[];
  selected: Vibe[];
  onToggle: (vibe: Vibe) => void;
  onClear: () => void;
}

export function VibeFilterBar({ vibes, selected, onToggle, onClear }: VibeFilterBarProps) {
  return (
    <div className="vibe-bar" role="group" aria-label="Filter destinations by vibe">
      {vibes.map((vibe) => {
        const isActive = selected.includes(vibe.id);
        return (
          <button
            key={vibe.id}
            type="button"
            className={`vibe-pill${isActive ? ' vibe-pill--active' : ''}`}
            aria-pressed={isActive}
            onClick={() => onToggle(vibe.id)}
          >
            <span aria-hidden="true">{vibe.emoji}</span> {vibe.label}
          </button>
        );
      })}
      {selected.length > 0 && (
        <button type="button" className="vibe-pill vibe-pill--clear" onClick={onClear}>
          Clear filters
        </button>
      )}
    </div>
  );
}
