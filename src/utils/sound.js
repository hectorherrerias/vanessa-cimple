/**
 * Generador de efectos de sonido usando Web Audio API nativa.
 * Crea un tintineo mágico / acordes de campana brillantes al revelar los regalos.
 */

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.muted = false;
    
    // Cargar preferencia de sonido guardada
    try {
      const saved = localStorage.getItem('vanessa_sound_muted');
      if (saved !== null) {
        this.muted = saved === 'true';
      }
    } catch {
      this.muted = false;
    }
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('vanessa_sound_muted', String(this.muted));
    } catch (e) {
      console.warn(e);
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Sonido suave de raspado
  playScratchTick() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300 + Math.random() * 200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Ignorar errores de audio background
    }
  }

  // Campanada mágica arpegiada al desbloquear premio
  playMagicChime() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Arpegio brillante en notas pentatónicas mayores (C#6, D#6, F#6, G#6, C#7)
      const notes = [1108.73, 1244.51, 1479.98, 1661.22, 2217.46];

      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        const startTime = now + index * 0.08;
        const duration = 0.8;

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {
      console.warn('Audio playback not allowed yet:', e);
    }
  }
}

export const soundFx = new SoundEffects();
