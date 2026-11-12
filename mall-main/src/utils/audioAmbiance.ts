/**
 * Pure Web Audio API Ambient Soundscape for City Mall.
 * Generates an ethereal, warm architectural drone and subtle harmonic chimes.
 * Requires no external audio files. Fully safe, zero bandwidth, instant playback.
 */

class ArchitecturalAmbiance {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private chimeTimer: number | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    this.ctx = new AudioContextClass();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    if (!this.ctx) this.init();
    if (!this.ctx || !this.masterGain) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      // Fade out
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        this.stopDrone();
      }, 1300);
      this.isPlaying = false;
    } else {
      // Start drone & fade in
      this.startDrone();
      this.masterGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 2.0);
      this.isPlaying = true;
    }

    return this.isPlaying;
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain) return;

    // Frequencies for a warm, celestial F-major chord (F2, C3, A3, C4)
    const freqs = [87.31, 130.81, 220.0, 261.63];

    this.droneOscillators = freqs.map((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + i * 80, this.ctx!.currentTime);

      gain.gain.setValueAtTime(0.2 / (i + 1), this.ctx!.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      return osc;
    });

    // Schedule subtle random crystal chimes
    this.scheduleChimes();
  }

  private scheduleChimes() {
    if (!this.isPlaying) return;

    const chimeFreqs = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    const triggerChime = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.04, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.6);

      const nextDelay = 4000 + Math.random() * 6000;
      this.chimeTimer = window.setTimeout(triggerChime, nextDelay);
    };

    this.chimeTimer = window.setTimeout(triggerChime, 3000);
  }

  private stopDrone() {
    this.droneOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignored
      }
    });
    this.droneOscillators = [];
    if (this.chimeTimer) {
      clearTimeout(this.chimeTimer);
      this.chimeTimer = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const audioAmbiance = new ArchitecturalAmbiance();

