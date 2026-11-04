
import { useState, useEffect } from 'react';
import { ShoppingCart, Gift } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, COMBO_PACK } from '../data/brandData';
import { useCart } from '../context/CartContext';
import API_URL from '../services/api';
import './Shop.css';

const FILTERS = ['All', 'Digestive', 'Fibre', 'Iron', 'Calcium'];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [backendProducts, setBackendProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addComboToCart } = useCart();
  const [comboAdded, setComboAdded] = useState(false);

  // Load product list from backend
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/api/products`);

        if (!response.ok) {
          throw new Error('Could not load products from backend.');
        }

        const data = await response.json();

        if (!data.success || !Array.isArray(data.products)) {
          throw new Error('Invalid product data received.');
        }

        setBackendProducts(data.products);
        setError('');
      } catch (err) {
        console.error('Product loading error:', err);
        setError('Unable to load products. Please check that the backend is running.');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Use backend product IDs while preserving
  // complete product details and prices from brandData.js
  const availableProducts = backendProducts
    .map(serverProduct =>
      PRODUCTS.find(product => product.id === serverProduct.id)
    )
    .filter(Boolean);

  const filtered = activeFilter === 'All'
    ? availableProducts
    : availableProducts.filter(product =>
      product.tags.some(tag =>
        tag.toLowerCase().includes(activeFilter.toLowerCase())
      )
    );

  // Calculate combo savings
  const comboSachetTotal = COMBO_PACK.productIds.reduce((sum, pid) => {
    const product = PRODUCTS.find(item => item.id === pid);
    return sum + (product ? product.prices.sachet : 0);
  }, 0);

  const comboSavings =
    comboSachetTotal > COMBO_PACK.price
      ? comboSachetTotal - COMBO_PACK.price
      : 0;

  const comboProducts = PRODUCTS.filter(product =>
    COMBO_PACK.productIds.includes(product.id)
  );

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
          {FILTERS.map(filter => (
            <button
              key={filter}
              className={`filter-btn${activeFilter === filter ? ' active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="shop-products container">

        {loading && (
          <p className="no-results">Loading NUTRICO products...</p>
        )}

        {error && (
          <p className="no-results">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="shop-grid">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="no-results">
                No products match this filter.
              </p>
            )}
          </>
        )}
      </section>

      {/* Combo Pack */}
      <section className="combo-section">
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Better Together</span>
            <h2 className="section-title">Combo Pack</h2>
            <p className="section-subtitle">
              Try all four NUTRICO products at a special price.
            </p>
          </div>

          <div className="combo-feature-card">
            <div className="combo-left">
              <div className="combo-emoji-grid">
                {comboProducts.map(product => (
                  <div
                    key={product.id}
                    className="combo-product-chip"
                  >
                    <span className="combo-chip-emoji">
                      {product.emoji}
                    </span>
                    <div>
                      <p className="combo-chip-name">
                        {product.name}
                      </p>
                      <p className="combo-chip-sub">
                        {product.subtitle}
                      </p>
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
              <p className="combo-desc">
                {COMBO_PACK.description}
              </p>
              <p className="combo-includes">
                Includes 1 trial sachet of each product
              </p>

              <div className="combo-price-block">
                <span className="combo-price">
                  ₹{COMBO_PACK.price}
                </span>

                {comboSavings > 0 && (
                  <span className="combo-mrp">
                    ₹{comboSachetTotal}
                  </span>
                )}
              </div>

              <button
                className={`btn-primary combo-add-btn${comboAdded ? ' added' : ''}`}
                onClick={handleComboAdd}
              >
                {comboAdded
                  ? '✓ Added to Cart!'
                  : <>
                    <ShoppingCart size={16} />
                    Add Combo to Cart – ₹{COMBO_PACK.price}
                  </>
                }
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
