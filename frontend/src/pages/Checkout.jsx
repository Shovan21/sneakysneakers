import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { CheckCircle, CreditCard, Smartphone, Package, ChevronRight, Lock, ArrowLeft } from 'lucide-react';

const STEPS = ['Delivery', 'Payment', 'Confirmation'];

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // 0=Delivery, 1=Payment, 2=Confirmed
  const [payMethod, setPayMethod] = useState('card'); // card | upi | cod
  const [placing, setPlacing] = useState(false);
  const [errors, setErrors] = useState({});

  const subtotal = getCartTotal();
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  // Delivery form
  const [delivery, setDelivery] = useState({
    fullName: '', phone: '', email: '',
    address: '', city: '', state: '', pincode: '',
  });

  // Payment form
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  const formatCard = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) =>
    val.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');

  // ── Validation ──
  const validateDelivery = () => {
    const e = {};
    if (!delivery.fullName.trim())  e.fullName = 'Required';
    if (!/^\d{10}$/.test(delivery.phone)) e.phone = 'Enter valid 10-digit number';
    if (!/\S+@\S+\.\S+/.test(delivery.email)) e.email = 'Enter valid email';
    if (!delivery.address.trim()) e.address = 'Required';
    if (!delivery.city.trim())    e.city = 'Required';
    if (!delivery.state.trim())   e.state = 'Required';
    if (!/^\d{6}$/.test(delivery.pincode)) e.pincode = 'Enter valid 6-digit PIN';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e = {};
    if (payMethod === 'card') {
      if (card.number.replace(/\s/g, '').length !== 16) e.number = 'Enter 16-digit card number';
      if (!card.name.trim())  e.name = 'Required';
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) e.expiry = 'Format MM/YY';
      if (!/^\d{3,4}$/.test(card.cvv)) e.cvv = '3 or 4 digits';
    }
    if (payMethod === 'upi') {
      if (!upiId.includes('@')) e.upiId = 'Enter valid UPI ID (e.g. name@upi)';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 0 && validateDelivery()) setStep(1);
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;
    setPlacing(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 1800));
    clearCart();
    setPlacing(false);
    setStep(2);
  };

  if (cart.length === 0 && step !== 2) {
    navigate('/cart');
    return null;
  }

  // ── STEP INDICATOR ──
  const StepBar = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '36px' }}>
      {STEPS.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: i <= step ? 'var(--text-primary)' : 'var(--bg-surface)',
              border: '2px solid',
              borderColor: i <= step ? 'var(--text-primary)' : 'var(--border-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 700,
              color: i <= step ? 'white' : 'var(--text-muted)',
              transition: 'all 0.3s ease',
            }}>
              {i < step ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: i <= step ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {s}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < step ? 'var(--text-primary)' : 'var(--border-color)', margin: '0 8px', marginBottom: '22px', transition: 'background 0.4s ease' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // ── ORDER SUMMARY SIDEBAR ──
  const OrderSummary = () => (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '16px' }}>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ width: 48, height: 48, borderRadius: 6, background: 'var(--bg-surface)', overflow: 'hidden', flexShrink: 0 }}>
              {item.imageUrl
                ? <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>👟</span>
              }
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>₹{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
      <div className="summary-row"><span>Shipping</span><span style={{ color: '#16a34a' }}>Free</span></div>
      <div className="summary-row"><span>GST (18%)</span><span>₹{gst.toFixed(2)}</span></div>
      <div className="summary-total"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
        <Lock size={12} /> SSL secured · 256-bit encryption
      </div>
    </div>
  );

  // ── FIELD HELPER ──
  const Field = ({ label, error, children }) => (
    <div className="form-group" style={{ marginBottom: '16px' }}>
      <label className="form-label">{label}</label>
      {children}
      {error && <span style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '4px', display: 'block' }}>{error}</span>}
    </div>
  );

  // ── CONFIRMED SCREEN ──
  if (step === 2) {
    return (
      <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, padding: '24px' }}>
        <div className="auth-card animate-fade-in" style={{ maxWidth: '480px', textAlign: 'center', padding: '56px 40px' }}>
          <div style={{ fontSize: 72, marginBottom: '16px' }}>🎉</div>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={36} color="#16a34a" />
          </div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Order Confirmed!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '8px' }}>
            Thank you for shopping at SneakySneakers. Your kicks are on their way!
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '32px' }}>
            Estimated delivery: <strong>3–5 business days</strong>
          </p>
          <div style={{ background: 'var(--bg-surface)', borderRadius: 8, padding: '16px', marginBottom: '32px', textAlign: 'left' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Delivering to</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{delivery.fullName}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{delivery.address}, {delivery.city}, {delivery.state} – {delivery.pincode}</div>
          </div>
          <Link to="/" className="btn btn-dark w-full" style={{ justifyContent: 'center', display: 'flex', padding: '14px' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          <ArrowLeft size={14} /> Back to Cart
        </Link>
        <p className="label-tag" style={{ color: 'var(--accent-gold)', marginBottom: '6px' }}>Secure Checkout</p>
        <h2 className="section-title">Complete Your Order</h2>
      </div>

      <StepBar />

      <div className="cart-grid">
        {/* ── LEFT PANEL ── */}
        <div>

          {/* STEP 0: DELIVERY */}
          {step === 0 && (
            <div className="auth-card animate-fade-in" style={{ maxWidth: '100%', padding: '32px' }}>
              <h3 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>📦 Delivery Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Field label="Full Name" error={errors.fullName}>
                  <input className="input-field" placeholder="Ravi Kumar" value={delivery.fullName}
                    onChange={e => setDelivery({ ...delivery, fullName: e.target.value })} />
                </Field>
                <Field label="Phone Number" error={errors.phone}>
                  <input className="input-field" placeholder="9876543210" maxLength={10} value={delivery.phone}
                    onChange={e => setDelivery({ ...delivery, phone: e.target.value.replace(/\D/g, '') })} />
                </Field>
              </div>
              <Field label="Email Address" error={errors.email}>
                <input className="input-field" type="email" placeholder="ravi@example.com" value={delivery.email}
                  onChange={e => setDelivery({ ...delivery, email: e.target.value })} />
              </Field>
              <Field label="Street Address" error={errors.address}>
                <input className="input-field" placeholder="House no., Street name, Area" value={delivery.address}
                  onChange={e => setDelivery({ ...delivery, address: e.target.value })} />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 16px' }}>
                <Field label="City" error={errors.city}>
                  <input className="input-field" placeholder="Bhubaneswar" value={delivery.city}
                    onChange={e => setDelivery({ ...delivery, city: e.target.value })} />
                </Field>
                <Field label="State" error={errors.state}>
                  <input className="input-field" placeholder="Odisha" value={delivery.state}
                    onChange={e => setDelivery({ ...delivery, state: e.target.value })} />
                </Field>
                <Field label="PIN Code" error={errors.pincode}>
                  <input className="input-field" placeholder="751024" maxLength={6} value={delivery.pincode}
                    onChange={e => setDelivery({ ...delivery, pincode: e.target.value.replace(/\D/g, '') })} />
                </Field>
              </div>
              <button className="btn btn-dark w-full" style={{ marginTop: '8px', padding: '14px' }} onClick={handleNext}>
                Continue to Payment <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 1: PAYMENT */}
          {step === 1 && (
            <div className="auth-card animate-fade-in" style={{ maxWidth: '100%', padding: '32px' }}>
              <h3 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>💳 Payment Method</h3>

              {/* Method selector */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '10px', marginBottom: '28px' }}>
                {[
                  { id: 'card', icon: <CreditCard size={20} />, label: 'Card' },
                  { id: 'upi',  icon: <Smartphone size={20} />, label: 'UPI' },
                  { id: 'cod',  icon: <Package size={20} />,    label: 'Cash on Delivery' },
                ].map(m => (
                  <button key={m.id} onClick={() => { setPayMethod(m.id); setErrors({}); }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                      padding: '18px 12px',
                      border: '1.5px solid',
                      borderColor: payMethod === m.id ? 'var(--text-primary)' : 'var(--border-color)',
                      borderRadius: '10px',
                      background: payMethod === m.id ? 'var(--bg-surface)' : 'transparent',
                      cursor: 'pointer', fontFamily: 'inherit',
                      fontSize: '0.8rem', fontWeight: 600,
                      color: payMethod === m.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                      transition: 'all 0.2s ease',
                    }}>
                    {m.icon} {m.label}
                  </button>
                ))}
              </div>

              {/* Card form */}
              {payMethod === 'card' && (
                <div className="animate-fade-in">
                  <Field label="Card Number" error={errors.number}>
                    <input className="input-field" placeholder="1234 5678 9012 3456" value={card.number}
                      onChange={e => setCard({ ...card, number: formatCard(e.target.value) })} />
                  </Field>
                  <Field label="Name on Card" error={errors.name}>
                    <input className="input-field" placeholder="RAVI KUMAR" value={card.name}
                      onChange={e => setCard({ ...card, name: e.target.value.toUpperCase() })} />
                  </Field>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                    <Field label="Expiry (MM/YY)" error={errors.expiry}>
                      <input className="input-field" placeholder="08/27" value={card.expiry}
                        onChange={e => setCard({ ...card, expiry: formatExpiry(e.target.value) })} />
                    </Field>
                    <Field label="CVV" error={errors.cvv}>
                      <input className="input-field" placeholder="•••" maxLength={4} type="password" value={card.cvv}
                        onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '') })} />
                    </Field>
                  </div>
                </div>
              )}

              {/* UPI form */}
              {payMethod === 'upi' && (
                <div className="animate-fade-in">
                  <Field label="UPI ID" error={errors.upiId}>
                    <input className="input-field" placeholder="yourname@upi" value={upiId}
                      onChange={e => setUpiId(e.target.value)} />
                  </Field>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    You'll receive a payment request on your UPI app. Approve it to confirm the order.
                  </p>
                </div>
              )}

              {/* COD */}
              {payMethod === 'cod' && (
                <div className="animate-fade-in" style={{ background: 'var(--bg-surface)', borderRadius: '10px', padding: '20px', marginBottom: '16px' }}>
                  <p style={{ fontWeight: 600, marginBottom: '6px' }}>Cash on Delivery</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    Pay in cash when your order is delivered. No extra charges. Available across India.
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button className="btn btn-ghost" style={{ padding: '12px 20px' }} onClick={() => setStep(0)}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  className="btn btn-dark w-full"
                  style={{ padding: '14px', opacity: placing ? 0.7 : 1 }}
                  onClick={handlePlaceOrder}
                  disabled={placing}
                >
                  {placing ? '⏳ Processing…' : `Place Order · ₹${total.toFixed(2)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT PANEL: ORDER SUMMARY ── */}
        <OrderSummary />
      </div>
    </div>
  );
};

export default Checkout;
