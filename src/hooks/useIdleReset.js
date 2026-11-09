import { useEffect, useRef } from 'react'

/**
 * Tótem público: si nadie toca la pantalla durante `ms`, se ejecuta `onIdle`
 * (volver al inicio y limpiar la frase para la siguiente persona).
 */
export function useIdleReset(onIdle, ms, enabled = true) {
  const cb = useRef(onIdle)
  cb.current = onIdle

  useEffect(() => {
    if (!enabled) return
    let t = setTimeout(() => cb.current(), ms)
    const reset = () => {
      clearTimeout(t)
      t = setTimeout(() => cb.current(), ms)
    }
    const events = ['pointerdown', 'keydown']
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    return () => {
      clearTimeout(t)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [ms, enabled])
}
