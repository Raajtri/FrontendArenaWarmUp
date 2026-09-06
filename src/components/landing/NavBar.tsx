import { useMotionValueEvent, useScroll } from 'framer-motion';
import { Compass } from 'lucide-react';
import { useState } from 'react';

interface NavBarProps {
  onPlanClick: () => void;
}

export function NavBar({ onPlanClick }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 40);
  });

  return (
    <header className={`nav${isScrolled ? ' nav--scrolled' : ''}`}>
      <a href="#hero" className="nav__brand">
        <Compass size={20} aria-hidden="true" />
        Escape
      </a>
      <nav className="nav__links" aria-label="Primary">
        <a href="#features">Features</a>
        <a href="#planner">Explore</a>
      </nav>
      <button type="button" className="nav__cta" onClick={onPlanClick}>
        Start planning
      </button>
    </header>
  );
}
