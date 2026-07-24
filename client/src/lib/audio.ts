/**
 * audio.ts — Spacecraft audio synthesis
 * Mechanical relay clicks and sub-bass telemetry pings.
 * All sounds are synthesized via Web Audio API — no external assets.
 */

let soundEnabled = false;
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (!soundEnabled) return null;
  if (!audioContext) {
    try {
      audioContext = new AudioContext();
    } catch {
      return null;
    }
  }
  return audioContext;
}

export function getSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (!enabled && audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

/**
 * Mechanical switch click — short, dry, precise.
 * Modeled on a low-mass tactile relay actuating.
 */
export function playClickSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Body — low-frequency thump (the mass of the switch actuating)
  const bodyBuf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
  const bodyData = bodyBuf.getChannelData(0);
  for (let i = 0; i < bodyData.length; i++) {
    const t = i / ctx.sampleRate;
    const envelope = Math.exp(-t * 120);
    bodyData[i] = (Math.random() * 2 - 1) * envelope * 0.6;
  }
  const bodyNode = ctx.createBufferSource();
  bodyNode.buffer = bodyBuf;

  // Tone — very brief 800Hz ping (the contact bounce resonance)
  const pingOsc = ctx.createOscillator();
  pingOsc.type = "sine";
  pingOsc.frequency.setValueAtTime(800, now);
  pingOsc.frequency.exponentialRampToValueAtTime(180, now + 0.025);

  const pingGain = ctx.createGain();
  pingGain.gain.setValueAtTime(0.12, now);
  pingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

  // High-pass filter — remove sub-bass from the ping
  const hpf = ctx.createBiquadFilter();
  hpf.type = "highpass";
  hpf.frequency.value = 400;

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.55;

  bodyNode.connect(masterGain);
  pingOsc.connect(pingGain);
  pingGain.connect(hpf);
  hpf.connect(masterGain);
  masterGain.connect(ctx.destination);

  bodyNode.start(now);
  bodyNode.stop(now + 0.05);
  pingOsc.start(now);
  pingOsc.stop(now + 0.04);
}

/**
 * Hover tone — barely-audible, high-frequency confirmation.
 * Modeled on a telemetry lock acknowledgment.
 */
export function playHoverSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.exponentialRampToValueAtTime(1100, now + 0.06);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
}
