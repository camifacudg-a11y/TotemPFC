import Pictogram from './Pictogram.jsx'
import { ZONE_BG } from '../data/pictograms.js'

/**
 * Tarjeta táctil grande: pictograma arriba, texto debajo.
 * El resaltado al seleccionar es un borde grueso oscuro (sin sombras ni
 * animación). El borde siempre existe para que no haya saltos de tamaño.
 */
export default function PictoCard({
  pictoId,
  label,
  zone = 'calma',
  selected = false,
  onPress,
  size = 'lg',
  ariaLabel,
}) {
  const sizes = {
    lg: { img: 'h-40 w-40 sm:h-52 sm:w-52', text: 'text-3xl sm:text-4xl', pad: 'p-5 min-h-72' },
    md: { img: 'h-24 w-24 sm:h-28 sm:w-28', text: 'text-xl sm:text-2xl', pad: 'p-3 min-h-44' },
  }[size]

  return (
    <button
      type="button"
      onClick={onPress}
      aria-pressed={selected}
      aria-label={ariaLabel ?? label}
      className={`flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-[6px] text-center ${sizes.pad} ${ZONE_BG[zone]} ${
        selected ? 'border-tinta' : 'border-tinta/25'
      }`}
    >
      <span className={`flex items-center justify-center rounded-2xl bg-papel p-2`}>
        <Pictogram id={pictoId} className={sizes.img} />
      </span>
      <span className={`font-semibold leading-tight ${sizes.text}`}>{label}</span>
    </button>
  )
}
