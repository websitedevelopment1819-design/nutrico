import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/ingredients', label: 'Ingredients' },
  { to: '/about', label: 'About Us' },
];

export default function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo">
          <Leaf size={22} strokeWidth={2.5} />
          <span>NUTRICO</span>
        </Link>

        <nav className="navbar-links">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <button className="cart-btn" onClick={() => setIsCartOpen(true)} aria-label="Open cart">
            <ShoppingCart size={22} />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>
          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu${isMenuOpen ? ' open' : ''}`}>
        <nav className="mobile-links">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="mobile-cart-btn" onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }}>
          <ShoppingCart size={18} />
          View Cart {itemCount > 0 && `(${itemCount})`}
        </button>
      </div>
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}
    </header>
  );
}

