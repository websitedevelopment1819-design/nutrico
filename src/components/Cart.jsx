import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PACKAGING_TYPES } from '../data/brandData';
import './Cart.css';

function pkgLabel(id) {
  if (id === 'combo') return 'Combo Pack';
  return PACKAGING_TYPES[id]?.label ?? id;
}

export default function Cart() {
  const {
    cartItems, isCartOpen, setIsCartOpen,
    removeFromCart, updateQuantity,
    subtotal, itemCount, clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer" role="dialog" aria-label="Shopping cart">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={20} />
            <h3>Your Cart{itemCount > 0 && <span className="cart-count">{itemCount}</span>}</h3>
          </div>
          <button className="cart-close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
              <span>Add some NUTRICO products to get started!</span>
              <button className="btn-primary" onClick={() => setIsCartOpen(false)}>Shop Now</button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.key} className="cart-item" style={{ '--c': item.color }}>
                  <div className="cart-item-emoji">{item.emoji}</div>
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-pkg">{pkgLabel(item.packagingId)}</p>
                    <p className="cart-item-price">
                      ₹{item.price} × {item.quantity} = <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                    </p>
                  </div>
                  <div className="cart-item-controls">
                    <div className="qty-ctrl">
                      <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease qty"><Minus size={13} /></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase qty"><Plus size={13} /></button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.key)} aria-label="Remove item">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal-row">
              <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
              <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
            </div>
            <p className="cart-note">Shipping calculated at checkout</p>

            <Link
              to="/checkout"
              className="checkout-btn"
              onClick={() => setIsCartOpen(false)}
            >
              Proceed to Checkout →
            </Link>

            <button className="clear-cart-btn" onClick={clearCart}>
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
