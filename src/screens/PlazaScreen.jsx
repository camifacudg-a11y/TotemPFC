import { useState } from 'react'
import SubScreen from '../components/SubScreen.jsx'
import PictoCard from '../components/PictoCard.jsx'
import Pictogram from '../components/Pictogram.jsx'
import { ACTIVITIES, PICTOS, ZONE_BG } from '../data/pictograms.js'
import { speak } from '../lib/speech.js'

const STEP_NAMES = ['Primero', 'Después', 'Al final']
const MAX_STEPS = STEP_NAMES.length

/**
 * Recorrido B — Estructuración espacial.
 * El niño o la niña elige actividades y se arma una agenda visual
 * "Primero → Después → Al final" para anticipar la rutina en la plaza.
 * Tocar un paso de la agenda lo marca como terminado.
 */
export default function PlazaScreen({ onHome }) {
  const [plan, setPlan] = useState([]) // [{ key, done }]

  const add = (a) => {
    speak(a.text)
    setPlan((p) => (p.length >= MAX_STEPS ? p : [...p, { key: a.key, done: false }]))
  }

  const toggleDone = (i) =>
    setPlan((p) => p.map((s, idx) => (idx === i ? { ...s, done: !s.done } : s)))

  const readPlan = () =>
    speak(
      plan
        .map((s, i) => `${STEP_NAMES[i]}, ${ACTIVITIES.find((a) => a.key === s.key).text.toLowerCase()}`)
        .join('. '),
    )

  const full = plan.length >= MAX_STEPS

  return (
    <SubScreen title="¿Qué hago en la plaza?" pictoId={PICTOS.jugar.id} bg="bg-arena" onHome={onHome}>
      {/* Agenda visual */}
      <section aria-label="Mi plan" className="rounded-3xl border-4 border-tinta bg-papel p-4">
        <h2 className="mb-3 text-3xl font-semibold">Mi plan</h2>
        <ol className="grid grid-cols-3 gap-3">
          {STEP_NAMES.map((name, i) => {
            const step = plan[i]
            const act = step && ACTIVITIES.find((a) => a.key === step.key)
            return (
              <li key={name}>
                <button
                  type="button"
                  disabled={!act}
                  onClick={() => toggleDone(i)}
                  aria-label={act ? `${name}: ${act.text}${step.done ? ', terminado' : ''}` : `${name}: vacío`}
                  className={`flex min-h-52 w-full flex-col items-center justify-start gap-2 rounded-2xl border-4 p-3 ${
                    act ? `${ZONE_BG[act.zone]} border-tinta` : 'border-dashed border-tinta/40 bg-papel'
                  }`}
                >
                  <span className="text-2xl font-semibold">
                    {i + 1}. {name}
                  </span>
                  {act && (
                    <>
                      <span className={`relative rounded-xl bg-papel p-1 ${step.done ? 'opacity-40' : ''}`}>
                        <Pictogram id={act.picto.id} className="h-24 w-24" />
                      </span>
                      <span className="text-xl font-medium">{step.done ? '✓ Terminado' : act.picto.label}</span>
                    </>
                  )}
                </button>
              </li>
            )
          })}
        </ol>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={!plan.length}
            onClick={readPlan}
            className="min-h-20 rounded-2xl border-4 border-tinta bg-salvia text-2xl font-semibold active:bg-arena disabled:opacity-40"
          >
            Escuchar mi plan
          </button>
          <button
            type="button"
            disabled={!plan.length}
            onClick={() => setPlan([])}
            className="min-h-20 rounded-2xl border-4 border-tinta bg-papel text-2xl font-semibold active:bg-arena disabled:opacity-40"
          >
            Empezar de nuevo
          </button>
        </div>
      </section>

      <p className="my-5 text-center text-3xl font-medium">
        {full ? 'Tu plan está listo' : `Elegí qué hacer${plan.length ? ' después' : ' primero'}`}
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {ACTIVITIES.map((a) => (
          <PictoCard
            key={a.key}
            pictoId={a.picto.id}
            label={a.text}
            zone={a.zone}
            selected={plan.some((s) => s.key === a.key)}
            onPress={() => add(a)}
          />
        ))}
      </div>
    </SubScreen>
  )
}
