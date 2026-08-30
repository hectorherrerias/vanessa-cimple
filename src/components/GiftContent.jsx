import React, { useState } from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Image as ImageIcon, 
  Compass, 
  Crown, 
  MapPin, 
  Calendar, 
  Ticket,
  Package,
  PackageCheck,
  Heart
} from 'lucide-react';

const ICON_COMPONENTS = {
  Sparkles,
  HeartHandshake,
  Image: ImageIcon,
  Compass,
  Crown,
  Package,
  PackageCheck,
  Heart
};

export const GiftContent = ({ gift, isCompact = false }) => {
  const [imageError, setImageError] = useState(false);

  // ==========================================
  // REGALO 2: MASAJE & SPA (Mantiene toda la información y centros)
  // ==========================================
  if (gift.id === 2) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center animate-fade-in px-1">
        <span className="px-3.5 py-0.5 rounded-full text-xs font-semibold bg-champagne-500/20 text-champagne-300 border border-champagne-500/40 mb-1.5 shadow-sm">
          {gift.revealed.tag}
        </span>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory mb-2">
          {gift.revealed.title}
        </h3>

        <div className={`relative group my-1 p-2 rounded-2xl bg-velvet-900/90 border border-champagne-500/40 shadow-luxury ${
          isCompact ? 'max-w-[200px]' : 'max-w-[280px] sm:max-w-[320px]'
        }`}>
          <div className={`relative overflow-hidden rounded-xl bg-velvet-950 flex items-center justify-center ${
            isCompact ? 'max-h-[110px]' : 'min-h-[160px] max-h-[200px]'
          }`}>
            <img
              src={gift.imageSrc || "/images/masaje.png"}
              alt="Ambiente de Spa y Masaje Relajante"
              className="w-full h-auto object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Información de los Centros de Masaje */}
        <div className="w-full max-w-sm space-y-1.5 my-1.5 text-left">
          {gift.revealed.places?.map((place, idx) => (
            <div
              key={idx}
              className="p-2 sm:p-2.5 rounded-xl bg-velvet-900/90 border border-champagne-500/25 shadow-md flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg select-none">{place.icon}</span>
                <div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-champagne-200">
                    {place.name}
                  </h4>
                  {place.details && !isCompact && (
                    <p className="text-[10px] text-ivory/80 mt-0.5 leading-snug">
                      {place.details}
                    </p>
                  )}
                </div>
              </div>
              <span className="text-[11px] font-bold text-champagne-400 bg-champagne-500/10 px-2 py-0.5 rounded-full border border-champagne-500/30 shrink-0">
                {place.rating}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[11px] sm:text-xs text-champagne-400/90 font-medium italic mt-1">
          ✨ {gift.revealed.footnote}
        </p>
      </div>
    );
  }

  // ==========================================
  // REGALO 7: ESCAPADA DE FIN DE SEMANA (SALAMANCA)
  // ==========================================
  if (gift.id === 7) {
    return (
      <div className="w-full flex flex-col items-center animate-fade-in">
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-champagne-500/20 text-champagne-300 border border-champagne-500/40 mb-2 shadow-sm">
          ¡Destino Desbloqueado: SALAMANCA! ✈️🏛️
        </span>
        
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mb-2 text-center">
          Escapada a Salamanca
        </h3>

        {/* Tarjeta de Embarque / Pase VIP */}
        <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-velvet-850 via-velvet-900 to-velvet-950 border border-champagne-500/40 shadow-luxury overflow-hidden my-1">
          <div className="bg-gradient-to-r from-champagne-600 via-champagne-500 to-rosegold-500 px-4 py-2.5 flex items-center justify-between text-velvet-950">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              <span className="font-serif font-bold text-xs uppercase tracking-wider">
                Special Birthday Pass
              </span>
            </div>
            <span className="font-mono font-bold text-xs bg-velvet-950/20 px-2 py-0.5 rounded">
              SALAMANCA-23
            </span>
          </div>

          <div className="p-4 sm:p-5 space-y-3.5">
            <div className="flex items-start justify-between border-b border-champagne-500/20 pb-3">
              <div>
                <span className="text-[10px] uppercase text-champagne-400 font-semibold tracking-wider">
                  Pasajera VIP
                </span>
                <p className="font-serif font-bold text-base sm:text-lg text-ivory">
                  Vanessa
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-champagne-400 font-semibold tracking-wider">
                  Ocasión
                </span>
                <p className="font-semibold text-sm text-champagne-200">
                  23º Cumpleaños ✨
                </p>
              </div>
            </div>

            {/* Foto Panorámica Completa de Salamanca */}
            <div className="relative overflow-hidden rounded-xl bg-velvet-950 border border-champagne-500/30 my-1.5 shadow-md">
              <img
                src="/images/salamanca.jpg"
                alt="Salamanca - Catedral y Puente Romano"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rosegold-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-ivory/60">Destino</p>
                  <p className="text-xs font-semibold text-ivory">Salamanca</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-champagne-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-ivory/60">Fechas</p>
                  <p className="text-xs font-semibold text-ivory">A convenir juntos</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-velvet-950/70 rounded-xl border border-champagne-500/15 text-xs text-ivory/80 leading-relaxed">
              🏛️ Hornazo, tapeo por la Plaza Mayor, hotel con encanto y los mejores paseos por la ciudad dorada.
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs text-champagne-300 font-serif italic text-center">
          «¡Nos vamos a celebrar tus 23 a Salamanca!»
        </p>
      </div>
    );
  }

  // ==========================================
  // TODOS LOS DEMÁS REGALOS (1, 3, 4, 5, 6): SÓLO TÍTULO E IMAGEN LIMPIA
  // ==========================================
  const isRose = gift.colorTheme === 'rosegold';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center animate-fade-in px-2">
      <span className={`px-3.5 py-0.5 rounded-full text-xs font-semibold border mb-2 shadow-sm ${
        isRose 
          ? 'bg-rosegold-500/20 text-rosegold-300 border-rosegold-500/40' 
          : 'bg-champagne-500/20 text-champagne-300 border-champagne-500/40'
      }`}>
        {gift.revealed.tag || `Regalo ${gift.id} ✨`}
      </span>

      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mb-3">
        {gift.revealed.title}
      </h3>

      {/* Imagen Limpia y Elegante */}
      <div className={`relative group p-2.5 rounded-2xl bg-velvet-900/90 border border-champagne-500/40 shadow-luxury transition-all duration-300 hover:border-champagne-400 ${
        isCompact ? 'max-w-[240px]' : 'max-w-[290px] sm:max-w-[340px]'
      }`}>
        <div className={`relative overflow-hidden rounded-xl bg-velvet-950 flex items-center justify-center ${
          isCompact ? 'max-h-[190px]' : 'min-h-[200px] max-h-[260px]'
        }`}>
          {!imageError && gift.imageSrc ? (
            <img
              src={gift.imageSrc}
              alt={gift.revealed.title}
              onError={() => setImageError(true)}
              className="w-full h-auto max-h-[260px] object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="p-6 flex flex-col items-center justify-center text-center">
              <Sparkles className="w-10 h-10 text-champagne-300 mb-2" />
              <p className="text-sm font-semibold text-champagne-200">{gift.revealed.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
