import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <Link className="brand" to="/" aria-label="Globeya — domov">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="19" fill="none" stroke="#C9A961" strokeWidth="1.6" />
            <ellipse cx="24" cy="24" rx="9" ry="19" fill="none" stroke="#C9A961" strokeWidth="1" opacity=".6" />
            <ellipse cx="24" cy="24" rx="15.5" ry="19" fill="none" stroke="#C9A961" strokeWidth="1" opacity=".38" />
            <path d="M5 24 H15 L24 15 L33 24 H43" fill="none" stroke="#F7F4EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="brand-name">GLOB<em>E</em>YA</span>
        </Link>
        <div className="nav-links">
          <a href="/#destinacie">Destinácie</a>
          <a href="/#proces">Ako to funguje</a>
          <a href="/#sluzby">Služby</a>
          <a href="/#kontakt">Kontakt</a>
          <a href="/#kontakt" className="btn btn-gold">Konzultácia zdarma</a>
        </div>
      </div>
    </nav>
  );
}
