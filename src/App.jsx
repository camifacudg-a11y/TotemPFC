import { useCallback, useState } from 'react'
import Home from './screens/Home.jsx'
import ExpressionScreen from './screens/ExpressionScreen.jsx'
import PlazaScreen from './screens/PlazaScreen.jsx'
import PhraseBoard from './screens/PhraseBoard.jsx'
import { useIdleReset } from './hooks/useIdleReset.js'
import { stopSpeaking } from './lib/speech.js'

// Tiempo sin uso tras el cual el tótem vuelve al inicio (uso público).
const IDLE_MS = 90_000

export default function App() {
  const [screen, setScreen] = useState('home')
  const [phrase, setPhrase] = useState([])

  const goHome = useCallback(() => {
    stopSpeaking()
    setScreen('home')
  }, [])

  useIdleReset(
    () => {
      goHome()
      setPhrase([])
    },
    IDLE_MS,
    screen !== 'home',
  )

  return (
    // Contenedor vertical tipo tótem: ocupa toda la pantalla, centrado en monitores anchos.
    <div className="mx-auto h-dvh max-w-[1080px] overflow-hidden">
      {screen === 'home' && <Home onNavigate={setScreen} />}
      {screen === 'expresion' && <ExpressionScreen onHome={goHome} />}
      {screen === 'plaza' && <PlazaScreen onHome={goHome} />}
      {screen === 'frases' && <PhraseBoard phrase={phrase} setPhrase={setPhrase} onHome={goHome} />}
    </div>
  )
}
