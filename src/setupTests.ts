import '@testing-library/jest-dom/vitest';

if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom has no layout engine, so framer-motion's `whileInView` never fires.
// A no-op observer keeps ScrollReveal content mounted for tests to query.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  readonly scrollMargin = '';
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (!window.IntersectionObserver) {
  window.IntersectionObserver = MockIntersectionObserver;
}
