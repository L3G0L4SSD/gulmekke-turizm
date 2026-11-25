/**
 * SPIRITUAL SOUNDSCAPE SYNTHESIZER (Web Audio API)
 * Zero external audio files required! Generates a meditative, serene desert breeze & deep harmonic drone.
 */

let audioCtx = null;
let isPlaying = false;
let masterGain = null;
let oscillators = [];
let noiseNode = null;

export function initAmbientAudio() {
  const toggleBtn = document.getElementById('sound-toggle');
  if (!toggleBtn) return;

  const statusText = toggleBtn.querySelector('.sound-status');

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!isPlaying) {
      startSoundscape();
      isPlaying = true;
      toggleBtn.classList.add('playing');
      if (statusText) statusText.textContent = 'Açık';
    } else {
      stopSoundscape();
      isPlaying = false;
      toggleBtn.classList.remove('playing');
      if (statusText) statusText.textContent = 'Kapalı';
    }
  });
}

function startSoundscape() {
  if (!audioCtx) return;

  masterGain = audioCtx.createGain();
  masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
  masterGain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 3.0); // Gentle 3-sec fade-in
  masterGain.connect(audioCtx.destination);

  // 1. Root Harmonic Drone (Warm meditative D note ~ 146.83 Hz)
  const freqs = [73.42, 146.83, 220.0, 293.66];
  oscillators = freqs.map((f, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);

    // Subtle natural detuning for warmth
    osc.detune.setValueAtTime((Math.random() - 0.5) * 6, audioCtx.currentTime);

    const relativeVol = 0.3 / (i + 1);
    gain.gain.setValueAtTime(relativeVol, audioCtx.currentTime);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    return osc;
  });

  // 2. Filtered Desert Breeze Noise
  const bufferSize = audioCtx.sampleRate * 2;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  noiseNode = audioCtx.createBufferSource();
  noiseNode.buffer = noiseBuffer;
  noiseNode.loop = true;

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(420, audioCtx.currentTime);
  bandpass.Q.setValueAtTime(1.2, audioCtx.currentTime);

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

  noiseNode.connect(bandpass);
  bandpass.connect(noiseGain);
  noiseGain.connect(masterGain);
  noiseNode.start();
}

function stopSoundscape() {
  if (!masterGain || !audioCtx) return;

  // Gentle 1.5-sec fade-out
  masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
  setTimeout(() => {
    oscillators.forEach((osc) => {
      try { osc.stop(); } catch (e) {}
    });
    if (noiseNode) {
      try { noiseNode.stop(); } catch (e) {}
    }
    oscillators = [];
  }, 1600);
}
