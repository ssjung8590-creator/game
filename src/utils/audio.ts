/**
 * Sound effects synthesizer using Web Audio API to ensure robust offline-friendly
 * senior-appropriate sounds (warm waves, no jarring high-pitch beeps).
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  private volume: number = 0.5; // default 50%

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      // Lazy initialization on user interaction to abide by browser security
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    return this.ctx;
  }

  public setVolume(volumePercentage: number) {
    this.volume = Math.max(0, Math.min(100, volumePercentage)) / 100;
  }

  /**
   * Play a clean, warm bell chime for a correct guess
   */
  public playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    // We compose a warm bell: primary sine wave and an overtone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // Slide to G5

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1046.50, now); // C6 overtone (crystal shine)

    gainNode.gain.setValueAtTime(this.volume * 0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.8);
    osc2.stop(now + 0.8);
  }

  /**
   * Play soft, gentle tactile thud for clicking incorrect spots (never harsh or punishing)
   */
  public playIncorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle"; // softer and rounder than square/sawtooth
    osc.frequency.setValueAtTime(120, now); // Deep soft baseline
    osc.frequency.linearRampToValueAtTime(80, now + 0.15);

    gainNode.gain.setValueAtTime(this.volume * 0.5, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  /**
   * Play a peaceful, happy harp-like musical arpeggio for stage clearance
   */
  public playLevelComplete() {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    
    notes.forEach((freq, index) => {
      const delay = index * 0.08;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);
      
      gainNode.gain.setValueAtTime(0, now + delay);
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.25, now + delay + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.6);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.61);
    });
  }

  /**
   * Sparkle sound for hint usage
   */
  public playHint() {
    const ctx = this.getContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const notes = [587.33, 659.25, 783.99, 880.00, 1046.5]; // Bright sparkles
    
    notes.forEach((freq, index) => {
      const delay = index * 0.05;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      gainNode.gain.setValueAtTime(this.volume * 0.15, now + delay);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.35);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.36);
    });
  }
}

export const sfx = new SoundEffects();
