import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Package, Gift } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, COMBO_PACK, PACKAGING_TYPES } from '../data/brandData';
import { useCart } from '../context/CartContext';
import './Shop.css';

const FILTERS = ['All', 'Digestive', 'Fibre', 'Iron', 'Calcium'];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { addComboToCart } = useCart();
  const [comboAdded, setComboAdded] = useState(false);

  const filtered = activeFilter === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

  // Calculate combo savings dynamically
  const comboSachetTotal = COMBO_PACK.productIds.reduce((sum, pid) => {
    const p = PRODUCTS.find(pr => pr.id === pid);
    return sum + (p ? p.prices.sachet : 0);
  }, 0);
  const comboSavings = comboSachetTotal > COMBO_PACK.price ? comboSachetTotal - COMBO_PACK.price : 0;

  const comboProducts = PRODUCTS.filter(p => COMBO_PACK.productIds.includes(p.id));

  const handleComboAdd = () => {
    addComboToCart(COMBO_PACK);
    setComboAdded(true);
    setTimeout(() => setComboAdded(false), 2000);
  };

  return (
    <main className="shop-page">
      {/* Filters */}
      <section className="shop-filters container">
        <h1 className="shop-heading">Our Products</h1>
        <div className="filter-row">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="shop-products container">
        <div className="shop-grid">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        {filtered.length === 0 && (
          <p className="no-results">No products match this filter.</p>
        )}
      </section>

      {/* Combo Pack */}
      <section className="combo-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Better Together</span>
            <h2 className="section-title">Combo Pack</h2>
            <p className="section-subtitle">Try all four NUTRICO products at a special price.</p>
          </div>

          <div className="combo-feature-card">
            <div className="combo-left">
              <div className="combo-emoji-grid">
                {comboProducts.map(p => (
                  <div key={p.id} className="combo-product-chip">
                    <span className="combo-chip-emoji">{p.emoji}</span>
                    <div>
                      <p className="combo-chip-name">{p.name}</p>
                      <p className="combo-chip-sub">{p.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="combo-right">
              {comboSavings > 0 && (
                <div className="combo-savings-badge">
                  <Gift size={14} /> Save ₹{comboSavings}
                </div>
              )}
              <h3 className="combo-title">{COMBO_PACK.name}</h3>
              <p className="combo-desc">{COMBO_PACK.description}</p>
              <p className="combo-includes">Includes 1 trial sachet of each product</p>

              <div className="combo-price-block">
                <span className="combo-price">₹{COMBO_PACK.price}</span>
                {comboSavings > 0 && (
                  <span className="combo-mrp">₹{comboSachetTotal}</span>
                )}
              </div>

              <button
                className={`btn-primary combo-add-btn${comboAdded ? ' added' : ''}`}
                onClick={handleComboAdd}
              >
                {comboAdded
                  ? '✓ Added to Cart!'
                  : <><ShoppingCart size={16} /> Add Combo to Cart – ₹{COMBO_PACK.price}</>
                }
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
