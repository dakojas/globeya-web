import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { fetchPropertyBySlug } from '../lib/properties';
import { formatCoord, formatPrice } from '../lib/format';

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState(undefined);

  useEffect(() => {
    setProperty(undefined);
    fetchPropertyBySlug(slug)
      .then(setProperty)
      .catch(() => setProperty(null));
  }, [slug]);

  return (
    <>
      <Nav />
      <section className="detail-hero">
        <div className="wrap">
          <Link className="back-link" to="/">← Späť na destinácie</Link>
          {property === undefined && <p>Načítavam...</p>}
          {property === null && <p>Nehnuteľnosť sa nenašla.</p>}
          {property && (
            <>
              <span className="eyebrow">{formatCoord(property)}</span>
              <h1 style={{ fontSize: 'clamp(32px,5vw,52px)' }}>{property.title}</h1>
            </>
          )}
        </div>
      </section>

      {property && (
        <section>
          <div className="wrap">
            {property.images?.length > 0 && (
              <div className="detail-gallery">
                {property.images.map((src) => (
                  <img key={src} src={src} alt={property.title} />
                ))}
              </div>
            )}
            <div className="detail-grid">
              <div>
                <p>{property.description}</p>
                <div className="detail-facts">
                  {property.city && (
                    <div><strong>{property.city}</strong><span>Mesto</span></div>
                  )}
                  {property.property_type && (
                    <div><strong>{property.property_type}</strong><span>Typ nehnuteľnosti</span></div>
                  )}
                  {property.area_sqm && (
                    <div><strong>{property.area_sqm} m²</strong><span>Plocha</span></div>
                  )}
                  {property.bedrooms != null && (
                    <div><strong>{property.bedrooms}</strong><span>Spálne</span></div>
                  )}
                </div>
              </div>
              <div className="detail-side">
                <div className="price">{formatPrice(property)}</div>
                <p style={{ marginBottom: 20 }}>Nezáväzná konzultácia k tejto nehnuteľnosti.</p>
                <a href="/#kontakt" className="btn btn-gold" style={{ width: '100%', textAlign: 'center' }}>Mám záujem</a>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
