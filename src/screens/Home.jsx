import Pictogram from '../components/Pictogram.jsx'
import { PICTOS } from '../data/pictograms.js'

const JOURNEYS = [
  {
    key: 'expresion',
    title: 'Necesito algo',
    hint: 'Baño, agua, calma, me duele',
    pictos: [PICTOS.bano.id, PICTOS.agua.id],
    bg: 'bg-lila',
  },
  {
    key: 'plaza',
    title: '¿Qué hago en la plaza?',
    hint: 'Hamaca, tobogán, descanso',
    pictos: [PICTOS.hamaca.id, PICTOS.tobogan.id],
    bg: 'bg-juego',
  },
  {
    key: 'frases',
    title: 'Armar una frase',
    hint: 'Yo · quiero · jugar',
    pictos: [PICTOS.yo.id, PICTOS.quiero.id],
    bg: 'bg-salvia',
  },
]

export default function Home({ onNavigate }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto overscroll-contain bg-calma">
      <header className="px-6 pb-4 pt-8 text-center sm:pt-12">
        <p className="text-2xl font-medium sm:text-3xl">Plaza para todos</p>
        <h1 className="mt-2 text-5xl font-semibold leading-tight sm:text-6xl">¡Hola! ¿Qué querés hacer?</h1>
      </header>

      <main className="flex flex-1 flex-col justify-center gap-6 px-5 pb-8 sm:px-10">
        {JOURNEYS.map((j) => (
          <button
            key={j.key}
            type="button"
            onClick={() => onNavigate(j.key)}
            className={`flex min-h-56 w-full items-center gap-6 rounded-[2rem] border-[6px] border-tinta px-6 py-5 text-left active:border-papel ${j.bg}`}
          >
            <span className="flex shrink-0 gap-2 rounded-3xl bg-papel p-3">
              {j.pictos.map((id) => (
                <Pictogram key={id} id={id} className="h-24 w-24 sm:h-32 sm:w-32" />
              ))}
            </span>
            <span className="flex flex-col gap-2">
              <span className="text-4xl font-semibold leading-tight sm:text-5xl">{j.title}</span>
              <span className="text-2xl font-normal sm:text-3xl">{j.hint}</span>
            </span>
          </button>
        ))}
      </main>

      <footer className="px-6 pb-4 text-center text-base text-tinta/80">
        Pictogramas: Sergio Palao · ARASAAC (arasaac.org) · Licencia CC BY-NC-SA · Gobierno de Aragón
      </footer>
    </div>
  )
}
