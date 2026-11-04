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
          <div className="footer-social">
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{display:'flex'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
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
