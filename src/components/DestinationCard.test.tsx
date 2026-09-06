import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Destination } from '../types';
import { DestinationCard } from './DestinationCard';

const destination: Destination = {
  id: 'kyoto',
  name: 'Kyoto',
  country: 'Japan',
  tagline: 'A thousand temples wrapped in quiet',
  description: '',
  vibes: ['culture'],
  budget: 'mid',
  travelTime: '2h flight',
  rating: 4.9,
  highlights: [],
  gradient: 'linear-gradient(135deg,#eb3349,#f45c43)',
  emoji: '⛩️',
};

describe('DestinationCard', () => {
  it('renders the destination name, country, and rating', () => {
    render(
      <ul>
        <DestinationCard
          destination={destination}
          isFavorite={false}
          onOpen={vi.fn()}
          onToggleFavorite={vi.fn()}
        />
      </ul>,
    );

    expect(screen.getByText('Kyoto')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('4.9')).toBeInTheDocument();
  });

  it('calls onOpen when the card is activated via keyboard', async () => {
    const onOpen = vi.fn();
    const user = userEvent.setup();
    render(
      <ul>
        <DestinationCard
          destination={destination}
          isFavorite={false}
          onOpen={onOpen}
          onToggleFavorite={vi.fn()}
        />
      </ul>,
    );

    await user.tab();
    await user.keyboard('{Enter}');
    expect(onOpen).toHaveBeenCalledWith(destination);
  });

  it('calls onToggleFavorite without triggering onOpen', async () => {
    const onOpen = vi.fn();
    const onToggleFavorite = vi.fn();
    const user = userEvent.setup();
    render(
      <ul>
        <DestinationCard
          destination={destination}
          isFavorite={false}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
        />
      </ul>,
    );

    await user.click(screen.getByRole('button', { name: /add kyoto to your shortlist/i }));
    expect(onToggleFavorite).toHaveBeenCalledWith('kyoto');
    expect(onOpen).not.toHaveBeenCalled();
  });

  it('reflects favorite state in aria-pressed and label', () => {
    render(
      <ul>
        <DestinationCard
          destination={destination}
          isFavorite
          onOpen={vi.fn()}
          onToggleFavorite={vi.fn()}
        />
      </ul>,
    );

    const favoriteButton = screen.getByRole('button', { name: /remove kyoto from your shortlist/i });
    expect(favoriteButton).toHaveAttribute('aria-pressed', 'true');
  });
});
