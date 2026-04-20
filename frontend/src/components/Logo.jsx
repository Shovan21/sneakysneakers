import React from 'react';

const SneakySneakersLogo = ({ size = 36, showText = true }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    {/* SVG Logo Mark */}
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="#1a1a1a" />

      {/* Sneaker sole */}
      <path
        d="M10 42 C10 42 14 46 32 46 C50 46 56 42 56 42 L56 44 C56 44 50 48 32 48 C14 48 8 44 8 44 Z"
        fill="#c9a84c"
      />

      {/* Sneaker body / upper */}
      <path
        d="M12 42 L14 30 C14 30 18 26 24 25 L38 24 C38 24 44 24 48 28 L54 42 Z"
        fill="#f5f5f5"
      />

      {/* Toe box */}
      <path
        d="M12 42 L14 34 C14 34 16 30 20 29 L26 28 L22 42 Z"
        fill="#e8e8e8"
      />

      {/* Swoosh / accent stripe */}
      <path
        d="M22 36 C26 32 34 30 44 32 L48 34 C48 34 40 30 28 35 Z"
        fill="#c9a84c"
        opacity="0.9"
      />

      {/* Laces area */}
      <rect x="26" y="25" width="2" height="14" rx="1" fill="#c9a84c" opacity="0.6" />
      <rect x="30" y="24.5" width="2" height="15" rx="1" fill="#c9a84c" opacity="0.6" />
      <rect x="34" y="24.5" width="2" height="15" rx="1" fill="#c9a84c" opacity="0.6" />
      <rect x="38" y="25" width="2" height="14" rx="1" fill="#c9a84c" opacity="0.6" />

      {/* Heel tab */}
      <rect x="50" y="28" width="4" height="12" rx="2" fill="#c9a84c" />

      {/* Motion lines */}
      <line x1="6" y1="35" x2="11" y2="35" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <line x1="4" y1="39" x2="10" y2="39" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="6" y1="43" x2="11" y2="43" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </svg>

    {/* Wordmark */}
    {showText && (
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800,
        fontSize: `${size * 0.56}px`,
        letterSpacing: '-0.04em',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #444 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1,
        userSelect: 'none',
      }}>
        Sneaky<span style={{
          background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96e 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Sneakers</span>
      </span>
    )}
  </div>
);

export default SneakySneakersLogo;
