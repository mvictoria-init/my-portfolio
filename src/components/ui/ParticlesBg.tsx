import React, { useRef, useEffect } from 'react';

// Pastel / iridescent palette inspired by the sample
const COLORS = ['#FFD1E6', '#D6E8FF', '#EAD7FF', '#CFFFEA', '#FFE6CC'];

type Bubble = {
  x: number;
  y: number;
  r: number;
  vy: number; // vertical speed (negative for upward)
  angle: number; // for horizontal oscillation
  angularSpeed: number;
  color: string;
  alpha: number;
};

const ParticlesBg: React.FC<{ dark?: boolean; count?: number }> = ({ dark, count = 50 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const C = ctx; // alias for non-null context

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Adjust particle appearance depending on theme to improve visibility in light mode
    const settings = dark
      ? { rMin: 4, rMax: 14, alphaMin: 0.18, alphaMax: 0.55, vyMin: 0.15, vyMax: 0.65, shadowMul: 0.45 }
      : { rMin: 6, rMax: 20, alphaMin: 0.45, alphaMax: 0.95, vyMin: 0.08, vyMax: 0.45, shadowMul: 0.7 };

    const particles: Bubble[] = Array.from({ length: count }, () => {
      const r = Math.random() * (settings.rMax - settings.rMin) + settings.rMin;
      const alpha = Math.random() * (settings.alphaMax - settings.alphaMin) + settings.alphaMin;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r,
        vy: -(Math.random() * (settings.vyMax - settings.vyMin) + settings.vyMin),
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha,
      } as Bubble;
    });

    let rafId: number | null = null;

    function hexToRgba(hex: string, alpha = 1) {
      const normalized = hex.replace('#', '');
      const full = normalized.length === 3 ? normalized.split('').map(c => c + c).join('') : normalized;
      const bigint = parseInt(full, 16);
      const rr = (bigint >> 16) & 255;
      const gg = (bigint >> 8) & 255;
      const bb = bigint & 255;
      return `rgba(${rr}, ${gg}, ${bb}, ${alpha})`;
    }

    function drawBubble(p: Bubble) {
      // radial gradient for a glossy bubble
      const grad = C.createRadialGradient(p.x - p.r * 0.25, p.y - p.r * 0.35, p.r * 0.08, p.x, p.y, p.r);
      const baseColor = p.color;
      grad.addColorStop(0, `rgba(255,255,255,${0.95 * p.alpha})`);
      grad.addColorStop(0.45, `${hexToRgba(baseColor, 0.75 * p.alpha)}`);
      grad.addColorStop(1, `rgba(255,255,255,${0.02 * p.alpha})`);

      C.save();
      C.beginPath();
      C.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      C.shadowBlur = Math.max(4, p.r * (dark ? 0.45 : settings.shadowMul));
      C.shadowColor = dark ? 'rgba(0,0,0,0.06)' : 'rgba(0,0,0,0.08)';
      C.fillStyle = grad;
      C.fill();

      // subtle outer rim to help reading against bright backgrounds (light mode)
      if (!dark) {
        C.lineWidth = Math.max(0.5, p.r * 0.08);
        C.strokeStyle = hexToRgba('#000000', 0.04 * p.alpha);
        C.stroke();
      }

      C.restore();

      // subtle reflective highlight (soft)
      C.save();
      C.beginPath();
      C.fillStyle = `rgba(255,255,255,${(dark ? 0.55 : 0.65) * p.alpha})`;
      C.ellipse(p.x - p.r * 0.32, p.y - p.r * 0.42, p.r * 0.5, p.r * 0.28, -0.5, 0, Math.PI * 2);
      C.fill();
      C.restore();

      // iridescent sheen: low-alpha linear gradient with 'lighter' composite
      C.save();
      // keep an iridescent sheen; make it slightly stronger on light mode
      C.globalCompositeOperation = 'lighter';
      const lg = C.createLinearGradient(p.x - p.r, p.y - p.r, p.x + p.r, p.y + p.r);
      const sheenMul = dark ? 0.06 : 0.12;
      lg.addColorStop(0, hexToRgba('#FFD1E6', sheenMul * p.alpha));
      lg.addColorStop(0.4, hexToRgba('#D6E8FF', sheenMul * p.alpha));
      lg.addColorStop(0.7, hexToRgba('#EAD7FF', (sheenMul * 0.7) * p.alpha));
      lg.addColorStop(1, hexToRgba('#CFFFEA', (sheenMul * 0.5) * p.alpha));
      C.beginPath();
      C.ellipse(p.x, p.y, p.r * 0.9, p.r * 0.6, 0, 0, Math.PI * 2);
      C.fillStyle = lg;
      C.fill();
      C.restore();
    }

    function clear() {
      C.clearRect(0, 0, width, height);
    }

    function update() {
      particles.forEach(p => {
        p.angle += p.angularSpeed;
        p.x += Math.sin(p.angle) * 0.6;
        p.y += p.vy; // move upward

        if (p.y + p.r < -50) {
          p.y = height + Math.random() * 60;
          p.x = Math.random() * width;
        }

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
      });
    }

    function draw() {
      clear();
      particles.forEach(p => drawBubble(p));
    }

    function animate() {
      update();
      draw();
      rafId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [dark, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  );
};

export default ParticlesBg;

