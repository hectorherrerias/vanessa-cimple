import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, RotateCcw, Award } from 'lucide-react';
import { BIRTHDAY_INFO } from '../data/gifts';
import { soundFx } from '../utils/sound';

export const Header = ({ revealedCount, totalCount, onResetProgress }) => {
  const [isMuted, setIsMuted] = useState(soundFx.isMuted());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const progressPercentage = Math.round((revealedCount / totalCount) * 100);

  return (
    <header className="relative z-10 w-full max-w-4xl mx-auto pt-6 sm:pt-10 pb-6 px-4 text-center flex flex-col items-center">
      {/* Barra superior de estado & controles (completamente simétrica) */}
      <div className="w-full max-w-xl flex items-center justify-between gap-3 mb-6 sm:mb-8">
        {/* Contador de progreso */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-velvet-900/90 border border-champagne-500/30 text-xs text-champagne-300 backdrop-blur-md shadow-sm">
          <Award className="w-3.5 h-3.5 text-champagne-400" />
          <span>
            <strong className="text-ivory font-semibold">{revealedCount}</strong> de {totalCount} descubiertos
          </span>
        </div>

        {/* Acciones de sonido y reinicio */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
            title={isMuted ? "Activar sonido" : "Silenciar sonido"}
            className="p-2 rounded-full bg-velvet-900/90 border border-champagne-500/30 text-champagne-300 hover:text-champagne-100 hover:border-champagne-400 transition-colors backdrop-blur-md shadow-sm"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {revealedCount > 0 && (
            <button
              onClick={() => setShowResetConfirm(true)}
              aria-label="Reiniciar progreso"
              title="Volver a tapar todos los regalos"
              className="p-2 rounded-full bg-velvet-900/90 border border-champagne-500/30 text-champagne-300 hover:text-rosegold-300 hover:border-rosegold-400 transition-colors backdrop-blur-md shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Modal de confirmación de reinicio */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-velvet-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-velvet-900 border border-champagne-500/40 rounded-3xl p-6 max-w-sm text-center shadow-luxury">
            <h4 className="font-serif text-lg font-bold text-ivory mb-2">
              ¿Reiniciar los rascas?
            </h4>
            <p className="text-xs text-ivory/70 mb-5 leading-relaxed">
              Volverán a cubrirse todas las tarjetas doradas para que puedas rascar cada sorpresa de nuevo.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-ivory/70 hover:text-ivory bg-velvet-950/60 border border-ivory/20 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onResetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-5 py-2 rounded-full text-xs font-semibold text-velvet-950 bg-champagne-400 hover:bg-champagne-300 transition-colors shadow-gold-glow"
              >
                Sí, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insignia / Corona de 23 Años */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-champagne-500/15 via-rosegold-500/20 to-champagne-500/15 border border-champagne-400/40 text-xs sm:text-sm font-semibold text-champagne-200 shadow-gold-glow mb-4 animate-float-slow">
        <Sparkles className="w-3.5 h-3.5 text-champagne-400 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Celebrando los 23 de {BIRTHDAY_INFO.name}</span>
        <Sparkles className="w-3.5 h-3.5 text-champagne-400 animate-spin" style={{ animationDuration: '8s' }} />
      </div>

      {/* Título Principal */}
      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3">
        <span className="text-gold-gradient">Felices 23,</span>{' '}
        <span className="text-rosegold-gradient">{BIRTHDAY_INFO.name}</span>
      </h1>

      {/* Subtítulo Elegante */}
      <p className="font-sans text-xs sm:text-sm md:text-base text-ivory/80 max-w-lg mx-auto leading-relaxed mb-6">
        {BIRTHDAY_INFO.tagline}
      </p>

      {/* Barra de progreso dorada */}
      <div className="w-full max-w-md mx-auto">
        <div className="w-full bg-velvet-900/90 rounded-full h-2 p-0.5 border border-champagne-500/30 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-champagne-600 via-champagne-400 to-rosegold-400 transition-all duration-700 shadow-gold-glow"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </header>
  );
};
