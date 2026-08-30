import React from 'react';
import { Sparkles, Check, Gift, HeartHandshake, Image as ImageIcon, Compass, Crown, ArrowUpRight, Lock, Package, PackageCheck, Heart } from 'lucide-react';

const ICON_COMPONENTS = {
  Sparkles,
  HeartHandshake,
  Image: ImageIcon,
  Compass,
  Crown,
  Package,
  PackageCheck,
  Heart,
};

export const GiftCard = ({ gift, isRevealed, onClick }) => {
  const IconComponent = ICON_COMPONENTS[gift.icon] || Gift;
  const isRose = gift.colorTheme === 'rosegold';

  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer select-none rounded-3xl p-6 sm:p-7 transition-all duration-500 transform hover:-translate-y-2 active:scale-98 flex flex-col justify-between ${
        isRevealed
          ? 'glass-card-opened shadow-gold-glow hover:border-champagne-400'
          : 'glass-card hover:border-champagne-500/50 hover:shadow-luxury'
      }`}
    >
      {/* Luz ambiente de fondo de la tarjeta */}
      <div 
        className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500 pointer-events-none ${
          isRose ? 'bg-rosegold-500' : 'bg-champagne-500'
        }`}
      />

      {/* Sello de estado superior */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-champagne-500/15 border border-champagne-400/40 text-champagne-300 font-serif font-bold text-xs flex items-center justify-center shadow-inner">
            #{gift.id}
          </span>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-ivory/60">
            {isRevealed ? gift.badge : `Caja Sorpresa #${gift.id}`}
          </span>
        </div>

        {isRevealed ? (
          <span className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-champagne-500/20 text-champagne-300 border border-champagne-500/40 animate-fade-in shadow-sm">
            <Check className="w-3.5 h-3.5 text-champagne-400" />
            <span>Descubierto</span>
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-velvet-950/70 text-rosegold-300 border border-rosegold-500/30">
            <Sparkles className="w-3 h-3 text-champagne-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Por rascar</span>
          </span>
        )}
      </div>

      {/* Icono central y título */}
      <div className="relative z-10 flex flex-col items-center justify-center my-5 text-center flex-1">
        {/* Caja misteriosa / Icono revelado */}
        <div 
          className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 ${
            isRevealed
              ? 'bg-gradient-to-br from-champagne-500/25 to-rosegold-500/20 border border-champagne-400/50 shadow-gold-glow text-champagne-200'
              : 'bg-gradient-to-b from-velvet-800 to-velvet-900 border border-champagne-500/30 text-champagne-400 shadow-md group-hover:border-champagne-400'
          }`}
        >
          {isRevealed ? (
            <IconComponent className="w-10 h-10" />
          ) : (
            <>
              <Gift className="w-10 h-10 animate-pulse-glow" />
              {/* Lazo brillante misterioso */}
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-champagne-500/30 border border-champagne-400 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-champagne-300" />
              </span>
            </>
          )}
        </div>

        {/* Título de la tarjeta: "Regalo 1", "Regalo 2", etc. antes de abrir */}
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-champagne-200 transition-colors">
          {isRevealed ? gift.title : `Regalo ${gift.id}`}
        </h3>

        {/* Subtítulo / Descripción previa */}
        <p className="text-xs sm:text-sm text-ivory/70 mt-2 line-clamp-2 max-w-[240px] leading-relaxed">
          {isRevealed ? gift.cardPreviewText : "Toca para abrir la tarjeta y rascar tu sorpresa"}
        </p>
      </div>

      {/* Barra de acción inferior */}
      <div className="relative z-10 mt-4 pt-3.5 border-t border-champagne-500/15 flex items-center justify-between text-xs">
        <span className="text-champagne-400/90 font-medium group-hover:text-champagne-200 transition-colors">
          {isRevealed ? 'Ver detalles del regalo' : '¡Rasca para descubrir!'}
        </span>
        <div className="w-7 h-7 rounded-full bg-champagne-500/15 border border-champagne-500/30 flex items-center justify-center text-champagne-400 group-hover:bg-champagne-500 group-hover:text-velvet-950 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
