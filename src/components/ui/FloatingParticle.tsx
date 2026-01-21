import React from 'react';

// Reusable component for floating background particles
export interface FloatingParticleProps {
  delay?: string;
  duration?: string;
  top?: string;
  left?: string;
  size?: string;
  color?: string;
}

export const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay, duration, top, left, size, color }) => (
  <div className="absolute rounded-full opacity-40 blur-sm animate-float"
    style={{ top, left, width: size, height: size, backgroundColor: color, animationDelay: delay, animationDuration: duration }}
  />
);

export default FloatingParticle;
