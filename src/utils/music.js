function canUseAudio() {
  return typeof window !== 'undefined' && typeof Audio !== 'undefined';
}

export function createMusicController({
  src = '',
  volume = 0.4,
  loop = true,
} = {}) {
  let audio = null;
  let endedHandler = null;

  function ensureAudio() {
    if (!src || !canUseAudio()) {
      return null;
    }

    if (!audio) {
      audio = new Audio(src);
      audio.loop = loop;
      audio.volume = volume;
      audio.preload = 'auto';

      if (loop) {
        endedHandler = () => {
          audio.currentTime = 0;
          void audio.play().catch(() => {});
        };

        audio.addEventListener('ended', endedHandler);
      }
    }

    return audio;
  }

  return {
    isEnabled() {
      return Boolean(src);
    },

    isPlaying() {
      return Boolean(audio && !audio.paused);
    },

    async play() {
      const player = ensureAudio();

      if (!player) {
        return false;
      }

      try {
        await player.play();
        return true;
      } catch {
        return false;
      }
    },

    pause() {
      if (audio) {
        audio.pause();
      }
    },

    async toggle() {
      if (this.isPlaying()) {
        this.pause();
        return false;
      }

      return this.play();
    },

    setVolume(nextVolume) {
      volume = Math.max(0, Math.min(1, nextVolume));

      if (audio) {
        audio.volume = volume;
      }
    },

    destroy() {
      if (!audio) {
        return;
      }

      if (endedHandler) {
        audio.removeEventListener('ended', endedHandler);
        endedHandler = null;
      }

      audio.pause();
      audio.src = '';
      audio.load();
      audio = null;
    },
  };
}
