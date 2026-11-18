// Web Audio API Synthesizer for Fairytale Music & Magical SFX
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.volume = 0.6;
    this.isPlayingMusic = false;
    this.musicTimer = null;
    this.currentTrack = 'fairytale';
    this.customAudio = null;
  }

  get isPlaying() {
    return this.isPlayingMusic;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.customAudio) {
      this.customAudio.muted = this.isMuted;
    }
    return this.isMuted;
  }

  playCustomAudio(url) {
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.stopMusic();
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = this.volume;
    this.customAudio.muted = this.isMuted;
    this.customAudio.play().catch(e => console.log('Audio autoplay prevented:', e));
    this.isPlayingMusic = true;
  }

  // Romantic Fairytale Synthesizer
  startMusic(track = 'fairytale') {
    this.init();
    if (this.customAudio && this.currentTrack === 'custom') {
      this.customAudio.play().catch(() => {});
      this.isPlayingMusic = true;
      return;
    }

    this.stopMusic();
    this.isPlayingMusic = true;
    this.currentTrack = track;

    // Beautiful romantic melody notes in Hz (Pentatonic / Lydian scale for magical fairytale feeling)
    // C4, D4, E4, G4, A4, B4, C5, D5, E5, G5
    const melodies = {
      fairytale: [
        { f: 523.25, d: 0.6 }, // C5
        { f: 587.33, d: 0.6 }, // D5
        { f: 659.25, d: 1.0 }, // E5
        { f: 783.99, d: 0.8 }, // G5
        { f: 659.25, d: 0.6 }, // E5
        { f: 523.25, d: 1.2 }, // C5
        { f: 440.00, d: 0.8 }, // A4
        { f: 493.88, d: 0.8 }, // B4
        { f: 523.25, d: 1.5 }, // C5
        { f: 392.00, d: 1.0 }, // G4
        { f: 440.00, d: 0.8 }, // A4
        { f: 523.25, d: 1.4 }  // C5
      ],
      acoustic: [
        { f: 392.00, d: 0.8 }, // G4
        { f: 440.00, d: 0.8 }, // A4
        { f: 493.88, d: 0.8 }, // B4
        { f: 587.33, d: 1.2 }, // D5
        { f: 523.25, d: 1.0 }, // C5
        { f: 440.00, d: 0.8 }, // A4
        { f: 392.00, d: 1.5 }  // G4
      ],
      waltz: [
        { f: 523.25, d: 0.7 },
        { f: 659.25, d: 0.7 },
        { f: 783.99, d: 1.2 },
        { f: 880.00, d: 0.8 },
        { f: 783.99, d: 0.8 },
        { f: 659.25, d: 1.4 }
      ]
    };

    const notes = melodies[track] || melodies.fairytale;
    let step = 0;

    const playNext = () => {
      if (!this.isPlayingMusic) return;
      if (!this.isMuted) {
        const item = notes[step % notes.length];
        this.playPluck(item.f, item.d * 0.9);
        // Soft bass backing note
        if (step % 3 === 0) {
          this.playPluck(item.f / 2, item.d * 1.5, 0.15, 'sine');
        }
      }
      const dur = (notes[step % notes.length].d || 0.8) * 1000;
      step++;
      this.musicTimer = setTimeout(playNext, dur);
    };

    playNext();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  // Play a soft bell/music-box chime tone
  playPluck(freq, duration = 0.5, amp = 0.22, type = 'triangle') {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      const targetVolume = this.volume * amp;

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(targetVolume, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // AudioContext handling
    }
  }

  // Magical SFX
  playCelebration() {
    this.playGateOpen();
    this.playSparkle();
  }

  playChime() {
    this.init();
    if (this.isMuted) return;
    [1046.50, 1318.51, 1567.98].forEach((f, idx) => {
      setTimeout(() => this.playPluck(f, 0.4, 0.25, 'triangle'), idx * 80);
    });
  }

  playGateOpen() {
    this.init();
    if (this.isMuted) return;
    // Low majestic fanfare chords
    [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
      setTimeout(() => this.playPluck(freq, 1.4, 0.3, 'sine'), idx * 180);
    });
  }

  playRosePick() {
    this.init();
    if (this.isMuted) return;
    // Ascending harp glissando
    [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
      setTimeout(() => this.playPluck(freq, 0.4, 0.25, 'triangle'), idx * 70);
    });
  }

  playTeaPour() {
    this.init();
    if (this.isMuted) return;
    [1046.50, 1318.51, 1567.98].forEach((f, i) => {
      setTimeout(() => this.playPluck(f, 0.25, 0.18, 'sine'), i * 120);
    });
  }

  playDragonChirp() {
    this.init();
    if (this.isMuted) return;
    [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
      setTimeout(() => this.playPluck(f, 0.35, 0.22, 'triangle'), i * 80);
    });
  }

  playCoinToss() {
    this.init();
    if (this.isMuted) return;
    // High coin clink then ripple
    this.playPluck(1800, 0.3, 0.35, 'sine');
    setTimeout(() => this.playPluck(2100, 0.25, 0.25, 'triangle'), 100);
    setTimeout(() => {
      [800, 600, 500, 400].forEach((f, i) => {
        setTimeout(() => this.playPluck(f, 0.5, 0.15, 'sine'), i * 70);
      });
    }, 400);
  }

  playSwanBoat() {
    this.init();
    if (this.isMuted) return;
    [329.63, 392.00, 493.88, 587.33, 659.25].forEach((f, i) => {
      setTimeout(() => this.playPluck(f, 0.8, 0.2, 'sine'), i * 150);
    });
  }

  playCoronationFanfare() {
    this.init();
    if (this.isMuted) return;
    // Royal Trumpet fanfare
    const notes = [
      { f: 523.25, d: 0.2 },
      { f: 523.25, d: 0.2 },
      { f: 523.25, d: 0.2 },
      { f: 659.25, d: 0.6 },
      { f: 523.25, d: 0.2 },
      { f: 659.25, d: 0.3 },
      { f: 783.99, d: 1.5 }
    ];
    let t = 0;
    notes.forEach(n => {
      setTimeout(() => {
        this.playPluck(n.f, n.d, 0.4, 'sawtooth');
        this.playPluck(n.f * 1.5, n.d, 0.25, 'triangle');
      }, t);
      t += n.d * 600;
    });
  }

  playFirework() {
    this.init();
    if (this.isMuted) return;
    this.playPluck(150, 0.8, 0.4, 'sawtooth');
    setTimeout(() => {
      [1200, 1000, 800, 1500].forEach((f, i) => {
        setTimeout(() => this.playPluck(f, 0.3, 0.2, 'triangle'), i * 50);
      });
    }, 200);
  }

  playSparkle() {
    this.init();
    if (this.isMuted) return;
    [1046.50, 1318.51, 1567.98, 2093.00].forEach((f, i) => {
      setTimeout(() => this.playPluck(f, 0.25, 0.15, 'triangle'), i * 60);
    });
  }
}

export const soundSystem = new SoundSystem();
