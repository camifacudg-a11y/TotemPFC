// Envoltorio mínimo de la Web Speech API (speechSynthesis) en español.
const PREFERRED_LANGS = ['es-AR', 'es-419', 'es-US', 'es-MX', 'es-ES']

export const speechSupported = () =>
  typeof window !== 'undefined' && 'speechSynthesis' in window

let cachedVoice = null

function pickVoice() {
  if (!speechSupported()) return null
  const voices = window.speechSynthesis.getVoices()
  if (!voices.length) return null
  for (const lang of PREFERRED_LANGS) {
    const v = voices.find((x) => x.lang?.replace('_', '-').toLowerCase() === lang.toLowerCase())
    if (v) return v
  }
  return voices.find((x) => x.lang?.toLowerCase().startsWith('es')) ?? null
}

if (speechSupported()) {
  cachedVoice = pickVoice()
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    cachedVoice = pickVoice()
  })
}

/**
 * Lee un texto en voz alta. Velocidad algo más lenta y tono neutro
 * para facilitar la comprensión.
 */
export function speak(text, { onStart, onEnd } = {}) {
  if (!speechSupported() || !text) {
    onEnd?.()
    return false
  }
  const synth = window.speechSynthesis
  synth.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const voice = cachedVoice ?? pickVoice()
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? 'es-ES'
  u.rate = 0.85
  u.pitch = 1
  u.volume = 1
  u.onstart = () => onStart?.()
  u.onend = () => onEnd?.()
  u.onerror = () => onEnd?.()
  synth.speak(u)
  return true
}

export function stopSpeaking() {
  if (speechSupported()) window.speechSynthesis.cancel()
}
