export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <a className="brand" href="/#top" style={{ marginBottom: 18 }}>
              <svg viewBox="0 0 48 48" aria-hidden="true" width="30" height="30">
                <circle cx="24" cy="24" r="19" fill="none" stroke="#C9A961" strokeWidth="1.6" />
                <ellipse cx="24" cy="24" rx="9" ry="19" fill="none" stroke="#C9A961" strokeWidth="1" opacity=".6" />
                <ellipse cx="24" cy="24" rx="15.5" ry="19" fill="none" stroke="#C9A961" strokeWidth="1" opacity=".38" />
                <path d="M5 24 H15 L24 15 L33 24 H43" fill="none" stroke="#F7F4EF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="brand-name" style={{ fontSize: 17 }}>GLOB<em>E</em>YA</span>
            </a>
            <p>Medzinárodné nehnuteľnosti s kompletným servisom v slovenčine. Kúpa, zariadenie a správa v 16 krajinách sveta.</p>
          </div>
          <div>
            <h4>Destinácie</h4>
            <a href="/#destinacie">Egypt</a>
            <a href="/#destinacie">Dubaj &amp; SAE</a>
            <a href="/#destinacie">Albánsko</a>
            <a href="/#destinacie">Bulharsko</a>
            <a href="/#destinacie">Všetky krajiny</a>
          </div>
          <div>
            <h4>Spoločnosť</h4>
            <a href="/#proces">Ako to funguje</a>
            <a href="/#sluzby">Služby</a>
            <a href="/#kontakt">Kontakt</a>
            <a href="/#">Ochrana osobných údajov</a>
          </div>
          <div>
            <h4>Kontakt</h4>
            <a href="mailto:info@globeya.com">info@globeya.com</a>
            <a href="/#">WhatsApp konzultácia</a>
            <a href="/#">Instagram</a>
            <a href="/#">Facebook</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Globeya. Všetky práva vyhradené.</span>
          <span className="coord">27°N — 42°N · Váš domov vo svete</span>
        </div>
      </div>
    </footer>
  );
}
