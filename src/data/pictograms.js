// Pictogramas ARASAAC (https://arasaac.org) — Autor: Sergio Palao.
// Licencia: CC BY-NC-SA. Propiedad: Gobierno de Aragón (España).
export const arasaacUrl = (id) =>
  `https://static.arasaac.org/pictograms/${id}/${id}_300.png`

// IDs verificados contra la API oficial (api.arasaac.org), noviembre 2026.
export const PICTOS = {
  yo: { id: 2617, label: 'Yo' },
  quiero: { id: 5441, label: 'Quiero' },
  jugar: { id: 2439, label: 'Jugar' },
  descansar: { id: 3299, label: 'Descansar' },
  duele: { id: 30620, label: 'Me duele' },
  bano: { id: 2430, label: 'Baño' },
  agua: { id: 2248, label: 'Agua' },
  sed: { id: 7273, label: 'Tengo sed' },
  calma: { id: 32826, label: 'Zona de calma' },
  silencio: { id: 5936, label: 'Silencio' },
  feliz: { id: 3245, label: 'Feliz' },
  triste: { id: 2606, label: 'Triste' },
  enojado: { id: 2374, label: 'Enojado' },
  hamaca: { id: 4608, label: 'Hamaca' },
  tobogan: { id: 4759, label: 'Tobogán' },
}

/* Recorrido A — Expresión inmediata */
export const NEEDS = [
  { key: 'bano', picto: PICTOS.bano, text: 'Quiero ir al baño', zone: 'arena' },
  { key: 'sed', picto: PICTOS.sed, text: 'Tengo sed', zone: 'calma' },
  { key: 'calma', picto: PICTOS.calma, text: 'Necesito un espacio tranquilo', zone: 'lila' },
  { key: 'duele', picto: PICTOS.duele, text: 'Me siento mal. Me duele', zone: 'alerta' },
]

/* Recorrido B — Estructuración espacial */
export const ACTIVITIES = [
  { key: 'hamaca', picto: PICTOS.hamaca, text: 'Jugar en la hamaca', zone: 'juego' },
  { key: 'tobogan', picto: PICTOS.tobogan, text: 'Jugar en el tobogán', zone: 'juego' },
  { key: 'calma', picto: PICTOS.calma, text: 'Descansar en la zona de calma', zone: 'calma' },
]

/* Recorrido C — Tablero CAA (código de color Fitzgerald adaptado a la paleta) */
export const CATEGORIES = [
  {
    key: 'sujetos',
    title: 'Personas',
    zone: 'juego',
    items: [PICTOS.yo],
  },
  {
    key: 'verbos',
    title: 'Acciones',
    zone: 'salvia',
    items: [PICTOS.quiero, PICTOS.jugar, PICTOS.descansar, PICTOS.duele],
  },
  {
    key: 'sustantivos',
    title: 'Cosas y lugares',
    zone: 'arena',
    items: [PICTOS.hamaca, PICTOS.tobogan, PICTOS.agua, PICTOS.bano, PICTOS.calma],
  },
  {
    key: 'atributos',
    title: 'Cómo me siento',
    zone: 'calma',
    items: [PICTOS.feliz, PICTOS.triste, PICTOS.enojado, PICTOS.sed, PICTOS.silencio],
  },
]

// Clases estáticas (Tailwind necesita los nombres completos)
export const ZONE_BG = {
  calma: 'bg-calma',
  lila: 'bg-lila',
  salvia: 'bg-salvia',
  arena: 'bg-arena',
  juego: 'bg-juego',
  alerta: 'bg-alerta',
}
