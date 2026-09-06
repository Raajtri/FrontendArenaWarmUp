import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFavorites } from './useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('starts empty when nothing is stored', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
    expect(result.current.isFavorite('santorini')).toBe(false);
  });

  it('adds and removes a destination on toggle', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => result.current.toggleFavorite('santorini'));
    expect(result.current.favorites).toEqual(['santorini']);
    expect(result.current.isFavorite('santorini')).toBe(true);

    act(() => result.current.toggleFavorite('santorini'));
    expect(result.current.favorites).toEqual([]);
  });

  it('persists favorites to localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggleFavorite('kyoto'));

    const { result: second } = renderHook(() => useFavorites());
    expect(second.current.favorites).toEqual(['kyoto']);
  });

  it('ignores corrupted localStorage data', () => {
    window.localStorage.setItem('weekendly:favorites', '{not valid json');
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });
});
