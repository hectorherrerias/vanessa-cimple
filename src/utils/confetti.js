import confetti from 'canvas-confetti';

/**
 * Dispara confeti con colores elegantes champagne, oro rosa, marfil y dorado brillante.
 */
export const triggerGoldConfetti = () => {
  // Colores temáticos elegantes
  const colors = ['#D4AF37', '#F7E7CE', '#B76E79', '#FFFDF9', '#E5C3A6', '#C88D93'];

  // Explosión central
  confetti({
    particleCount: 75,
    spread: 80,
    origin: { y: 0.6 },
    colors: colors,
    ticks: 250,
    gravity: 0.85,
    scalar: 1.1,
    shapes: ['circle', 'square'],
  });

  // Ráfagas laterales retardadas para mayor elegancia
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      ticks: 220,
    });
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      ticks: 220,
    });
  }, 200);
};

/**
 * Ráfaga estelar para la gran revelación o pistas finales
 */
export const triggerGrandCelebration = () => {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#D4AF37', '#B76E79', '#FAF7F0', '#DFC094', '#9F5560'];

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: colors
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: colors
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
};
