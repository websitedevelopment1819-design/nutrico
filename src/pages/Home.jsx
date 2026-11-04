import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, VALUES, BRAND } from '../data/brandData';
import './Home.css';

const INGREDIENTS_PREVIEW = [
  { emoji: '🌿', name: 'Moringa', desc: 'Nutrient-dense leaf' },
  { emoji: '🌾', name: 'Ragi', desc: 'Calcium-rich millet' },
  { emoji: '🫚', name: 'Isabgol', desc: 'Soluble fibre' },
  { emoji: '🍈', name: 'Amla', desc: 'Vitamin C powerhouse' },
  { emoji: '🌶️', name: 'Ajwain', desc: 'Digestive herb' },
  { emoji: '🫘', name: 'Sesame', desc: 'Mineral-rich seed' },
];

const TESTIMONIAL_PLACEHOLDER = [
  {
    name: 'Your Name Here',
    location: 'India',
    text: 'Genuine reviews will be featured here. We believe in honesty – no made-up reviews.',
    placeholder: true,
  },
  {
    name: 'Share Your Story',
    location: 'India',
    text: 'Try NUTRICO and share your experience! Follow us on Instagram for community updates.',
    placeholder: true,
  },
  {
    name: 'We Value Transparency',
    location: 'India',
    text: 'Your honest review matters to us. We are committed to transparency – from ingredients to customer stories.',
    placeholder: true,
  },
];

export default function Home() {
  return (
    <main className="home">
      {/* ── Products ── */}
      <section className="section products-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Our Products</span>
            <h2 className="section-title">Four Products. Endless Wellness.</h2>
            <p className="section-subtitle">
              Each NUTRICO product is formulated with hand-picked traditional Indian ingredients, supporting a specific aspect of your daily wellness.
            </p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/shop" className="btn-secondary">
              View All Products & Combos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why NUTRICO ── */}
      <section className="section why-section">
        <div className="why-bg" />
        <div className="container why-inner">
          <div className="why-left">
            <span className="section-tag">Why NUTRICO</span>
            <h2 className="section-title" style={{ textAlign: 'left', maxWidth: 440 }}>
              Ancient Wisdom, Modern Living.
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 32, maxWidth: 420 }}>
              India has always known the power of its plants, spices and grains. At NUTRICO, we honour that tradition by crafting products that are clean, honest and rooted in ingredients your grandmother would recognise.
            </p>
            <Link to="/about" className="btn-primary">
              Our Story <ArrowRight size={16} />
            </Link>
          </div>
          <div className="why-values">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <div>
                  <h4 className="value-title">{v.title}</h4>
                  <p className="value-desc">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ingredients Preview ── */}
      <section className="section ingredients-preview">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Natural Ingredients</span>
            <h2 className="section-title">From India's Rich Botanical Heritage</h2>
            <p className="section-subtitle">
              Every ingredient in our products is selected for its traditional significance and nutritional value.
            </p>
          </div>
          <div className="ingr-grid">
            {INGREDIENTS_PREVIEW.map(i => (
              <div key={i.name} className="ingr-chip">
                <span className="ingr-emoji">{i.emoji}</span>
                <div>
                  <p className="ingr-name">{i.name}</p>
                  <p className="ingr-desc">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Link to="/ingredients" className="btn-secondary">
              Explore All Ingredients <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Customer Reviews</span>
            <h2 className="section-title">Real Reviews, Coming Soon</h2>
            <p className="section-subtitle">
              We believe in honesty. These are placeholder cards – genuine customer reviews will appear here.
            </p>
          </div>
          <div className="testimonials-grid">
            {TESTIMONIAL_PLACEHOLDER.map((t, i) => (
              <div key={i} className="tcard">
                <p className="tcard-text">"{t.text}"</p>
                <div className="tcard-author">
                  <div className="tcard-avatar">{t.name[0]}</div>
                  <div>
                    <p className="tcard-name">{t.name}</p>
                    <p className="tcard-loc">{t.location}</p>
                  </div>
                </div>
                <div className="tcard-placeholder-badge">Placeholder</div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: 36 }}>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Share Your Experience on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-left">
              <span className="section-tag">Stay Connected</span>
              <h2>Wellness Tips & Exclusive Offers</h2>
              <p>Subscribe to receive stories from India's wellness traditions, usage tips and early access to new products.</p>
            </div>
            <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
