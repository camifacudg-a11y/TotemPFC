import { useState } from 'react'
import SubScreen from '../components/SubScreen.jsx'
import PictoCard from '../components/PictoCard.jsx'
import Pictogram from '../components/Pictogram.jsx'
import { CATEGORIES, PICTOS, ZONE_BG } from '../data/pictograms.js'
import { speak, speechSupported, stopSpeaking } from '../lib/speech.js'

const MAX_WORDS = 8
let nextUid = 0

/** Recorrido C — Construcción de frases (tablero CAA). */
export default function PhraseBoard({ phrase, setPhrase, onHome }) {
  const [speaking, setSpeaking] = useState(false)

  const add = (picto, zone) =>
    setPhrase((p) => (p.length >= MAX_WORDS ? p : [...p, { ...picto, zone, uid: nextUid++ }]))

  const removeAt = (i) => setPhrase((p) => p.filter((_, idx) => idx !== i))
  const removeLast = () => setPhrase((p) => p.slice(0, -1))
  const clear = () => {
    stopSpeaking()
    setSpeaking(false)
    setPhrase([])
  }

  const play = () =>
    speak(phrase.map((w) => w.label.toLowerCase()).join(' '), {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    })

  const empty = phrase.length === 0

  return (
    <SubScreen title="Armar una frase" pictoId={PICTOS.yo.id} bg="bg-calma" onHome={onHome}>
      {/* Tira de frase */}
      <section aria-label="Mi frase" className="flex gap-3">
        <div
          aria-live="polite"
          className="flex min-h-44 flex-1 flex-wrap items-center gap-2 rounded-3xl border-4 border-tinta bg-papel p-3"
        >
          {empty ? (
            <p className="w-full text-center text-2xl font-medium text-tinta/70 sm:text-3xl">Tocá los dibujos para armar tu frase</p>
          ) : (
            phrase.map((w, i) => (
              <button
                key={w.uid}
                type="button"
                onClick={() => removeAt(i)}
                aria-label={`${w.label}. Tocar para quitar`}
                className={`flex w-24 flex-col items-center rounded-2xl border-4 border-tinta/40 p-1 sm:w-28 ${ZONE_BG[w.zone]}`}
              >
                <span className="rounded-xl bg-papel p-1">
                  <Pictogram id={w.id} className="h-16 w-16 sm:h-20 sm:w-20" />
                </span>
                <span className="mt-1 text-base font-semibold leading-tight sm:text-lg">{w.label}</span>
              </button>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={play}
          disabled={empty}
          className={`flex w-36 shrink-0 flex-col items-center justify-center gap-2 rounded-3xl border-[6px] border-tinta text-2xl font-semibold disabled:opacity-40 sm:w-44 sm:text-3xl ${
            speaking ? 'bg-juego' : 'bg-salvia'
          }`}
        >
          <SpeakerIcon className="h-16 w-16" />
          {speaking ? 'Hablando' : 'Hablar'}
        </button>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={removeLast}
          disabled={empty}
          className="min-h-20 rounded-2xl border-4 border-tinta bg-papel text-2xl font-semibold active:bg-arena disabled:opacity-40"
        >
          ⌫ Borrar último
        </button>
        <button
          type="button"
          onClick={clear}
          disabled={empty}
          className="min-h-20 rounded-2xl border-4 border-tinta bg-papel text-2xl font-semibold active:bg-arena disabled:opacity-40"
        >
          Borrar frase
        </button>
      </div>

      {!speechSupported() && (
        <p className="mt-3 rounded-2xl border-4 border-alerta bg-papel p-3 text-xl">
          Este navegador no puede leer en voz alta. La frase se puede mostrar en pantalla.
        </p>
      )}

      {/* Grillas por categoría (colores CAA adaptados a la paleta) */}
      <div className="mt-6 flex flex-col gap-5">
        {CATEGORIES.map((cat) => (
          <section key={cat.key} aria-label={cat.title} className={`rounded-3xl border-4 border-tinta p-4 ${ZONE_BG[cat.zone]}`}>
            <h2 className="mb-3 text-2xl font-semibold sm:text-3xl">{cat.title}</h2>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {cat.items.map((p) => (
                <PictoCard
                  key={p.id}
                  size="md"
                  pictoId={p.id}
                  label={p.label}
                  zone={cat.zone}
                  ariaLabel={`Añadir ${p.label}`}
                  onPress={() => add(p, cat.zone)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </SubScreen>
  )
}

function SpeakerIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M8 18v12h8l10 8V10l-10 8H8Z" fill="currentColor" />
      <path d="M33 17a9 9 0 0 1 0 14" />
      <path d="M38 11a17 17 0 0 1 0 26" />
    </svg>
  )
}
