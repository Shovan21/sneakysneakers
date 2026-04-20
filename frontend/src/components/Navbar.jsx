import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import SneakySneakersLogo from './Logo';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <SneakySneakersLogo size={40} showText={true} />
      </Link>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">Shop</Link>

        <Link to="/cart" className="navbar-cart" style={{ marginLeft: '8px' }}>
          <ShoppingBag size={18} />
          {getCartCount() > 0 && (
            <span className="cart-badge">{getCartCount()}</span>
          )}
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '0 8px' }}>
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-ghost"
              style={{ padding: '8px 16px', fontSize: '0.8rem' }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-dark" style={{ marginLeft: '8px', padding: '9px 22px' }}>
            <User size={14} /> Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
