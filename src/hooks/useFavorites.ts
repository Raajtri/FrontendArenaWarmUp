import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'weekendly:favorites';

function readStoredFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === 'string');
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readStoredFavorites());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage may be unavailable (private mode, quota); favorites stay in-memory only.
    }
  }, [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favId) => favId !== id) : [...current, id],
    );
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
