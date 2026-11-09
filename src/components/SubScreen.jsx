import HomeIcon from './HomeIcon.jsx'
import Pictogram from './Pictogram.jsx'

/**
 * Plantilla común de las subpantallas:
 *  - Cabecera con pictograma + título (qué estoy haciendo ahora).
 *  - Contenido.
 *  - Barra inferior persistente "Volver al inicio": va abajo porque en un
 *    tótem vertical es la zona que alcanzan los niños más pequeños.
 */
export default function SubScreen({ title, pictoId, bg = 'bg-calma', onHome, children }) {
  return (
    <div className={`flex h-full flex-col ${bg}`}>
      <header className="flex items-center gap-5 border-b-4 border-tinta bg-papel px-6 py-4">
        {pictoId && <Pictogram id={pictoId} className="h-20 w-20 shrink-0" />}
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">{children}</main>

      <nav className="border-t-4 border-tinta bg-papel p-4">
        <button
          type="button"
          onClick={onHome}
          className="flex min-h-24 w-full items-center justify-center gap-5 rounded-3xl border-4 border-tinta bg-calma px-6 text-3xl font-semibold active:bg-lila sm:text-4xl"
        >
          <HomeIcon className="h-14 w-14" />
          Volver al inicio
        </button>
      </nav>
    </div>
  )
}
