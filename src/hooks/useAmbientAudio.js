import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Ambient music hook.
 *  - Plays `src` (looped) with a smooth fade in / out.
 *  - If the file is missing or cannot be decoded, falls back to a soft synthesised
 *    "canon in D" piano loop built with the Web Audio API, so the toggle always works.
 *  - Playback only ever starts from a user gesture (the toggle), which satisfies
 *    browser autoplay policies.
 */

// Chord tones (Hz) for a slow D-major canon progression: D A Bm F#m G D G A
const PROGRESSION = [
  [146.83, 220.0, 293.66, 369.99],
  [110.0, 164.81, 220.0, 277.18],
  [123.47, 185.0, 246.94, 293.66],
  [92.5, 138.59, 185.0, 220.0],
  [98.0, 146.83, 196.0, 246.94],
  [146.83, 220.0, 293.66, 369.99],
  [98.0, 146.83, 196.0, 246.94],
  [110.0, 164.81, 220.0, 277.18],
];
const PATTERN = [0, 1, 2, 3, 2, 1, 3, 2];
const STEP_SECONDS = 0.46;

function createSynth(ctx, destination) {
  // Gentle echo "room"
  const bus = ctx.createGain();
  const delay = ctx.createDelay(1);
  delay.delayTime.value = 0.42;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.38;
  const tone = ctx.createBiquadFilter();
  tone.type = 'lowpass';
  tone.frequency.value = 2400;

  bus.connect(destination);
  bus.connect(delay);
  delay.connect(tone);
  tone.connect(feedback);
  feedback.connect(delay);
  tone.connect(destination);

  const pluck = (freq, when, velocity) => {
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, when);
    env.gain.exponentialRampToValueAtTime(velocity, when + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, when + 2.6);

    const body = ctx.createOscillator();
    body.type = 'triangle';
    body.frequency.value = freq;
    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.value = freq * 2;
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.35;

    body.connect(env);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(env);
    env.connect(bus);

    body.start(when);
    shimmer.start(when);
    body.stop(when + 2.7);
    shimmer.stop(when + 2.7);
  };

  let step = 0;
  let nextTime = 0;
  let timer = null;

  const schedule = () => {
    while (nextTime < ctx.currentTime + 1.2) {
      const chord = PROGRESSION[Math.floor(step / 8) % PROGRESSION.length];
      const index = PATTERN[step % 8];
      pluck(chord[index], nextTime, index === 3 ? 0.1 : 0.12);
      if (step % 8 === 0) pluck(chord[0] / 2, nextTime, 0.1); // soft bass on the downbeat
      nextTime += STEP_SECONDS;
      step += 1;
    }
  };

  return {
    start() {
      if (timer) return;
      nextTime = ctx.currentTime + 0.05;
      schedule();
      timer = setInterval(schedule, 300);
    },
    stop() {
      clearInterval(timer);
      timer = null;
    },
  };
}

export function useAmbientAudio({ src, volume = 0.45, fadeInMs = 2200, fadeOutMs = 900 }) {
  const [playing, setPlaying] = useState(false);
  const engine = useRef({ mode: null, audio: null, ctx: null, master: null, synth: null, fade: null });

  const rampTo = useCallback((target, ms, onDone) => {
    const e = engine.current;
    clearInterval(e.fade);
    if (e.mode === 'synth' && e.ctx) {
      const now = e.ctx.currentTime;
      e.master.gain.cancelScheduledValues(now);
      e.master.gain.setValueAtTime(e.master.gain.value, now);
      e.master.gain.linearRampToValueAtTime(target, now + ms / 1000);
      e.fade = setTimeout(() => onDone?.(), ms);
      return;
    }
    if (e.audio) {
      const from = e.audio.volume;
      const t0 = performance.now();
      e.fade = setInterval(() => {
        const k = Math.min(1, (performance.now() - t0) / ms);
        e.audio.volume = Math.min(1, Math.max(0, from + (target - from) * k));
        if (k >= 1) {
          clearInterval(e.fade);
          onDone?.();
        }
      }, 40);
    }
  }, []);

  const startSynth = useCallback(() => {
    const e = engine.current;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return false;
    if (!e.ctx) {
      e.ctx = new Ctx();
      e.master = e.ctx.createGain();
      e.master.gain.value = 0;
      e.master.connect(e.ctx.destination);
      e.synth = createSynth(e.ctx, e.master);
    }
    e.mode = 'synth';
    e.ctx.resume();
    e.synth.start();
    return true;
  }, []);

  const play = useCallback(async () => {
    const e = engine.current;
    if (e.mode === null) {
      try {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0;
        await audio.play(); // rejects if the file is missing / not decodable
        e.audio = audio;
        e.mode = 'file';
      } catch {
        if (!startSynth()) return;
      }
    } else if (e.mode === 'file') {
      await e.audio.play().catch(() => {});
    } else {
      e.ctx.resume();
      e.synth.start();
    }
    rampTo(volume * (e.mode === 'synth' ? 0.9 : 1), fadeInMs);
    setPlaying(true);
  }, [src, volume, fadeInMs, rampTo, startSynth]);

  const pause = useCallback(() => {
    const e = engine.current;
    setPlaying(false);
    rampTo(0, fadeOutMs, () => {
      if (e.mode === 'file') e.audio?.pause();
      if (e.mode === 'synth') {
        e.synth.stop();
        e.ctx.suspend();
      }
    });
  }, [fadeOutMs, rampTo]);

  const toggle = useCallback(() => (playing ? pause() : play()), [playing, pause, play]);

  useEffect(() => {
    const e = engine.current;
    return () => {
      clearInterval(e.fade);
      e.audio?.pause();
      e.synth?.stop();
      e.ctx?.close();
    };
  }, []);

  return { playing, toggle, play, pause };
}
