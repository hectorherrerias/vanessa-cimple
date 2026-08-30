import React, { useEffect, useState } from 'react';
import { X, Sparkles, RotateCcw } from 'lucide-react';
import { ScratchCanvas } from './ScratchCanvas';
import { MultiStepScratch } from './MultiStepScratch';
import { GiftContent } from './GiftContent';

export const GiftModal = ({
  gift,
  isOpen,
  isRevealed,
  onClose,
  onGiftRevealed,
}) => {
  const [replayMode, setReplayMode] = useState(false);

  // Bloquear scroll de la página cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setReplayMode(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Soporte para cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !gift) return null;

  const showScratchGame = !isRevealed || replayMode;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Fondo difuminado oscuro */}
      <div 
        className="fixed inset-0 bg-velvet-950/85 backdrop-blur-xl transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-velvet-850 via-velvet-900 to-velvet-950 border border-champagne-500/40 rounded-3xl p-5 sm:p-7 shadow-luxury z-10 animate-scale-up max-h-[92vh] flex flex-col justify-between overflow-y-auto">
        
        {/* Barra superior de controles */}
        <div className="flex items-center justify-between border-b border-champagne-500/20 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-champagne-500/20 text-champagne-300 flex items-center justify-center text-xs font-bold font-serif border border-champagne-500/30">
              #{gift.id}
            </span>
            <h2 className="text-sm sm:text-base font-serif font-semibold text-champagne-200 truncate max-w-[220px] sm:max-w-[300px]">
              {showScratchGame ? `Regalo ${gift.id} · Sorpresa` : `Regalo ${gift.id} · ${gift.title}`}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 rounded-full text-ivory/60 hover:text-ivory hover:bg-champagne-500/10 border border-transparent hover:border-champagne-500/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido principal del modal */}
        <div className="my-auto py-2 flex flex-col items-center justify-center w-full">
          {showScratchGame ? (
            // MODO RASCA Y GANA INTERACTIVO
            gift.isMultiLevel ? (
              <MultiStepScratch
                gift={gift}
                isFullyCompleted={false}
                onComplete={() => {
                  onGiftRevealed(gift.id);
                  setReplayMode(false);
                }}
              />
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="mb-3 text-center">
                  <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-champagne-500/15 text-champagne-300 border border-champagne-500/30 inline-block shadow-sm">
                    {`Caja Sorpresa #${gift.id}`}
                  </span>
                  <p className="text-xs sm:text-sm text-ivory/80 mt-1.5 font-medium">
                    Rasca con tu dedo o ratón sobre la lámina dorada
                  </p>
                </div>

                {/* Lienzo de rasca: El regalo y la foto están debajo y se desvelan al rascar */}
                <ScratchCanvas
                  width={330}
                  height={350}
                  promptText={`✨ Rasca para descubrir el Regalo ${gift.id} ✨`}
                  onComplete={() => {
                    onGiftRevealed(gift.id);
                    setReplayMode(false);
                  }}
                >
                  <GiftContent gift={gift} isCompact={true} />
                </ScratchCanvas>
              </div>
            )
          ) : (
            // MODO REGALO YA DESCUBIERTO
            <div className="w-full">
              <GiftContent gift={gift} />
            </div>
          )}
        </div>

        {/* Barra inferior de acciones */}
        <div className="mt-5 pt-3.5 border-t border-champagne-500/20 flex items-center justify-between gap-3">
          {isRevealed && !replayMode ? (
            <button
              onClick={() => setReplayMode(true)}
              className="flex items-center gap-1.5 text-xs text-champagne-400 hover:text-champagne-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-champagne-500/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Volver a rascar</span>
            </button>
          ) : (
            <div className="text-[11px] text-ivory/50 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              <span>Rasca al menos la mitad para revelar</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-champagne-500/20 hover:bg-champagne-500/30 text-champagne-200 text-xs sm:text-sm font-semibold border border-champagne-500/40 transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            Volver a los regalos
          </button>
        </div>
      </div>
    </div>
  );
};
