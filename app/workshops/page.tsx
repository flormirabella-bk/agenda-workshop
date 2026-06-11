"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { Clock, MapPin, Video, ArrowUpRight, Globe, X, CheckCircle } from "lucide-react"

type Modality = "Virtual" | "Presencial"
type Filter = "Todas" | Modality

type Workshop = {
  id: number
  day: string
  month: string
  time: string
  city: string
  country: string
  modality: Modality
  spots: number
  totalSpots: number
  language: string
  free: boolean
}

const workshops: Workshop[] = [
  { id: 1,  day: "19", month: "JUN", time: "10:00 AM", city: "Buenos Aires",    country: "Argentina", modality: "Presencial", spots: 8,  totalSpots: 12, language: "Español", free: true },
  { id: 2,  day: "19", month: "JUN", time: "10:00 AM", city: "Buenos Aires",    country: "Argentina", modality: "Virtual",    spots: 4,  totalSpots: 12, language: "Español", free: true },
  { id: 3,  day: "26", month: "JUN", time: "3:00 PM",  city: "Bogotá",          country: "Colombia",  modality: "Presencial", spots: 2,  totalSpots: 12, language: "Español", free: true },
  { id: 4,  day: "26", month: "JUN", time: "3:00 PM",  city: "Bogotá",          country: "Colombia",  modality: "Virtual",    spots: 6,  totalSpots: 12, language: "Español", free: true },
  { id: 13, day: "26", month: "JUN", time: "6:00 PM",  city: "Bogotá",          country: "Colombia",  modality: "Presencial", spots: 0,  totalSpots: 12, language: "Español", free: true },
  { id: 14, day: "26", month: "JUN", time: "6:00 PM",  city: "Bogotá",          country: "Colombia",  modality: "Virtual",    spots: 11, totalSpots: 12, language: "Español", free: true },
  { id: 5,  day: "03", month: "JUL", time: "11:00 AM", city: "Ciudad de México", country: "México",   modality: "Presencial", spots: 5,  totalSpots: 12, language: "Español", free: true },
  { id: 6,  day: "03", month: "JUL", time: "11:00 AM", city: "Ciudad de México", country: "México",   modality: "Virtual",    spots: 9,  totalSpots: 12, language: "Español", free: true },
  { id: 7,  day: "10", month: "JUL", time: "4:00 PM",  city: "Buenos Aires",     country: "Argentina", modality: "Presencial", spots: 3,  totalSpots: 12, language: "Español", free: true },
  { id: 8,  day: "10", month: "JUL", time: "4:00 PM",  city: "Buenos Aires",     country: "Argentina", modality: "Virtual",    spots: 7,  totalSpots: 12, language: "Español", free: true },
  { id: 9,  day: "17", month: "JUL", time: "10:00 AM", city: "Bogotá",           country: "Colombia",  modality: "Presencial", spots: 10, totalSpots: 12, language: "Español", free: true },
  { id: 10, day: "17", month: "JUL", time: "10:00 AM", city: "Bogotá",           country: "Colombia",  modality: "Virtual",    spots: 5,  totalSpots: 12, language: "Español", free: true },
  { id: 11, day: "24", month: "JUL", time: "3:00 PM",  city: "Ciudad de México", country: "México",    modality: "Presencial", spots: 6,  totalSpots: 12, language: "Español", free: true },
  { id: 12, day: "24", month: "JUL", time: "3:00 PM",  city: "Ciudad de México", country: "México",    modality: "Virtual",    spots: 8,  totalSpots: 12, language: "Español", free: true },
]

const FILTERS: Filter[] = ["Todas", "Presencial", "Virtual"]

// Datos del usuario logueado
const currentUser = {
  name: "María González",
  email: "maria.gonzalez@empresa.com",
  company: "Empresa S.A.",
}

export default function WorkshopsPage() {
  const [activeDate, setActiveDate] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<Filter>("Todas")
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
  const [form, setForm] = useState(currentUser)
  const [submitted, setSubmitted] = useState(false)

  function openModal(w: Workshop) {
    setSelectedWorkshop(w)
    setForm(currentUser)
    setSubmitted(false)
  }

  function closeModal() {
    setSelectedWorkshop(null)
    setSubmitted(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const uniqueDates = useMemo(() => {
    const seen = new Set<string>()
    return workshops.filter((w) => {
      const key = `${w.day}-${w.month}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [])

  const filtered = workshops.filter((w) => {
    const matchesDate = !activeDate || `${w.day}-${w.month}` === activeDate
    const matchesFilter = activeFilter === "Todas" || w.modality === activeFilter
    return matchesDate && matchesFilter
  })

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-[320px] overflow-hidden bg-[#7b82f0]">
          <div className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-white/5" />
          <div className="absolute right-40 -top-20 h-[400px] w-[400px] rounded-full bg-white/5" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 pt-14 pb-8">
          <h1 className="text-4xl font-semibold text-white">Todos los workshops</h1>
          <p className="mt-2 max-w-xl text-base text-white/80 leading-relaxed">
            Reservá tu lugar en nuestras capacitaciones virtuales y presenciales. Sumate a la comunidad y aprendé a sacarle el máximo provecho a la plataforma.
          </p>
        </div>
      </section>

      {/* List */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-[1400px] px-6 pt-8 pb-16">

          {/* Section title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1e1b4b]">Botmaker 3.0 - Workshop</h2>
            <p className="mt-1 text-sm text-gray-500">Participá de los talleres en vivo sobre la nueva versión de Botmaker.</p>
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Date chips */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveDate(null)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
                  activeDate === null
                    ? "border-[#4f46e5] bg-[#4f46e5] text-white"
                    : "border-gray-200 text-gray-500 hover:border-gray-400"
                }`}
              >
                Todas las fechas
              </button>
              {uniqueDates.map((w) => (
                <button
                  key={`${w.day}-${w.month}`}
                  onClick={() => setActiveDate(`${w.day}-${w.month}`)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-all ${
                    activeDate === `${w.day}-${w.month}`
                      ? "border-[#4f46e5] bg-[#4f46e5] text-white"
                      : "border-gray-200 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {w.day} {w.month}
                </button>
              ))}
            </div>

            {/* Segmented control */}
            <div className="inline-flex rounded-xl bg-gray-100 p-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-lg px-5 py-1.5 text-sm font-medium transition-all ${
                    activeFilter === f
                      ? "bg-white text-[#1e1b4b] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-gray-400">No se encontraron workshops para esa búsqueda.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((w) => {
                const urgent = w.spots > 0 && w.spots <= 2
                const location = `${w.city}, ${w.country}`
                const Icon = w.modality === "Virtual" ? Video : MapPin

                const full = w.spots === 0

                return (
                  <div
                    key={w.id}
                    className={`flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm ${full ? "border-gray-100 opacity-70" : "border-gray-200"}`}
                  >
                    {/* Date + city + modality badge */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#eef0fe]">
                          <span className="text-lg font-bold leading-none text-[#1e1b4b]">{w.day}</span>
                          <span className="mt-0.5 text-xs font-semibold tracking-wide text-[#4f46e5]">{w.month}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1e1b4b]">{w.city}</p>
                          <p className="text-xs text-gray-400">{w.country}</p>
                        </div>
                      </div>
                      <span className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        w.modality === "Virtual"
                          ? "border-indigo-200 text-[#4f46e5]"
                          : "border-emerald-200 text-emerald-700"
                      }`}>
                        <Icon className="h-3 w-3" />
                        {w.modality}
                      </span>
                    </div>

                    {/* Time · language */}
                    <div className="flex items-center gap-x-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 shrink-0" /> {w.time}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="flex items-center gap-1.5">
                        <Globe className="h-4 w-4 shrink-0" /> {w.language}
                      </span>
                    </div>

                    {/* Spots + CTA */}
                    <div className="flex items-center justify-between gap-3 mt-auto pt-1 border-t border-gray-100">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        full
                          ? "bg-gray-100 text-gray-400"
                          : urgent
                          ? "bg-red-50 text-[#e11d48]"
                          : "bg-emerald-50 text-[#16a34a]"
                      }`}>
                        {full ? "Cupo lleno" : urgent ? `¡Solo ${w.spots} cupos!` : `${w.spots} cupos disponibles`}
                      </span>
                      <button
                        disabled={full}
                        onClick={() => !full && openModal(w)}
                        className={`shrink-0 flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                          full
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#1d4ed8] text-white hover:bg-[#1e40af]"
                        }`}
                      >
                        {full ? "Sin cupos" : <><span>Inscribirse</span><ArrowUpRight className="h-4 w-4" /></>}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedWorkshop && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div className="mb-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#4f46e5]">Botmaker 3.0 - Workshop</p>
                  <h3 className="mt-1 text-xl font-bold text-[#1e1b4b]">Completá tu inscripción</h3>
                  <p className="mt-1 text-xs text-gray-400">Tus datos fueron cargados desde tu perfil.</p>

                  {/* Workshop summary */}
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {selectedWorkshop.day} {selectedWorkshop.month} · {selectedWorkshop.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {selectedWorkshop.city}, {selectedWorkshop.country}
                    </span>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${
                      selectedWorkshop.modality === "Virtual"
                        ? "border-indigo-200 text-[#4f46e5]"
                        : "border-emerald-200 text-emerald-700"
                    }`}>
                      {selectedWorkshop.modality === "Virtual"
                        ? <Video className="h-3 w-3" />
                        : <MapPin className="h-3 w-3" />}
                      {selectedWorkshop.modality}
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Nombre completo *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Empresa</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Opcional"
                      className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
                    />
                  </div>
                  {/* Disclaimer */}
                  <div className="flex gap-2.5 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
                    <span className="mt-0.5 text-base leading-none">⚠️</span>
                    <p className="text-xs leading-relaxed text-amber-800">
                      <span className="font-semibold">Los cupos son limitados.</span> Al confirmar, reservás un lugar que otro participante podría aprovechar. Si no podés asistir, cancelá tu inscripción con al menos 24 hs de anticipación — de lo contrario, se aplicará una penalidad de <span className="font-semibold">u$s 5</span>.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1d4ed8] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e40af]"
                  >
                    Confirmar inscripción <ArrowUpRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            ) : (
              /* Success state */
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle className="h-14 w-14 text-[#16a34a]" />
                <h3 className="mt-4 text-xl font-bold text-[#1e1b4b]">¡Inscripción confirmada!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Te esperamos el <span className="font-semibold">{selectedWorkshop.day} {selectedWorkshop.month}</span> en {selectedWorkshop.city}.<br />
                  Recibirás un email con los detalles.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-6 rounded-lg bg-[#1d4ed8] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1e40af] transition-colors"
                >
                  Listo
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
