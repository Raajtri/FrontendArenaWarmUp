export function SiteFooter() {
  return (
    <footer className="site-footer">
      <img
        src="/images/forest-path.jpg"
        alt=""
        className="site-footer__bg"
        loading="lazy"
      />
      <div className="site-footer__scrim" aria-hidden="true" />

      <div className="site-footer__content">
        <nav className="site-footer__links" aria-label="Footer">
          <a href="#hero">Home</a>
          <a href="#features">Features</a>
          <a href="#planner">Explore destinations</a>
        </nav>
        <p className="site-footer__note">
          Built for the Frontend Arena warm-up challenge — mock data only, no bookings are made.
        </p>
      </div>

      <p className="site-footer__wordmark" aria-hidden="true">
        Escape
      </p>
    </footer>
  );
}
