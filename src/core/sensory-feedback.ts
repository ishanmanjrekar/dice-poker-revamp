// Non-blocking sensory feedback architecture
// Decoupled from React render loop using singleton patterns

export class AudioManager {
  private static instance: AudioManager;
  private audioContext: AudioContext | null = null;
  private buffers: Map<string, AudioBuffer> = new Map();

  private constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  async loadSound(name: string, url: string) {
    if (!this.audioContext) return;
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.buffers.set(name, audioBuffer);
  }

  playSound(name: string) {
    if (!this.audioContext) return;
    const buffer = this.buffers.get(name);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }
}

export class HapticController {
  static trigger(type: 'light' | 'medium' | 'heavy' | 'success') {
    if (!('vibrate' in navigator)) return;

    const patterns = {
      light: [10],
      medium: [20],
      heavy: [50],
      success: [10, 50, 10],
    };

    navigator.vibrate(patterns[type] || [10]);
  }
}
