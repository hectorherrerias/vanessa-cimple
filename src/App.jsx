import React, { useState, useEffect } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Header } from './components/Header';
import { GiftCard } from './components/GiftCard';
import { GiftModal } from './components/GiftModal';
import { GIFTS_DATA, BIRTHDAY_INFO } from './data/gifts';
import { triggerGrandCelebration } from './utils/confetti';
import { Sparkles, Heart } from 'lucide-react';

const STORAGE_KEY = 'vanessa_revealed_gifts_v1';

export function App() {
  // Cargar estado de regalos descubiertos desde localStorage
  const [revealedGifts, setRevealedGifts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading localStorage', e);
    }
    return [];
  });

  // Modal activo (ID del regalo seleccionado o null)
  const [selectedGiftId, setSelectedGiftId] = useState(null);
  const [hasCelebratedAll, setHasCelebratedAll] = useState(false);

  // Guardar en localStorage cuando cambie el estado
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(revealedGifts));
    } catch (e) {
      console.warn('Error saving to localStorage', e);
    }

    // Si se completaron los 5 regalos y aún no se ha lanzado la gran celebración
    if (revealedGifts.length === GIFTS_DATA.length && !hasCelebratedAll) {
      setHasCelebratedAll(true);
      setTimeout(() => {
        triggerGrandCelebration();
      }, 500);
    }
  }, [revealedGifts, hasCelebratedAll]);

  // Manejador al raspar y revelar un regalo
  const handleGiftRevealed = (id) => {
    if (!revealedGifts.includes(id)) {
      setRevealedGifts((prev) => [...prev, id]);
    }
  };

  // Reiniciar todo el progreso
  const handleResetProgress = () => {
    setRevealedGifts([]);
    setHasCelebratedAll(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
  };

  const selectedGift = GIFTS_DATA.find((g) => g.id === selectedGiftId);
  const allCompleted = revealedGifts.length === GIFTS_DATA.length;

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans selection:bg-champagne-500/30 selection:text-champagne-100">
      {/* Fondo de ambiente con partículas y luces difusas */}
      <AmbientBackground />

      {/* Contenedor principal centrado */}
      <main className="relative z-10 w-full flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex flex-col items-center">
        <Header
          revealedCount={revealedGifts.length}
          totalCount={GIFTS_DATA.length}
          onResetProgress={handleResetProgress}
        />

        {/* Banner de felicitación final cuando se han rascado los 5 regalos */}
        {allCompleted && (
          <div className="w-full max-w-2xl my-6 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-champagne-500/20 via-rosegold-500/25 to-champagne-500/20 border-2 border-champagne-400/50 shadow-gold-glow text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 text-champagne-300 font-serif font-bold text-base sm:text-lg mb-1">
              <Sparkles className="w-5 h-5 text-champagne-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>¡Has descubierto todos tus 23 regalos!</span>
              <Sparkles className="w-5 h-5 text-champagne-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <p className="text-xs sm:text-sm text-ivory/90">
              Que tus 23 años estén repletos de sonrisas, momentos mágicos y experiencias inolvidables. ¡A disfrutarlos al máximo! 🥂
            </p>
          </div>
        )}

        {/* Rejilla de 5 Regalos centrada simétricamente (3 arriba, 2 abajo centrados) */}
        <div className="w-full max-w-5xl mt-6 sm:mt-8 flex flex-wrap justify-center gap-6 sm:gap-7">
          {GIFTS_DATA.map((gift) => (
            <div
              key={gift.id}
              className="w-full sm:w-[calc(50%-0.875rem)] lg:w-[calc(33.333%-1.25rem)] max-w-[340px] flex flex-col"
            >
              <GiftCard
                gift={gift}
                isRevealed={revealedGifts.includes(gift.id)}
                onClick={() => setSelectedGiftId(gift.id)}
              />
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Rasca / Revelación */}
      <GiftModal
        gift={selectedGift}
        isOpen={Boolean(selectedGift)}
        isRevealed={selectedGift ? revealedGifts.includes(selectedGift.id) : false}
        onClose={() => setSelectedGiftId(null)}
        onGiftRevealed={handleGiftRevealed}
      />

      {/* Pie de página elegante */}
      <footer className="relative z-10 py-6 text-center text-xs text-ivory/50 border-t border-champagne-500/10">
        <p className="flex items-center justify-center gap-1.5 font-medium">
          <span>Diseñado con</span>
          <Heart className="w-3.5 h-3.5 text-rosegold-400 fill-rosegold-400/40" />
          <span>para el 23º Cumpleaños de {BIRTHDAY_INFO.name}</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
