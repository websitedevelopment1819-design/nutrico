import { Link } from 'react-router-dom';
import { VALUES } from '../data/brandData';
import './About.css';

const TIMELINE = [
  { year: 'The Beginning', title: 'A Realisation', desc: 'Our founder noticed a gap between the wellness wisdom passed down by Indian grandmothers and the complicated, imported supplements dominating pharmacy shelves.' },
  { year: 'The Research', title: 'Going Back to Roots', desc: 'Months of research into traditional Indian ingredients – Ayurvedic texts, botanical properties, nutritional science – all pointing to the same conclusion: India already had the answers.' },
  { year: 'The Formula', title: 'Crafting NUTRICO', desc: 'Working with food technologists, we formulated four products rooted in traditional ingredients, designed for the modern Indian lifestyle.' },
  { year: 'Today', title: 'Sharing with You', desc: 'NUTRICO is now available to you – a range of honest, clean wellness powders inspired by the richness of India\'s botanical heritage.' },
];

export default function About() {
  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="section-tag">Our Story</span>
            <h1 className="section-title about-h1">
              Born from India's<br />
              <em>Wellness Wisdom.</em>
            </h1>
            <p>
              NUTRICO began with a simple conviction: that the Indian subcontinent, with its thousands of years of botanical knowledge, already had the ingredients for modern wellness.
              We didn't need to look elsewhere.
            </p>
          </div>
          <div className="about-hero-img">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=700&q=80" alt="Indian spices and herbs" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mv-section">
        <div className="container mv-grid">
          <div className="mv-card mission">
            <div className="mv-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>
              To make everyday wellness accessible, honest and rooted in India's botanical heritage. We formulate nutrition powders that are clean, transparent and genuinely useful – not complicated or overclaimed.
            </p>
          </div>
          <div className="mv-card vision">
            <div className="mv-icon">🌟</div>
            <h2>Our Vision</h2>
            <p>
              A world where India's remarkable traditional ingredients are celebrated globally, and where every person can support their wellness journey with products they understand and trust.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Story Timeline */}
      <section className="timeline-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">The NUTRICO Journey</span>
            <h2 className="section-title">How We Got Here</h2>
          </div>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <div key={i} className={`timeline-item${i % 2 === 0 ? ' left' : ' right'}`}>
                <div className="timeline-content">
                  <p className="tl-year">{item.year}</p>
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-desc">{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
            <div className="timeline-line" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle">
              These aren't just words on a page – they guide every decision we make, from the ingredients we choose to the way we talk to you.
            </p>
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="vcard">
                <div className="vcard-icon">{v.icon}</div>
                <h4 className="vcard-title">{v.title}</h4>
                <p className="vcard-desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Philosophy */}
      <section className="philosophy-section">
        <div className="container philosophy-inner">
          <div className="philosophy-text">
            <span className="section-tag">Our Philosophy</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Traditional Ingredients,<br />Modern Convenience.
            </h2>
            <p>
              We believe deeply in the power of traditional Indian ingredients. From Moringa and Ragi to Isabgol and Amla – these are not "exotic" ingredients. They are the ingredients your family has known for generations.
            </p>
            <p style={{ marginTop: 16 }}>
              Our job is simply to make them convenient for your modern lifestyle. That's why we formulate them into easy-to-mix nutrition powders, clearly labelled, free from artificial additives and honestly priced.
            </p>
            <div style={{ marginTop: 32 }}>
              <Link to="/ingredients" className="btn-primary" style={{ marginRight: 16 }}>Explore Ingredients</Link>
              <Link to="/shop" className="btn-secondary">Shop Now</Link>
            </div>
          </div>
          <div className="philosophy-img">
            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80" alt="Traditional Indian ingredients" />
          </div>
        </div>
      </section>
    </main>
  );
}

