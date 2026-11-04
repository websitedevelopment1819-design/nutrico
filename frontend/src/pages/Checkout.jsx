import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Trash2, Minus, Plus, Check, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PACKAGING_TYPES, RAZORPAY_CONFIG } from '../data/brandData';
import './Checkout.css';

function pkgLabel(id) {
  if (id === 'combo') return 'Combo Pack';
  return PACKAGING_TYPES[id]?.label ?? id;
}

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
};

function validateForm(f) {
  const errors = {};
  if (!f.name.trim()) errors.name = 'Name is required';
  if (!/^[6-9]\d{9}$/.test(f.phone)) errors.phone = 'Enter a valid 10-digit mobile number';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = 'Enter a valid email';
  if (!f.address.trim() || f.address.trim().length < 10) errors.address = 'Enter your full delivery address';
  if (!f.city.trim()) errors.city = 'City is required';
  if (!f.state.trim()) errors.state = 'State is required';
  if (!/^\d{6}$/.test(f.pincode)) errors.pincode = 'Enter a valid 6-digit pincode';
  return errors;
}

export default function Checkout() {
  const { cartItems, subtotal, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [transactionId, setTransactionId] = useState('');
  const [paying, setPaying] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: undefined }));
  };

  // ── Razorpay payment (test mode) ──
  const initiatePayment = () => {
    const formErrors = validateForm(form);
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    // Check if Razorpay script is loaded
    if (typeof window.Razorpay === 'undefined') {
      alert(
        'Razorpay payment gateway is not loaded.\n\n' +
        'To enable payments:\n' +
        '1. Add your Razorpay Key ID in src/data/brandData.js\n' +
        '2. Add the Razorpay script tag to index.html\n\n' +
        'See the setup guide in the project README.'
      );
      return;
    }

    setPaying(true);

    const options = {
      key: RAZORPAY_CONFIG.key_id,
      amount: subtotal * 100, // Razorpay expects paise
      currency: RAZORPAY_CONFIG.currency,
      name: RAZORPAY_CONFIG.name,
      description: RAZORPAY_CONFIG.description,
      image: RAZORPAY_CONFIG.image,
      // ⚠️ In production, generate order_id on your backend
      // order_id: 'order_xxxxxxxxx',
      handler: function (response) {
        // response.razorpay_payment_id
        // response.razorpay_order_id (if order_id was set)
        // response.razorpay_signature (if order_id was set)
        // ⚠️ Verify payment on your backend before confirming
        setPaying(false);
        setOrderPlaced(true);
        clearCart();
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      notes: {
        address: `${form.address}, ${form.city}, ${form.state} – ${form.pincode}`,
      },
      theme: RAZORPAY_CONFIG.theme,
      modal: {
        ondismiss: () => setPaying(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', () => {
      setPaying(false);
      alert('Payment failed. Please try again.');
    });
    rzp.open();
  };
  // ── WhatsApp ordering ──
  const orderOnWhatsApp = () => {
    const formErrors = validateForm(form);

    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    const message = `
Hello NUTRICO! I want to place an order.

Customer: ${form.name}
Mobile: ${form.phone}
Email: ${form.email}

Delivery Address:
${form.address}, ${form.city}, ${form.state} - ${form.pincode}

Order Details:
${cartItems.map(item =>
      `${item.name} (${pkgLabel(item.packagingId)}) x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n')}

Total: ₹${subtotal}
UPI Transaction ID: ${transactionId}
Please confirm my order. Thank you!
`;

    const whatsappURL =
      `https://wa.me/917015310549?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, '_blank');
  };
  // ── Order placed view ──
  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="order-success">
            <div className="success-circle"><Check size={48} /></div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for choosing NUTRICO. You'll receive a confirmation shortly.</p>
            <p className="success-note">
              Thank you for supporting NUTRICO.
            </p>
            <Link to="/shop" className="btn-primary" style={{ marginTop: 20 }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Empty cart ──
  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="container">
          <div className="checkout-empty">
            <ShoppingBag size={48} className="empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Add some NUTRICO products before checking out.</p>
            <Link to="/shop" className="btn-primary" style={{ marginTop: 16 }}>
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <button className="back-link" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          {/* ─── Left: Form ─── */}
          <div className="checkout-form-col">
            <h2 className="co-section-title">Delivery Details</h2>

            <div className="co-form">
              <div className="co-row">
                <div className="co-field">
                  <label htmlFor="co-name">Full Name *</label>
                  <input id="co-name" name="name" value={form.name} onChange={handleChange} placeholder="Priya Sharma" className={errors.name ? 'error' : ''} />
                  {errors.name && <p className="field-error"><AlertCircle size={12} /> {errors.name}</p>}
                </div>
                <div className="co-field">
                  <label htmlFor="co-phone">Mobile Number *</label>
                  <div className="phone-input">
                    <span className="phone-prefix">+91</span>
                    <input id="co-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" maxLength={10} className={errors.phone ? 'error' : ''} />
                  </div>
                  {errors.phone && <p className="field-error"><AlertCircle size={12} /> {errors.phone}</p>}
                </div>
              </div>

              <div className="co-field">
                <label htmlFor="co-email">Email Address *</label>
                <input id="co-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="priya@example.com" className={errors.email ? 'error' : ''} />
                {errors.email && <p className="field-error"><AlertCircle size={12} /> {errors.email}</p>}
              </div>

              <div className="co-field">
                <label htmlFor="co-address">Delivery Address *</label>
                <textarea id="co-address" name="address" value={form.address} onChange={handleChange} rows={3} placeholder="House/Flat, Street, Landmark" className={errors.address ? 'error' : ''} />
                {errors.address && <p className="field-error"><AlertCircle size={12} /> {errors.address}</p>}
              </div>

              <div className="co-row co-row-3">
                <div className="co-field">
                  <label htmlFor="co-city">City *</label>
                  <input id="co-city" name="city" value={form.city} onChange={handleChange} placeholder="Mumbai" className={errors.city ? 'error' : ''} />
                  {errors.city && <p className="field-error"><AlertCircle size={12} /> {errors.city}</p>}
                </div>
                <div className="co-field">
                  <label htmlFor="co-state">State *</label>
                  <input id="co-state" name="state" value={form.state} onChange={handleChange} placeholder="Maharashtra" className={errors.state ? 'error' : ''} />
                  {errors.state && <p className="field-error"><AlertCircle size={12} /> {errors.state}</p>}
                </div>
                <div className="co-field">
                  <label htmlFor="co-pincode">Pincode *</label>
                  <input id="co-pincode" name="pincode" value={form.pincode} onChange={handleChange} placeholder="400001" maxLength={6} className={errors.pincode ? 'error' : ''} />
                  {errors.pincode && <p className="field-error"><AlertCircle size={12} /> {errors.pincode}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right: Summary ─── */}
          <div className="checkout-summary-col">
            <div className="summary-card">
              <h2 className="co-section-title">Order Summary</h2>

              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.key} className="summary-item">
                    <div className="summary-item-top">
                      <span className="si-emoji">{item.emoji}</span>
                      <div className="si-info">
                        <p className="si-name">{item.name}</p>
                        <p className="si-pkg">{pkgLabel(item.packagingId)}</p>
                      </div>
                      <button className="si-remove" onClick={() => removeFromCart(item.key)} aria-label="Remove">
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="summary-item-bottom">
                      <div className="si-qty">
                        <button onClick={() => updateQuantity(item.key, item.quantity - 1)}><Minus size={12} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.key, item.quantity + 1)}><Plus size={12} /></button>
                      </div>
                      <p className="si-total">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="st-row">
                  <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="st-row">
                  <span>Shipping</span>
                  <span className="st-tbd">Calculated after confirmation</span>
                </div>
                <div className="st-row st-total">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment CTAs */}
              <div className="upi-payment-box">
                <h3>Pay with Google Pay</h3>
                <p>Use this UPI number to make your payment:</p>

                <h2>7015310549</h2>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('7015310549');
                    alert('UPI number copied!');
                  }}
                >
                  Copy UPI Number
                </button>

                <p>
                  Amount: ₹{subtotal.toLocaleString('en-IN')}
                </p>

                <p>
                  Open Google Pay, enter the number, verify the recipient
                  and complete your payment.
                  <div className="co-field" style={{ marginTop: '16px' }}>
                    <label htmlFor="transactionId">
                      UPI Transaction ID
                    </label>

                    <input
                      id="transactionId"
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="Enter your UPI transaction ID"
                    />

                    <p className="checkout-disclaimer">
                      Enter the transaction ID shown in Google Pay after payment.
                    </p>
                  </div>
                </p>
              </div>
              <button
                type="button"
                className="pay-btn"
                style={{
                  backgroundColor: '#25D366',
                  marginTop: '12px'
                }}
                onClick={orderOnWhatsApp}
              >
                Order via WhatsApp
              </button>

              <p className="checkout-disclaimer">
                By placing your order you agree to our terms and conditions. All products are food supplements. UPI payments must be verified before your order is confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <label htmlFor="transactionId">
        UPI Transaction ID *
      </label>

      <input
        id="transactionId"
        type="text"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        placeholder="Enter your UPI transaction ID"
      />
      <p className="checkout-disclaimer">
        Enter the transaction ID shown in Google Pay after payment.
      </p>
    </main>

  );
}

