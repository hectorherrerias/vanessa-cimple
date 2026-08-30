import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { triggerGoldConfetti } from '../utils/confetti';
import { SCRATCH_THRESHOLD_PERCENT } from '../data/gifts';

/**
 * Componente de Lienzo Raspable (Scratch & Win) con textura dorada metálica.
 * Cubre el 100% del contenido con lámina dorada opaca y permite revelar progresivamente
 * la imagen y el regalo directamente bajo el trazo del dedo o ratón.
 */
export const ScratchCanvas = ({
  width = 330,
  height = 340,
  brushSize = 32,
  threshold = SCRATCH_THRESHOLD_PERCENT,
  onComplete,
  isCompleted = false,
  promptText = "✨ Rasca para descubrir tu regalo ✨",
  children,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [revealed, setRevealed] = useState(isCompleted);

  // Inicializar y dibujar la lámina dorada completamente opaca en el canvas
  const drawFoil = useCallback((ctx, w, h) => {
    // 1. Limpiar y rellenar con degradado metálico oro/champagne 100% opaco
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';

    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#E5C3A6');
    gradient.addColorStop(0.2, '#D4AF37');
    gradient.addColorStop(0.45, '#FFF6E5');
    gradient.addColorStop(0.7, '#C59B27');
    gradient.addColorStop(0.85, '#B76E79');
    gradient.addColorStop(1, '#8E6B1D');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Patrón de destellos y estrellas doradas
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 40; i++) {
      const x = (i * 73) % w;
      const y = (i * 91) % h;
      const size = (i % 3) + 1.5;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Bordes dobles interiores de lujo
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = 'rgba(117, 89, 25, 0.35)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, w - 28, h - 28);

    // 4. Texto central de invitación al raspado
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Sombra del texto
    ctx.font = '700 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(95, 71, 23, 0.6)';
    ctx.fillText(promptText, w / 2 + 1, h / 2 - 2);

    // Texto principal
    ctx.fillStyle = '#261708';
    ctx.fillText(promptText, w / 2, h / 2 - 3);

    // Subtítulo
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#4E3618';
    ctx.fillText('👆 Usa tu dedo o ratón para rascar', w / 2, h / 2 + 26);

    ctx.restore();
  }, [promptText]);

  // Montar y configurar Canvas con soporte High-DPI
  useEffect(() => {
    if (revealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    drawFoil(ctx, width, height);
  }, [width, height, drawFoil, revealed]);

  // Calcular porcentaje de raspado analizando píxeles transparentes
  const calculateScratchedPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const realWidth = Math.floor(width * dpr);
    const realHeight = Math.floor(height * dpr);

    const imageData = ctx.getImageData(0, 0, realWidth, realHeight);
    const pixels = imageData.data;
    let transparentPixels = 0;

    const stride = 16;
    let sampledCount = 0;

    for (let i = 3; i < pixels.length; i += 4 * stride) {
      sampledCount++;
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percent = Math.round((transparentPixels / sampledCount) * 100);
    return percent;
  }, [width, height]);

  // Revelación automática al superar el umbral (>50%)
  const handleAutoReveal = useCallback(() => {
    if (revealed || fadingOut) return;
    setFadingOut(true);
    soundFx.playMagicChime();
    triggerGoldConfetti();

    setTimeout(() => {
      setRevealed(true);
      setFadingOut(false);
      if (onComplete) {
        onComplete();
      }
    }, 450);
  }, [revealed, fadingOut, onComplete]);

  // Coordenadas relativas de evento táctil o de ratón
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Trazo de raspado con curvas cuadráticas suaves
  const scratch = (currentPoint) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed || fadingOut) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      const midPoint = {
        x: (lastPointRef.current.x + currentPoint.x) / 2,
        y: (lastPointRef.current.y + currentPoint.y) / 2,
      };
      ctx.quadraticCurveTo(lastPointRef.current.x, lastPointRef.current.y, midPoint.x, midPoint.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(currentPoint.x, currentPoint.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPointRef.current = currentPoint;
  };

  const startScratching = (e) => {
    if (revealed || fadingOut) return;
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    isDrawingRef.current = true;
    const coords = getCoordinates(e);
    lastPointRef.current = coords;
    scratch(coords);
    soundFx.playScratchTick();
  };

  const continueScratching = (e) => {
    if (!isDrawingRef.current || revealed || fadingOut) return;
    if (e.type === 'touchmove') {
      e.preventDefault();
    }
    const coords = getCoordinates(e);
    scratch(coords);

    const currentPercent = calculateScratchedPercentage();
    setScratchPercent(currentPercent);

    if (currentPercent >= threshold) {
      isDrawingRef.current = false;
      handleAutoReveal();
    }
  };

  const stopScratching = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;

    const currentPercent = calculateScratchedPercentage();
    setScratchPercent(currentPercent);

    if (currentPercent >= threshold) {
      handleAutoReveal();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative mx-auto select-none rounded-3xl overflow-hidden shadow-luxury border border-champagne-500/40"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* Capa inferior (La foto y el regalo real que se van viendo conforme rascas con el dedo) */}
      <div className="absolute inset-0 w-full h-full p-3 sm:p-4 flex flex-col items-center justify-center bg-gradient-to-b from-velvet-900 via-velvet-850 to-velvet-950 text-center overflow-hidden">
        {children}
      </div>

      {/* Capa superior rascable (Lámina dorada opaca que tapa todo al 100%) */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full z-10 cursor-pointer touch-none-scratch transition-opacity duration-500 ${
            fadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
          }`}
          onMouseDown={startScratching}
          onMouseMove={continueScratching}
          onMouseUp={stopScratching}
          onMouseLeave={stopScratching}
          onTouchStart={startScratching}
          onTouchMove={continueScratching}
          onTouchEnd={stopScratching}
        />
      )}

      {/* Indicador de porcentaje rascado */}
      {!revealed && !fadingOut && scratchPercent > 5 && (
        <div className="absolute bottom-2.5 right-2.5 z-20 px-2.5 py-0.5 rounded-full bg-velvet-950/85 backdrop-blur-md border border-champagne-500/40 text-[11px] font-medium text-champagne-300 flex items-center gap-1 shadow-sm pointer-events-none">
          <Sparkles className="w-3 h-3 text-champagne-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>{scratchPercent}% rascado</span>
        </div>
      )}
    </div>
  );
};
