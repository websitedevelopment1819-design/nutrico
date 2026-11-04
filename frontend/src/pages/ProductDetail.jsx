import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { PRODUCTS, PACKAGING_TYPES } from '../data/brandData';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const PKG_ORDER = ['sachet', 'pouch10', 'pouch100'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === id);

  const [selectedPkg, setSelectedPkg] = useState('pouch100');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');

  if (!product) {
    return (
      <div className="not-found container">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>← Back to Shop</Link>
      </div>
    );
  }

  const price      = product.prices[selectedPkg];
  const totalPrice = price * qty;
  const pkg        = PACKAGING_TYPES[selectedPkg];

  const handleAdd = () => {
    addToCart(product, selectedPkg, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <main className="pd-page" style={{ '--accent': product.color, '--accent-bg': product.bgColor }}>
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="pd-layout">
          {/* ─── Image ─── */}
          <div className="pd-img-section">
            <div className="pd-img-wrap">
              <img src={product.image} alt={product.name} />
              <div className="pd-img-badge">{product.emoji}</div>
            </div>
            <div className="pd-trust-row">
              <span className="trust-chip">🌿 Natural</span>
              <span className="trust-chip">✨ No Additives</span>
              <span className="trust-chip">🇮🇳 Made for India</span>
            </div>
          </div>

          {/* ─── Info ─── */}
          <div className="pd-info">
            <p className="pd-cat">{product.subtitle}</p>
            <h1 className="pd-name">{product.name}</h1>
            <p className="pd-desc">{product.description}</p>

            {/* Packaging selector */}
            <div className="pd-field">
              <p className="pd-label">Choose Packaging</p>
              <div className="pkg-selector">
                {PKG_ORDER.map(pkgId => {
                  const p = PACKAGING_TYPES[pkgId];
                  return (
                    <button
                      key={pkgId}
                      className={`pkg-option${selectedPkg === pkgId ? ' active' : ''}`}
                      onClick={() => { setSelectedPkg(pkgId); setQty(1); }}
                    >
                      <span className="pkg-opt-label">{p.label}</span>
                      <span className="pkg-opt-weight">{p.weight}</span>
                      <span className="pkg-opt-price">₹{product.prices[pkgId]}</span>
                      <span className="pkg-opt-note">{p.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price */}
            <div className="pd-price-row">
              <span className="pd-price">₹{totalPrice.toLocaleString('en-IN')}</span>
              <span className="pd-per">(₹{price} × {qty})</span>
            </div>

            {/* Quantity */}
            <div className="pd-field">
              <p className="pd-label">Quantity</p>
              <div className="qty-row">
                <div className="qty-control-lg">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}><Plus size={16} /></button>
                </div>
                <span className="servings-info">{pkg.servings} per pack</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pd-ctas">
              <button
                className={`pd-add-btn${added ? ' added' : ''}`}
                onClick={handleAdd}
              >
                {added
                  ? <><Check size={18} /> Added to Cart!</>
                  : <><ShoppingCart size={18} /> Add to Cart – ₹{totalPrice.toLocaleString('en-IN')}</>
                }
              </button>
              <Link to="/checkout" className="pd-buy-btn" onClick={() => {
                addToCart(product, selectedPkg, qty);
              }}>
                Buy Now
              </Link>
            </div>

            {/* Tabs */}
            <div className="pd-tabs">
              {['benefits', 'ingredients', 'usage'].map(tab => (
                <button
                  key={tab}
                  className={`pd-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="pd-tab-content">
              {activeTab === 'benefits' && (
                <ul className="benefits-list">
                  {product.benefits.map((b, i) => (
                    <li key={i}><Check size={15} className="chk" /> {b}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'ingredients' && (
                <div className="ing-list">
                  {product.ingredients.map((ing, i) => (
                    <div key={i} className="ing-row">
                      <div className="ing-dot" />
                      <div>
                        <p className="ing-name">{ing.name}</p>
                        <p className="ing-benefit">{ing.benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'usage' && (
                <div className="usage-box">
                  <span className="usage-ico">📋</span>
                  <p>{product.usage}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="related-section">
          <h2 className="section-title related-heading">You May Also Like</h2>
          <div className="related-grid">
            {relatedProducts.map(p => (
              <Link key={p.id} to={`/shop/${p.id}`} className="related-card">
                <div className="related-img" style={{ background: p.bgColor }}>
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="related-body">
                  <p className="related-sub">{p.subtitle}</p>
                  <h4 className="related-name">{p.name}</h4>
                  <p className="related-price">from ₹{Math.min(...Object.values(p.prices))}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
