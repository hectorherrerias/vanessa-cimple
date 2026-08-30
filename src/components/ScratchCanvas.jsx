import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { soundFx } from '../utils/sound';
import { triggerGoldConfetti } from '../utils/confetti';
import { SCRATCH_THRESHOLD_PERCENT } from '../data/gifts';

/**
 * Componente de Lienzo Raspable (Scratch & Win) con soporte táctil 100% perfecto.
 * Corrige el cálculo de coordenadas High-DPI (Retina) en móviles y unifica eventos Pointer/Touch
 * para que el raspado siga el dedo con total precisión y respuesta instantánea.
 */
export const ScratchCanvas = ({
  width = 330,
  height = 340,
  brushSize = 45, // Tamaño amplio ideal para dedos en pantallas móviles
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

  // Dibujar lámina dorada opaca
  const drawFoil = useCallback((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'source-over';

    // 1. Fondo degradado oro champagne metálico
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#E5C3A6');
    gradient.addColorStop(0.2, '#D4AF37');
    gradient.addColorStop(0.45, '#FFF6E5');
    gradient.addColorStop(0.7, '#C59B27');
    gradient.addColorStop(0.85, '#B76E79');
    gradient.addColorStop(1, '#8E6B1D');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // 2. Destellos decorativos dorados
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 40; i++) {
      const x = (i * 73) % w;
      const y = (i * 91) % h;
      const size = (i % 3) * (w / 330) + 2;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Bordes dobles elegantes
    const borderWidth = Math.max(2, w / 160);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = 'rgba(117, 89, 25, 0.35)';
    ctx.lineWidth = borderWidth * 0.7;
    ctx.strokeRect(15, 15, w - 30, h - 30);

    // 4. Texto central nítido
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const fontSize = Math.max(14, Math.round(w / 22));
    ctx.font = `700 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = 'rgba(95, 71, 23, 0.6)';
    ctx.fillText(promptText, w / 2 + 1, h / 2 - 2);

    ctx.fillStyle = '#261708';
    ctx.fillText(promptText, w / 2, h / 2 - 3);

    const subFontSize = Math.max(11, Math.round(w / 28));
    ctx.font = `600 ${subFontSize}px "Plus Jakarta Sans", sans-serif`;
    ctx.fillStyle = '#4E3618';
    ctx.fillText('👆 Usa tu dedo o ratón para rascar', w / 2, h / 2 + fontSize * 1.8);

    ctx.restore();
  }, [promptText]);

  // Inicializar canvas
  useEffect(() => {
    if (revealed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const actualWidth = rect.width || width;
    const actualHeight = rect.height || height;

    canvas.width = Math.round(actualWidth * dpr);
    canvas.height = Math.round(actualHeight * dpr);

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    drawFoil(ctx, canvas.width, canvas.height);
  }, [width, height, drawFoil, revealed]);

  // Calcular porcentaje analizando píxeles transparentes
  const calculateScratchedPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
  }, []);

  // Revelación automática al superar el 50%
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

  // Obtener coordenadas exactas en el buffer interno del canvas
  const getCanvasCoords = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }

    // Escala exacta entre coordenadas CSS del navegador y pixeles reales del canvas
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  // Raspar directamente en coordenadas del buffer del canvas
  const scratchAt = useCallback((currentPoint) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed || fadingOut) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const actualBrush = brushSize * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = actualBrush;
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
      ctx.arc(currentPoint.x, currentPoint.y, actualBrush / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPointRef.current = currentPoint;
  }, [brushSize, revealed, fadingOut]);

  // Manejadores unificados
  const onStart = useCallback((e) => {
    if (revealed || fadingOut) return;
    if (e.cancelable) e.preventDefault();
    isDrawingRef.current = true;
    const coords = getCanvasCoords(e);
    lastPointRef.current = coords;
    scratchAt(coords);
    soundFx.playScratchTick();
  }, [getCanvasCoords, scratchAt, revealed, fadingOut]);

  const onMove = useCallback((e) => {
    if (!isDrawingRef.current || revealed || fadingOut) return;
    if (e.cancelable) e.preventDefault();
    const coords = getCanvasCoords(e);
    scratchAt(coords);

    const currentPercent = calculateScratchedPercentage();
    setScratchPercent(currentPercent);

    if (currentPercent >= threshold) {
      isDrawingRef.current = false;
      handleAutoReveal();
    }
  }, [getCanvasCoords, scratchAt, calculateScratchedPercentage, threshold, handleAutoReveal, revealed, fadingOut]);

  const onEnd = useCallback(() => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;

    const currentPercent = calculateScratchedPercentage();
    setScratchPercent(currentPercent);

    if (currentPercent >= threshold) {
      handleAutoReveal();
    }
  }, [calculateScratchedPercentage, threshold, handleAutoReveal]);

  // Listener nativo no pasivo para bloquear cualquier gesto móvil y responder al 100%
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const touchStartHandler = (e) => onStart(e);
    const touchMoveHandler = (e) => onMove(e);
    const touchEndHandler = (e) => onEnd();

    canvas.addEventListener('touchstart', touchStartHandler, { passive: false });
    canvas.addEventListener('touchmove', touchMoveHandler, { passive: false });
    canvas.addEventListener('touchend', touchEndHandler, { passive: false });
    canvas.addEventListener('touchcancel', touchEndHandler, { passive: false });

    // Pointer events para ratón / desktop
    const pointerDownHandler = (e) => {
      if (e.pointerType === 'mouse') onStart(e);
    };
    const pointerMoveHandler = (e) => {
      if (e.pointerType === 'mouse') onMove(e);
    };
    const pointerUpHandler = (e) => {
      if (e.pointerType === 'mouse') onEnd();
    };

    canvas.addEventListener('pointerdown', pointerDownHandler);
    window.addEventListener('pointermove', pointerMoveHandler);
    window.addEventListener('pointerup', pointerUpHandler);

    return () => {
      canvas.removeEventListener('touchstart', touchStartHandler);
      canvas.removeEventListener('touchmove', touchMoveHandler);
      canvas.removeEventListener('touchend', touchEndHandler);
      canvas.removeEventListener('touchcancel', touchEndHandler);

      canvas.removeEventListener('pointerdown', pointerDownHandler);
      window.removeEventListener('pointermove', pointerMoveHandler);
      window.removeEventListener('pointerup', pointerUpHandler);
    };
  }, [onStart, onMove, onEnd, revealed]);

  return (
    <div 
      ref={containerRef}
      className="relative mx-auto select-none rounded-3xl overflow-hidden shadow-luxury border border-champagne-500/40"
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        touchAction: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Capa inferior (Contenido secreto) */}
      <div className="absolute inset-0 w-full h-full p-3 sm:p-4 flex flex-col items-center justify-center bg-gradient-to-b from-velvet-900 via-velvet-850 to-velvet-950 text-center overflow-hidden pointer-events-none select-none">
        {children}
      </div>

      {/* Capa superior rascable (Canvas nativo) */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full z-10 cursor-pointer transition-opacity duration-500 ${
            fadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
          }`}
          style={{ 
            touchAction: 'none',
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            width: '100%',
            height: '100%',
          }}
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
