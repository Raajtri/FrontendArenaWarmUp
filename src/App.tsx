import { useId, useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import { DestinationCard } from './components/DestinationCard';
import { DestinationModal } from './components/DestinationModal';
import { EmptyState } from './components/EmptyState';
import { Hero } from './components/Hero';
import { VibeFilterBar } from './components/VibeFilterBar';
import { DESTINATIONS, VIBES } from './data/destinations';
import { useFavorites } from './hooks/useFavorites';
import { filterDestinations } from './lib/filterDestinations';
import type { Destination, Vibe } from './types';

function App() {
  const [query, setQuery] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<Vibe[]>([]);
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const searchInputId = useId();
  const mainRef = useRef<HTMLElement>(null);

  const results = useMemo(
    () => filterDestinations(DESTINATIONS, { query, vibes: selectedVibes }),
    [query, selectedVibes],
  );

  function toggleVibe(vibe: Vibe) {
    setSelectedVibes((current) =>
      current.includes(vibe) ? current.filter((v) => v !== vibe) : [...current, vibe],
    );
  }

  function resetFilters() {
    setQuery('');
    setSelectedVibes([]);
  }

  function handleSurpriseMe() {
    const pool = results.length > 0 ? results : DESTINATIONS;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    setActiveDestination(pick);
  }

  function handleToggleFavorite(id: string) {
    const wasFavorite = isFavorite(id);
    const destination = DESTINATIONS.find((item) => item.id === id);
    toggleFavorite(id);

    if (destination) {
      toast(
        wasFavorite
          ? `Removed ${destination.name} from your shortlist`
          : `Added ${destination.name} to your shortlist`,
        { icon: wasFavorite ? '💔' : '❤️' },
      );
    }
  }

  function scrollToResults() {
    mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to results
      </a>

      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'toast',
          duration: 2500,
          style: {
            background: 'var(--bg-elevated)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
          },
        }}
      />

      <Hero onExplore={scrollToResults} />

      <div className="page-container">
        <section className="search-section" aria-label="Search and filter destinations">
          <div className="search-section__controls">
            <label htmlFor={searchInputId} className="visually-hidden">
              Search destinations by name, country, or theme
            </label>
            <input
              id={searchInputId}
              type="search"
              className="search-input"
              placeholder="Search destinations, e.g. beach, Japan, hiking…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" className="surprise-btn" onClick={handleSurpriseMe}>
              🎲 Surprise me
            </button>
          </div>

          <VibeFilterBar
            vibes={VIBES}
            selected={selectedVibes}
            onToggle={toggleVibe}
            onClear={() => setSelectedVibes([])}
          />
        </section>

        <main id="main-content" ref={mainRef}>
          <div className="results-meta" aria-live="polite">
            {results.length} destination{results.length === 1 ? '' : 's'} found
            {favorites.length > 0 && ` · ${favorites.length} in your shortlist`}
          </div>

          {results.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <ul className="grid">
              {results.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  isFavorite={isFavorite(destination.id)}
                  onOpen={setActiveDestination}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </ul>
          )}
        </main>

        <footer className="footer">
          <p>Built for a weekend-trip discovery experience. Mock data only.</p>
        </footer>
      </div>

      {activeDestination && (
        <DestinationModal
          destination={activeDestination}
          isFavorite={isFavorite(activeDestination.id)}
          onClose={() => setActiveDestination(null)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}

export default App;
