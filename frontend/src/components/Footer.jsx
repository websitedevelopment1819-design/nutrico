
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { BRAND, PRODUCTS } from '../data/brandData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <Leaf size={22} />
            <span>NUTRICO</span>
          </Link>

          <p className="footer-tagline">{BRAND.tagline}</p>

          <p className="footer-desc">
            Premium Indian wellness nutrition powders crafted with traditional ingredients and modern science.
          </p>
        </div>

        <div className="footer-col">
          <h4>Our Products</h4>
          <ul>
            {PRODUCTS.map(p => (
              <li key={p.id}>
                <Link to={`/shop/${p.id}`}>{p.name}</Link>
              </li>
            ))}
            <li><Link to="/shop">All Products</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/ingredients">Ingredients</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom container">
        <p>© {new Date().getFullYear()} NUTRICO. All rights reserved.</p>

        <p className="footer-disclaimer">
          Our products are food supplements. They are not intended to diagnose, treat, cure or prevent any disease. Always read the label and consume as part of a balanced diet.
        </p>
      </div>
    </footer>
  );
}
