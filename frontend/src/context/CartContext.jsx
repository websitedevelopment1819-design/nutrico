import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'nutrico_cart';

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch { /* storage full or private mode */ }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist to localStorage on every change
  useEffect(() => { saveCart(cartItems); }, [cartItems]);

  // key = productId-packagingId  (e.g. "digestease-pouch100")
  const addToCart = useCallback((product, packagingId, qty = 1) => {
    const key = `${product.id}-${packagingId}`;
    setCartItems(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i =>
          i.key === key ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          packagingId,
          price: product.prices[packagingId],
          emoji: product.emoji,
          color: product.color,
          quantity: qty,
        },
      ];
    });
    setIsCartOpen(true);
  }, []);

  const addComboToCart = useCallback((combo) => {
    const key = combo.id;
    setCartItems(prev => {
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i =>
          i.key === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          key,
          productId: combo.id,
          name: combo.name,
          packagingId: 'combo',
          price: combo.price,
          emoji: combo.emoji,
          color: combo.color,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((key) => {
    setCartItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(i => i.key !== key));
    } else {
      setCartItems(prev => prev.map(i => i.key === key ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      addComboToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      itemCount,
      isCartOpen,
      setIsCartOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
