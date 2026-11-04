import { INGREDIENTS_GALLERY } from '../data/brandData';
import './Ingredients.css';

export default function Ingredients() {
  return (
    <main className="ingredients-page">
      {/* Hero */}
      <section className="ingr-hero">
        <div className="container">
          <span className="section-tag">Natural Ingredients</span>
          <h1 className="section-title">India's Finest Botanicals</h1>
          <p className="ingr-hero-sub">
            For centuries, Indian kitchens and Ayurvedic traditions have celebrated these remarkable ingredients.
            At NUTRICO, we bring them to your daily routine in a convenient modern form.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="ingr-gallery container">
        {INGREDIENTS_GALLERY.map((ing, i) => (
          <div key={ing.name} className={`ingr-card${i % 3 === 0 ? ' wide' : ''}`}>
            <div className="ingr-card-img">
              <img src={ing.image} alt={ing.name} loading="lazy" />
              <div className="ingr-overlay">
                <div className="ingr-products">
                  {ing.products.map(p => (
                    <span key={p}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="ingr-card-body">
              <div className="ingr-header">
                <div>
                  <h3 className="ingr-card-name">{ing.name}</h3>
                  <p className="ingr-card-hindi">Also known as: {ing.hindi}</p>
                </div>
                <div className="ingr-badge-list">
                  {ing.products.map(p => <span key={p} className="ingr-product-badge">{p}</span>)}
                </div>
              </div>
              <p className="ingr-card-desc">{ing.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="ingr-cta">
        <div className="container">
          <div className="ingr-cta-card">
            <h2>Transparency is Our Promise</h2>
            <p>
              We list every ingredient clearly on our packaging and on this website. We believe you should know exactly what goes into every scoop of NUTRICO.
              No hidden ingredients. No inflated claims.
            </p>
            <a href="/shop" className="btn-primary">Explore Our Products</a>
          </div>
        </div>
      </section>
    </main>
  );
}

