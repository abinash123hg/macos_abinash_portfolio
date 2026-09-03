// Web Audio API & Vibration Synthesizer for Apple-grade tactile feedback

class SoundFX {
  private ctx: AudioContext | null = null;
  private volume: number = 0.8; // 0.0 to 1.0

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentAudioElement) {
      this.currentAudioElement.volume = this.volume;
    }
  }

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft haptic tap
  tap() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);

      if (navigator && 'vibrate' in navigator) {
        navigator.vibrate?.(6);
      }
    } catch {
      // Audio might be blocked before first user interaction
    }
  }

  // Camera shutter mechanical click
  cameraShutter() {
    try {
      this.init();
      if (!this.ctx) return;
      
      const now = this.ctx.currentTime;
      // Click 1
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(800, now);
      osc1.frequency.exponentialRampToValueAtTime(100, now + 0.03);
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.03);

      // Click 2 (mirror drop)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(600, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.11);
      gain2.gain.setValueAtTime(0.18, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.11);

      if (navigator && 'vibrate' in navigator) {
        navigator.vibrate?.([15, 30, 20]);
      }
    } catch {
      // Ignored
    }
  }

  // Camera Control capacitive dial click
  cameraControlClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.018);
      
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.018);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.018);

      if (navigator && 'vibrate' in navigator) {
        navigator.vibrate?.(10);
      }
    } catch {
      // Ignored
    }
  }

  // FaceID Success Chime
  faceIdSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      
      [784, 1046.5].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.09);
        gain.gain.setValueAtTime(0.12, now + i * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.09);
        osc.stop(now + i * 0.09 + 0.18);
      });

      if (navigator && 'vibrate' in navigator) {
        navigator.vibrate?.([12, 40, 15]);
      }
    } catch {
      // Ignored
    }
  }

  // Apple Lock Sound
  lockSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch {
      // Ignored
    }
  }

  // App Open Chime
  appOpen() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(780, this.ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Ignored
    }
  }

  // Unlock sound
  unlock() {
    this.faceIdSuccess();
  }

  // Error buzz
  error() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Ignored
    }
  }

  // Success chime
  success() {
    this.faceIdSuccess();
  }

  // Keyboard typing click
  keyboardType() {
    this.tap();
  }

  // Trash crumple sound
  trash() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignored
    }
  }

  // Notification Ping
  notificationPing() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [587.33, 880]; // D5, A5
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.1, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.25);
      });
    } catch {
      // Ignored
    }
  }

  // Ambient Lo-Fi & Synth Music Player Engine + MP3 Audio Element Support
  private musicInterval: any = null;
  private isMusicPlaying: boolean = false;
  private chordIndex: number = 0;
  private currentAudioElement: HTMLAudioElement | null = null;

  playTrack(audioUrl?: string) {
    this.stopTrack();
    if (audioUrl) {
      try {
        const audio = new Audio(audioUrl);
        audio.volume = Math.max(0, Math.min(1, this.volume));
        audio.loop = true;
        audio.play().catch(() => {
          this.playAmbientMusic();
        });
        this.currentAudioElement = audio;
        this.isMusicPlaying = true;
        return;
      } catch {
        // Fallback to synth
      }
    }
    this.playAmbientMusic();
  }

  stopTrack() {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
        this.currentAudioElement = null;
      } catch {}
    }
    this.stopAmbientMusic();
  }

  pauseTrack() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
    }
    this.isMusicPlaying = false;
    this.stopAmbientMusic();
  }

  resumeTrack() {
    if (this.currentAudioElement) {
      this.currentAudioElement.play().catch(() => {});
      this.isMusicPlaying = true;
    }
  }

  getTrackProgress() {
    if (!this.currentAudioElement) return { currentTime: 0, duration: 0 };
    return {
      currentTime: this.currentAudioElement.currentTime,
      duration: Number.isFinite(this.currentAudioElement.duration) ? this.currentAudioElement.duration : 0,
    };
  }

  seekTrack(seconds: number) {
    if (!this.currentAudioElement) return;
    this.currentAudioElement.currentTime = Math.max(0, Math.min(seconds, this.currentAudioElement.duration || seconds));
  }

  playAmbientMusic() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.isMusicPlaying && !this.currentAudioElement) return;
      this.isMusicPlaying = true;

      // Relaxing lofi chords (frequencies in Hz: Fmaj7, G6, Em7, Am7)
      const chordProgressions = [
        [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
        [196.00, 246.94, 293.66, 392.00], // G6 (G3, B3, D4, G4)
        [164.81, 196.00, 246.94, 293.66], // Em7 (E3, G3, B3, D4)
        [220.00, 261.63, 329.63, 392.00]  // Am7 (A3, C4, E4, G4)
      ];

      const playNextChord = () => {
        if (!this.ctx || !this.isMusicPlaying) return;
        const now = this.ctx.currentTime;
        const chord = chordProgressions[this.chordIndex % chordProgressions.length];
        this.chordIndex++;

        chord.forEach((freq, i) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const filter = this.ctx!.createBiquadFilter();

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(600, now);
          filter.Q.setValueAtTime(2, now);

          osc.type = i === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Smooth warm swell
          const noteVol = (this.volume * 0.04) / chord.length;
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(noteVol, now + 0.8);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx!.destination);

          osc.start(now);
          osc.stop(now + 3.3);
        });
      };

      playNextChord();
      this.musicInterval = setInterval(playNextChord, 3200);
    } catch {
      // Audio might be blocked
    }
  }

  successChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.08 * this.volume, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.35);
      });
    } catch {
      // Audio might be blocked
    }
  }

  landingOpenChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [392, 523.25, 659.25].forEach((frequency, index) => {
        const oscillator = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = now + index * 0.1;
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, start);
        gain.gain.setValueAtTime(0.045 * this.volume, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
        oscillator.connect(gain);
        gain.connect(this.ctx!.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.5);
      });
    } catch {
      // Audio might be blocked until the user interacts with the page.
    }
  }

  deleteTrash() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
      if (navigator && 'vibrate' in navigator) {
        navigator.vibrate?.([10, 20]);
      }
    } catch {
      // Audio might be blocked
    }
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const sound = new SoundFX();
