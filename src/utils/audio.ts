// Synthesized Web Audio Sound FX & Joyful Background Music
// Zero external mp3 dependencies for 100% reliable offline/online classroom playback!

class SoundController {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmTimer: number | null = null;
  private bgmVolume: number = 0.22;
  private sfxVolume: number = 0.6;
  private bgmStep: number = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play clown horn: "Toot-toot!"
  public playClownHorn() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;

      const honk = (startTime: number, freq: number) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.85, startTime + 0.16);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.4, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(startTime);
        osc.stop(startTime + 0.2);
      };

      honk(now, 520);
      honk(now + 0.14, 580);
    } catch {
      // Audio context error fallback
    }
  }

  // Play cute pop when clown appears
  public playPop() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.1);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch {
      // audio error fallback
    }
  }

  // Play celebration ding / chime
  public playSuccessDing() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.35, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // audio error fallback
    }
  }

  // Play gentle whoosh when clown relocates
  public playWhoosh() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.15);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch {
      // ignore
    }
  }

  // Play UI button click
  public playClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }

  // Cheerful, gentle nursery / carnival marimba BGM loop
  // Plays a charming melody in C major / F major pentatonic
  private playBgmNote(freq: number, duration: number = 0.22, isChord: boolean = false) {
    if (!this.ctx || !this.bgmGain || !this.isBgmPlaying) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isChord ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    const baseVol = isChord ? 0.08 : 0.18;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(baseVol, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  }

  public startBgm() {
    this.initContext();
    if (this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    // Upbeat, cute playful melody sequence
    // Note frequencies (Hz):
    // C4: 261.6, D4: 293.7, E4: 329.6, F4: 349.2, G4: 392.0, A4: 440.0, B4: 493.9, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784.0
    const melody = [
      // Bar 1: C - E - G - E
      { note: 523.25, bass: 261.63, dur: 0.28 },
      { note: 659.25, bass: 0, dur: 0.22 },
      { note: 783.99, bass: 329.63, dur: 0.28 },
      { note: 659.25, bass: 0, dur: 0.22 },
      // Bar 2: F - A - C - A
      { note: 698.46, bass: 349.23, dur: 0.28 },
      { note: 880.00, bass: 0, dur: 0.22 },
      { note: 1046.50, bass: 440.00, dur: 0.28 },
      { note: 880.00, bass: 0, dur: 0.22 },
      // Bar 3: G - B - D - B
      { note: 783.99, bass: 392.00, dur: 0.28 },
      { note: 987.77, bass: 0, dur: 0.22 },
      { note: 1174.66, bass: 493.88, dur: 0.28 },
      { note: 987.77, bass: 0, dur: 0.22 },
      // Bar 4: C5 bouncy finish
      { note: 1046.50, bass: 261.63, dur: 0.35 },
      { note: 783.99, bass: 0, dur: 0.22 },
      { note: 659.25, bass: 329.63, dur: 0.25 },
      { note: 523.25, bass: 261.63, dur: 0.4 },
    ];

    const stepDurationMs = 280;

    const tick = () => {
      if (!this.isBgmPlaying) return;
      const current = melody[this.bgmStep % melody.length];
      if (current.note > 0) {
        this.playBgmNote(current.note, current.dur);
      }
      if (current.bass > 0) {
        this.playBgmNote(current.bass, current.dur * 1.2, true);
      }
      this.bgmStep = (this.bgmStep + 1) % melody.length;
      this.bgmTimer = window.setTimeout(tick, stepDurationMs);
    };

    tick();
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public isMusicOn(): boolean {
    return this.isBgmPlaying;
  }

  public setBgmVolume(val: number) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume, this.ctx.currentTime);
    }
  }
}

export const soundCtrl = new SoundController();

// Text-to-Speech Engine with English voice selection & syllable tuning
export const speakEnglish = (
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
  }
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    options?.onEnd?.();
    return;
  }

  // Cancel any ongoing utterance
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = options?.rate ?? 0.95; // slightly slower than 1.0 for primary school kids
  utterance.pitch = options?.pitch ?? 1.15; // slightly cheerful, friendly kid pitch

  const voices = window.speechSynthesis.getVoices();
  // Prefer natural English voices (Google US English, Samantha, Daniel, Karen, Victoria)
  const preferredVoice = voices.find(
    (v) =>
      v.lang.startsWith('en') &&
      (v.name.includes('Natural') ||
        v.name.includes('Google') ||
        v.name.includes('Samantha') ||
        v.name.includes('Daniel') ||
        v.name.includes('Karen') ||
        v.name.includes('Zira'))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (options?.onEnd) {
    utterance.onend = () => {
      options.onEnd?.();
    };
    utterance.onerror = () => {
      options.onEnd?.();
    };
  }

  window.speechSynthesis.speak(utterance);
};
