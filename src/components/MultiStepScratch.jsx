import React, { useState } from 'react';
import { ScratchCanvas } from './ScratchCanvas';
import { SunMedium, UtensilsCrossed, PlaneTakeoff, ChevronRight, CheckCircle2, Sparkles, MapPin, Calendar, Heart, Compass } from 'lucide-react';
import { triggerGoldConfetti, triggerGrandCelebration } from '../utils/confetti';
import { soundFx } from '../utils/sound';

const ICON_MAP = {
  SunMedium,
  UtensilsCrossed,
  PlaneTakeoff,
  Compass,
};

export const MultiStepScratch = ({ gift, onComplete, initialStep = 1, isFullyCompleted = false }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(isFullyCompleted ? 2 : initialStep - 1);
  const [scratchedSteps, setScratchedSteps] = useState(
    isFullyCompleted ? [true, true, true] : [false, false, false]
  );

  const steps = gift.steps;
  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleStepCompleted = (index) => {
    const nextScratched = [...scratchedSteps];
    nextScratched[index] = true;
    setScratchedSteps(nextScratched);

    if (index === steps.length - 1) {
      // Último paso rascado: Gran celebración final
      triggerGrandCelebration();
      soundFx.playMagicChime();
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const CurrentIcon = ICON_MAP[currentStep.hintContent.icon] || Sparkles;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Indicador de progreso de 3 pasos centrado */}
      <div className="w-full max-w-xs flex items-center justify-between mb-3 px-2">
        {steps.map((step, idx) => {
          const isDone = scratchedSteps[idx];
          const isCurrent = currentStepIndex === idx;
          return (
            <div key={idx} className="flex items-center flex-1 last:flex-none">
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full border text-xs font-semibold transition-all duration-300 ${
                  isDone
                    ? 'bg-champagne-500 text-velvet-950 border-champagne-400 shadow-gold-glow'
                    : isCurrent
                    ? 'bg-rosegold-500/20 text-rosegold-300 border-rosegold-400 ring-2 ring-rosegold-400/30'
                    : 'bg-velvet-900/60 text-ivory/40 border-ivory/10'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>
              
              {idx < steps.length - 1 && (
                <div 
                  className={`h-0.5 flex-1 mx-2 transition-all duration-300 ${
                    scratchedSteps[idx] ? 'bg-champagne-500' : 'bg-ivory/10'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Título de la pista activa */}
      <div className="text-center mb-2.5">
        <span className="inline-block px-3 py-0.5 rounded-full text-[11px] font-semibold bg-champagne-500/15 text-champagne-300 border border-champagne-500/30 mb-1 shadow-sm">
          {currentStep.badge}
        </span>
        <h4 className="font-serif text-lg font-bold text-ivory">
          {currentStep.title}
        </h4>
      </div>

      {/* Rasca interactivo para la pista actual */}
      <div className="w-full max-w-[340px]">
        <ScratchCanvas
          key={`scratch-step-${currentStepIndex}`}
          width={330}
          height={320}
          promptText={currentStep.scratchPrompt}
          isCompleted={scratchedSteps[currentStepIndex]}
          onComplete={() => handleStepCompleted(currentStepIndex)}
        >
          {/* Contenido revelado de la pista bajo la lámina dorada */}
          <div className="w-full h-full flex flex-col items-center justify-center p-2.5 animate-fade-in text-center">
            
            {/* Imagen de la pista (Hornazo, Bandera o Destino Salamanca) */}
            {currentStep.hintContent.imageSrc && (
              <div className="relative group my-1 p-1.5 rounded-xl bg-velvet-900/90 border border-champagne-500/40 shadow-luxury max-w-[260px]">
                <div className="relative overflow-hidden rounded-lg bg-velvet-950 flex items-center justify-center max-h-[135px]">
                  <img
                    src={currentStep.hintContent.imageSrc}
                    alt={currentStep.hintContent.heading}
                    className="w-full h-auto max-h-[130px] object-contain rounded transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            )}

            <h5 className="font-serif text-base sm:text-lg font-bold text-champagne-200 mt-1 mb-1">
              {currentStep.hintContent.heading}
            </h5>

            <p className="text-[11px] sm:text-xs text-ivory/80 leading-relaxed max-w-[280px] mb-1.5">
              {currentStep.hintContent.text}
            </p>

            <div className="text-[10px] sm:text-[11px] text-champagne-300/90 font-medium italic bg-velvet-950/70 px-2.5 py-1 rounded-lg border border-champagne-500/20">
              {currentStep.hintContent.bullet}
            </div>
          </div>
        </ScratchCanvas>
      </div>

      {/* Botón de acción para avanzar al siguiente paso tras rascar */}
      {scratchedSteps[currentStepIndex] && !isLastStep && (
        <div className="mt-3.5 animate-scale-up">
          <button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-champagne-500 via-rosegold-500 to-champagne-500 hover:from-champagne-400 hover:to-rosegold-400 text-velvet-950 font-bold text-xs sm:text-sm shadow-gold-glow transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>{currentStep.buttonNextText}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tarjeta de confirmación cuando se descubren los 3 pasos */}
      {scratchedSteps[2] && (
        <div className="mt-3.5 w-full max-w-[330px] p-2.5 rounded-xl bg-gradient-to-r from-champagne-500/10 to-rosegold-500/10 border border-champagne-500/30 text-center animate-fade-in">
          <p className="text-xs text-champagne-200 font-medium">
            ✈️ ¡Destino Salamanca 100% Desbloqueado!
          </p>
        </div>
      )}
    </div>
  );
};
