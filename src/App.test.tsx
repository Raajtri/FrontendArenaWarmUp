import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders every destination by default', () => {
    render(<App />);
    expect(screen.getByText(/10 destinations found/i)).toBeInTheDocument();
  });

  it('filters results as the user types in the search box', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText(/search destinations/i), 'kyoto');

    expect(screen.getByText(/1 destination found/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view details for kyoto/i })).toBeInTheDocument();
  });

  it('filters results when a vibe pill is selected', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /adventure & outdoors/i }));

    expect(screen.queryByRole('button', { name: /view details for santorini/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /view details for queenstown/i })).toBeInTheDocument();
  });

  it('shows an empty state and can reset filters', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText(/search destinations/i), 'atlantis');
    expect(screen.getByText(/no destinations match/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /reset filters/i }));
    expect(screen.getByText(/10 destinations found/i)).toBeInTheDocument();
  });

  it('opens a destination in a dialog and closes it on Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /view details for kyoto/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /kyoto, japan/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('toggles a destination into the shortlist from the modal', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /view details for kyoto/i }));
    await user.click(screen.getByRole('button', { name: /add to shortlist/i }));

    expect(screen.getByText(/1 in your shortlist/i)).toBeInTheDocument();
  });
});
