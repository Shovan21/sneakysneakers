import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="app-container">
        <div className="empty-state animate-fade-in" style={{ paddingTop: '100px' }}>
          <div className="empty-state-icon"><ShoppingBag size={64} strokeWidth={1} /></div>
          <h3>Your bag is empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/" className="btn btn-dark">Browse Collection</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container cart-page animate-fade-in">
      <div style={{ marginBottom: '32px' }}>
        <p className="label-tag" style={{ color: 'var(--accent-gold)', marginBottom: '6px' }}>Review & Checkout</p>
        <h2 className="section-title">Your Bag</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="cart-grid">
        {/* Items */}
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-img">
                {item.imageUrl
                  ? <img src={item.imageUrl} alt={item.name} />
                  : '👟'
                }
              </div>

              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cat">{item.category}</div>
                <div style={{ marginTop: '4px', fontWeight: '700', color: 'var(--accent-gold)' }}>
                  ₹{item.price.toFixed(2)}
                </div>
              </div>

              <div className="qty-control">
                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>
                  <Minus size={13} />
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>
                  <Plus size={13} />
                </button>
              </div>

              <div style={{ fontWeight: '700', minWidth: '70px', textAlign: 'right' }}>
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <button
            onClick={clearCart}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', textDecoration: 'underline', textUnderlineOffset: '3px' }}
          >
            Remove all items
          </button>
        </div>

        {/* Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span style={{ color: '#16a34a' }}>Free</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (GST 18%)</span>
            <span>₹{(getCartTotal() * 0.18).toFixed(2)}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{(getCartTotal() * 1.18).toFixed(2)}</span>
          </div>

          <button
            className="btn btn-dark w-full"
            style={{ marginTop: '24px', padding: '16px' }}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>

          <Link to="/" className="btn btn-ghost w-full" style={{ marginTop: '10px', padding: '12px', justifyContent: 'center', display: 'flex' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
