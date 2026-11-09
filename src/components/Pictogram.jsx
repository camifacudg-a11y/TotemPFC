import { useState } from 'react'
import { arasaacUrl } from '../data/pictograms.js'

/**
 * Pictograma ARASAAC. Es decorativo (alt vacío) porque siempre va acompañado
 * de su texto; si la imagen no carga se muestra un recuadro neutro.
 */
export default function Pictogram({ id, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={`flex items-center justify-center rounded-2xl border-4 border-dashed border-tinta/30 ${className}`}
      />
    )
  }

  return (
    <img
      src={arasaacUrl(id)}
      alt=""
      aria-hidden="true"
      draggable="false"
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-contain ${className}`}
    />
  )
}
