import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { fetchFeaturedProperties, fetchDistinctCountryCount } from '../lib/properties';
import { cardClassFor, formatCoord, formatPrice } from '../lib/format';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [countryCount, setCountryCount] = useState(null);
  const [email, setEmail] = useState('');
  const [leadSent, setLeadSent] = useState(false);

  useEffect(() => {
    fetchFeaturedProperties(4).then(setProperties).catch(() => setProperties([]));
    fetchDistinctCountryCount().then(setCountryCount).catch(() => setCountryCount(null));
  }, []);

  useScrollReveal([properties]);

  function handleLeadSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setLeadSent(true);
    setEmail('');
  }

  const otherCountries = countryCount != null ? Math.max(countryCount - properties.length, 0) : null;

  return (
    <>
      <Nav />

      <header className="hero" id="top">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">Medzinárodné nehnuteľnosti · 16 krajín</span>
            <h1>Váš domov <em>vo svete.</em></h1>
            <p className="lead">Nehnuteľnosti pri mori od Egypta po Bali — s kompletným servisom v slovenčine. Kúpu, zariadenie aj správu vybavíme za vás.</p>
            <div className="hero-cta">
              <a href="#kontakt" className="btn btn-gold">Nezáväzná konzultácia</a>
              <a href="#destinacie" className="btn btn-ghost">Prezrieť destinácie</a>
            </div>
            <div className="chips" aria-label="Rýchly výber krajiny">
              <a className="chip" href="#destinacie">🇪🇬 Egypt</a>
              <a className="chip" href="#destinacie">🇦🇪 Dubaj</a>
              <a className="chip" href="#destinacie">🇦🇱 Albánsko</a>
              <a className="chip" href="#destinacie">🇧🇬 Bulharsko</a>
              <a className="chip more" href="#destinacie">+ 12 ďalších</a>
            </div>
          </div>
          <div className="globe-wrap" aria-hidden="true">
            <svg className="globe" viewBox="0 0 300 300">
              <circle cx="150" cy="150" r="120" fill="none" stroke="#C9A961" strokeWidth="1.2" opacity=".9" />
              <ellipse cx="150" cy="150" rx="46" ry="120" fill="none" stroke="#C9A961" strokeWidth=".8" opacity=".55" />
              <ellipse cx="150" cy="150" rx="88" ry="120" fill="none" stroke="#C9A961" strokeWidth=".8" opacity=".4" />
              <ellipse cx="150" cy="150" rx="120" ry="46" fill="none" stroke="#C9A961" strokeWidth=".8" opacity=".55" />
              <ellipse cx="150" cy="150" rx="120" ry="88" fill="none" stroke="#C9A961" strokeWidth=".8" opacity=".4" />
              <circle cx="150" cy="150" r="2.6" fill="#C9A961" />
              <circle cx="204" cy="96" r="3.4" fill="#F7F4EF" />
              <circle cx="96" cy="188" r="3.4" fill="#F7F4EF" />
              <circle cx="176" cy="226" r="3.4" fill="#F7F4EF" />
            </svg>
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="strip-inner">
          <div className="strip-item"><strong>16</strong><span>krajín v portfóliu</span></div>
          <div className="strip-item"><strong>4</strong><span>vlajkové destinácie</span></div>
          <div className="strip-item"><strong>3 v 1</strong><span>kúpa · zariadenie · správa</span></div>
          <div className="strip-item"><strong>SK / EN</strong><span>kompletný servis vo vašom jazyku</span></div>
        </div>
      </div>

      <section id="destinacie">
        <div className="wrap">
          <div className="dest-head reveal">
            <div>
              <span className="eyebrow">Destinácie</span>
              <h2>Kde kupujú naši klienti</h2>
            </div>
            <p>Štyri trhy, ktoré poznáme do posledného developera. Zvyšok sveta na želanie.</p>
          </div>
          <div className="dest-grid">
            {properties.map((property) => (
              <Link
                key={property.id}
                className={`card ${cardClassFor(property.country)} reveal`}
                to={`/nehnutelnosti/${property.slug}`}
              >
                <span className="coord">{formatCoord(property)}</span>
                <h3>{property.title}</h3>
                <p>{property.description}</p>
                <span className="price">{formatPrice(property)}</span>
              </Link>
            ))}
            {otherCountries != null && otherCountries > 0 && (
              <a className="card more-card reveal" href="#kontakt" style={{ gridColumn: '1/-1' }}>
                <div>
                  <strong>+ {otherCountries} ďalších krajín</strong>
                  <span>Turecko · Španielsko · Grécko · Cyprus · Thajsko · Bali a ďalšie — povedzte nám, kam mierite.</span>
                </div>
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="process" id="proces">
        <div className="wrap">
          <span className="eyebrow reveal">Ako to funguje</span>
          <h2 className="reveal" style={{ fontSize: 'clamp(30px,4vw,44px)' }}>Od prvého hovoru po odovzdanie kľúčov</h2>
          <div className="steps">
            <div className="step reveal">
              <span className="coord">Krok 01</span>
              <h3>Konzultácia</h3>
              <p>Zistíme váš cieľ — dovolenkový domov, investícia, alebo oboje. Nezáväzne a zdarma.</p>
            </div>
            <div className="step reveal">
              <span className="coord">Krok 02</span>
              <h3>Výber &amp; obhliadka</h3>
              <p>Pripravíme výber na mieru a zorganizujeme obhliadku na mieste alebo online.</p>
            </div>
            <div className="step reveal">
              <span className="coord">Krok 03</span>
              <h3>Kúpa &amp; právny servis</h3>
              <p>Zmluvy, prevody aj platby prebehnú bezpečne — všetko vám vysvetlíme v slovenčine.</p>
            </div>
            <div className="step reveal">
              <span className="coord">Krok 04</span>
              <h3>Zariadenie &amp; správa</h3>
              <p>Apartmán zariadime na kľúč a postaráme sa oň, aj keď ste tisíce kilometrov ďaleko.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="sluzby">
        <div className="wrap">
          <span className="eyebrow reveal">Služby</span>
          <h2 className="reveal" style={{ fontSize: 'clamp(30px,4vw,44px)' }}>Všetko pod jednou strechou</h2>
          <div className="svc-grid">
            <div className="svc reveal">
              <svg viewBox="0 0 24 24"><path d="M3 11 L12 4 L21 11 M5 10v9h14v-9" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <h3>Kúpa nehnuteľnosti</h3>
              <p>Preverení developeri, reálne ceny bez prirážok a sprievod celým procesom od rezervácie po zápis vlastníctva.</p>
              <span className="tag">Základ</span>
            </div>
            <div className="svc reveal">
              <svg viewBox="0 0 24 24"><path d="M4 18h16M6 18V9h5v9M14 18v-6h4v6M8 6h2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <h3>Zariadenie na kľúč</h3>
              <p>Od postele po poháre. Váš apartmán pripravíme na bývanie alebo prenájom bez jediného vášho letu navyše.</p>
              <span className="tag">Úspora času</span>
            </div>
            <div className="svc reveal">
              <svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" strokeLinecap="round" /></svg>
              <h3>Správa &amp; prenájom</h3>
              <p>Postaráme sa o nájomníkov, údržbu aj výnosy. Vy sledujete príjem, my riešime všetko ostatné.</p>
              <span className="tag">Pasívny príjem</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow reveal">Referencie</span>
          <div className="quote-grid">
            <blockquote className="quote reveal">
              <p>„Celý nákup apartmánu v Hurghade prebehol na diaľku. Za tri mesiace sme mali kľúče aj prvého nájomcu."</p>
              <cite>— Klient, Egypt (ukážková referencia)</cite>
            </blockquote>
            <blockquote className="quote reveal">
              <p>„Oceňujem úprimnosť — od projektov, ktoré vyzerali dobre na papieri, nás odhovorili. To sa dnes nevidí."</p>
              <cite>— Klientka, Albánsko (ukážková referencia)</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }} id="kontakt">
        <div className="wrap">
          <div className="lead-band reveal">
            <div>
              <span className="eyebrow">Sprievodca zdarma</span>
              <h2>Kde sa oplatí kúpiť nehnuteľnosť pri mori v roku 2026</h2>
              <p>Porovnanie cien, výnosov a rizík v našich 4 vlajkových destináciách. Pošleme vám ho na e-mail.</p>
            </div>
            <div>
              <form className="lead-form" onSubmit={handleLeadSubmit}>
                <input
                  type="email"
                  placeholder="vas@email.sk"
                  aria-label="Váš e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-gold" type="submit">Poslať sprievodcu</button>
              </form>
              <p className="lead-note">Žiadny spam. Iba sprievodca a občasné trhové novinky.</p>
              <p className={`lead-ok ${leadSent ? 'show' : ''}`}>✓ Ďakujeme! Sprievodca je na ceste do vašej schránky.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
