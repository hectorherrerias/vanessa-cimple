import React, { useMemo } from 'react';

export const AmbientBackground = () => {
  // Generar partículas sutiles de fondo
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
      isGold: i % 2 === 0,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Luces difuminadas de ambiente */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rosegold-500/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-champagne-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-rosegold-700/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Partículas de destellos dorados */}
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full transition-opacity ${
            p.isGold ? 'bg-champagne-300' : 'bg-rosegold-300'
          }`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            boxShadow: p.isGold
              ? `0 0 ${p.size * 3}px rgba(212, 175, 55, 0.8)`
              : `0 0 ${p.size * 3}px rgba(183, 110, 121, 0.8)`,
            animation: `floatSlow ${p.duration}s ease-in-out infinite, sparkle ${p.duration * 0.7}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
