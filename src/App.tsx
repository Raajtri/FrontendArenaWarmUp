import { useId, useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import { DestinationCard } from './components/DestinationCard';
import { DestinationModal } from './components/DestinationModal';
import { EmptyState } from './components/EmptyState';
import { CtaBanner } from './components/landing/CtaBanner';
import { FeatureCallout } from './components/landing/FeatureCallout';
import { FeatureDuo } from './components/landing/FeatureDuo';
import { FeatureShowcase } from './components/landing/FeatureShowcase';
import { Hero } from './components/landing/Hero';
import { NavBar } from './components/landing/NavBar';
import { SectionIntro } from './components/landing/SectionIntro';
import { SiteFooter } from './components/landing/SiteFooter';
import { SyncSection } from './components/landing/SyncSection';
import { TrustBadges } from './components/landing/TrustBadges';
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
  const plannerRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

  function scrollToPlanner() {
    plannerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="app">
      <a href="#planner" className="skip-link">
        Skip to destinations
      </a>

      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'toast',
          duration: 2500,
          style: {
            background: '#171a2b',
            color: '#f4f4f8',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      />

      <NavBar onPlanClick={scrollToPlanner} />
      <Hero onExplore={scrollToPlanner} onLearnMore={scrollToFeatures} />
      <TrustBadges />

      <div ref={featuresRef}>
        <SectionIntro />
        <FeatureCallout onExplore={scrollToPlanner} />
        <FeatureShowcase />
        <FeatureDuo />
        <SyncSection />
      </div>

      <section className="planner" id="planner" ref={plannerRef} aria-label="Explore destinations">
        <div className="page-container">
          <div className="planner__intro">
            <h2>Explore destinations</h2>
            <p>Pick a vibe, search a place, or let us surprise you with your next short escape.</p>
          </div>

          <div className="search-section">
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
          </div>

          <main>
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
        </div>
      </section>

      <CtaBanner onExplore={scrollToPlanner} />
      <SiteFooter />

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
