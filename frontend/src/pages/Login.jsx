import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    if (isLogin) {
      const res = await login(username, password);
      if (res.success) navigate('/');
      else setError(res.message);
    } else {
      const res = await register(username, password);
      if (res.success) {
        setMessage('Account created! Please sign in.');
        setIsLogin(true);
      } else {
        setError(res.message);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      zIndex: 10,
      overflowY: 'auto',
    }}>
      <div className="auth-card animate-fade-in" style={{ position: 'relative', zIndex: 11 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '36px', marginBottom: '8px' }}>👟</div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {isLogin
              ? 'Sign in to access your orders and wishlist.'
              : 'Join SneakySneakers for exclusive drops and early access.'}
          </p>
        </div>

        {error && <div className="alert-error">{error}</div>}
        {message && <div className="alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="input-field"
              placeholder="e.g. sneakerhead99"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Your secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark w-full mt-6" style={{ padding: '14px' }} disabled={isSubmitting}>
            {isSubmitting ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}>
            {isLogin ? 'Register here' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
