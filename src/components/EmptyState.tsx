interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="empty-state" role="status">
      <p>No destinations match your search yet.</p>
      <button type="button" onClick={onReset}>
        Reset filters
      </button>
    </div>
  );
}
