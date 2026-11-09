import { useState } from 'react'
import SubScreen from '../components/SubScreen.jsx'
import PictoCard from '../components/PictoCard.jsx'
import Pictogram from '../components/Pictogram.jsx'
import { NEEDS, PICTOS } from '../data/pictograms.js'
import { speak } from '../lib/speech.js'

/** Recorrido A — Expresión inmediata (necesidades y emociones). */
export default function ExpressionScreen({ onHome }) {
  const [selected, setSelected] = useState(null)
  const need = NEEDS.find((n) => n.key === selected)

  const choose = (n) => {
    setSelected(n.key)
    speak(n.text)
  }

  return (
    <SubScreen title="Necesito algo" pictoId={PICTOS.quiero.id} bg="bg-lila" onHome={onHome}>
      <div className="grid grid-cols-2 gap-5">
        {NEEDS.map((n) => (
          <PictoCard
            key={n.key}
            pictoId={n.picto.id}
            label={n.text}
            zone={n.zone}
            selected={selected === n.key}
            onPress={() => choose(n)}
          />
        ))}
      </div>

      {/* Mensaje grande para la persona adulta que acompaña (también sin audio) */}
      <section
        aria-live="polite"
        className="mt-6 flex min-h-40 items-center gap-5 rounded-3xl border-4 border-tinta bg-papel p-5"
      >
        {need ? (
          <>
            <Pictogram id={need.picto.id} className="h-28 w-28 shrink-0" />
            <p className="flex-1 text-4xl font-semibold leading-tight sm:text-5xl">{need.text}</p>
            <button
              type="button"
              onClick={() => speak(need.text)}
              className="min-h-24 shrink-0 rounded-2xl border-4 border-tinta bg-salvia px-5 text-2xl font-semibold active:bg-arena"
            >
              Repetir
            </button>
          </>
        ) : (
          <p className="w-full text-center text-3xl font-medium text-tinta/80">Tocá una tarjeta para contar lo que necesitás</p>
        )}
      </section>
    </SubScreen>
  )
}
