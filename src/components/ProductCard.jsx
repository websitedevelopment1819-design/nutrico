import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PACKAGING_TYPES } from '../data/brandData';
import './ProductCard.css';

const PACKAGING_ORDER = ['sachet', 'pouch10', 'pouch100'];

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedPkg, setSelectedPkg] = useState('pouch100');
  const [added, setAdded] = useState(false);

  const price = product.prices[selectedPkg];

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, selectedPkg);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pcard" style={{ '--accent': product.color, '--accent-bg': product.bgColor }}>
      <Link to={`/shop/${product.id}`} className="pcard-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="pcard-tags">
          {product.tags.slice(0, 2).map(t => <span key={t} className="pcard-tag">{t}</span>)}
        </div>
        <div className="pcard-hover-overlay">
          <span><Eye size={16} /> Quick View</span>
        </div>
      </Link>

      <div className="pcard-body">
        <p className="pcard-subtitle">{product.subtitle}</p>
        <h3 className="pcard-name">{product.name}</h3>
        <p className="pcard-desc">{product.shortDesc}</p>

        {/* Packaging tabs */}
        <div className="pcard-pkg-tabs">
          {PACKAGING_ORDER.map(pkgId => (
            <button
              key={pkgId}
              className={`pkg-tab${selectedPkg === pkgId ? ' active' : ''}`}
              onClick={(e) => { e.preventDefault(); setSelectedPkg(pkgId); }}
              title={PACKAGING_TYPES[pkgId].note}
            >
              <span className="pkg-tab-label">{PACKAGING_TYPES[pkgId].label}</span>
              <span className="pkg-tab-price">₹{product.prices[pkgId]}</span>
            </button>
          ))}
        </div>

        <div className="pcard-footer">
          <div className="pcard-price-block">
            <span className="pcard-current">₹{price}</span>
            <span className="pcard-weight">{PACKAGING_TYPES[selectedPkg].weight}</span>
          </div>
          <button
            className={`pcard-add${added ? ' added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? '✓ Added!' : <><ShoppingCart size={15} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}
