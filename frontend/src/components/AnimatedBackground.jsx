import React, { useEffect, useRef } from 'react';

// Animated floating particles + orbs background
const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle config
    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3.5 + 0.8,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.35 + 0.08,
      // Alternate between gold, terracotta, steel-blue
      color: [
        `rgba(201,168,76,`,
        `rgba(192,103,79,`,
        `rgba(130,150,180,`,
        `rgba(180,160,120,`,
      ][i % 4],
    }));

    // Large slow-moving gradient blobs
    const blobs = [
      { x: window.innerWidth * 0.8, y: -80,  r: 340, dx: 0.18, dy: 0.12, color: [201, 168, 76,  0.10] },
      { x: -80,  y: window.innerHeight * 0.7, r: 280, dx: 0.14, dy: -0.10, color: [192, 103, 79,  0.09] },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5, r: 220, dx: -0.12, dy: 0.08, color: [100, 140, 200, 0.07] },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw blobs
      blobs.forEach((b) => {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x > canvas.width + b.r)  b.x = -b.r;
        if (b.x < -b.r)                b.x = canvas.width + b.r;
        if (b.y > canvas.height + b.r) b.y = -b.r;
        if (b.y < -b.r)               b.y = canvas.height + b.r;

        const [r, g, bC, a] = b.color;
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0,   `rgba(${r},${g},${bC},${a})`);
        grad.addColorStop(1,   `rgba(${r},${g},${bC},0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Draw particles
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x > canvas.width + 5)  p.x = -5;
        if (p.x < -5)                p.x = canvas.width + 5;
        if (p.y > canvas.height + 5) p.y = -5;
        if (p.y < -5)               p.y = canvas.height + 5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default AnimatedBackground;
