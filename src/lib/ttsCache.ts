import type { LanguageMode } from '../types/lecture';

// 44-byte minimal valid silent WAV for unlocking HTMLAudioElement on mobile Safari/Chrome tap
const SILENT_WAV_DATA_URI =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

class TtsManager {
  private cache = new Map<string, string>(); // key -> ObjectURL
  private inflight = new Map<string, Promise<string | null>>();
  private sharedAudio: HTMLAudioElement | null = null;
  private unlocked = false;

  getAudioElement(): HTMLAudioElement {
    if (!this.sharedAudio) {
      this.sharedAudio = new Audio();
      this.sharedAudio.preload = 'auto';
      // Helps iOS inline playback
      this.sharedAudio.setAttribute('playsinline', 'true');
    }
    return this.sharedAudio;
  }

  /**
   * Call directly inside a user tap/click handler to unlock audio playback on iOS/Android.
   */
  unlockOnGesture(): void {
    const audio = this.getAudioElement();
    if (this.unlocked) return;
    try {
      audio.src = SILENT_WAV_DATA_URI;
      audio.muted = true;
      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = false;
          this.unlocked = true;
        }).catch(() => {
          audio.muted = false;
        });
      }
    } catch {
      audio.muted = false;
    }
  }

  private getKey(text: string, language: LanguageMode): string {
    return `${language}::${text.trim()}`;
  }

  async fetchTtsUrl(text: string, language: LanguageMode): Promise<string | null> {
    const clean = text.trim();
    if (!clean) return null;
    const key = this.getKey(clean, language);

    const existing = this.cache.get(key);
    if (existing) return existing;

    const pending = this.inflight.get(key);
    if (pending) return pending;

    const task = (async () => {
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: clean, language }),
        });
        if (!res.ok) {
          return null;
        }
        const data = (await res.json()) as { audioBase64?: string; mimeType?: string };
        if (!data.audioBase64) return null;

        const binaryStr = atob(data.audioBase64);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
        const url = URL.createObjectURL(blob);
        this.cache.set(key, url);
        return url;
      } catch {
        return null;
      } finally {
        this.inflight.delete(key);
      }
    })();

    this.inflight.set(key, task);
    return task;
  }

  prefetch(text: string, language: LanguageMode): void {
    void this.fetchTtsUrl(text, language);
  }
}

export const ttsManager = new TtsManager();
