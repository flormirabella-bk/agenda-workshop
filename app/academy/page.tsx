"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { Search, Clock, MapPin, Video, Globe, X, CheckCircle, Play, Calendar, DollarSign, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "cursos" | "partners" | "sessions"
type Modality = "Virtual" | "Presencial"

const MONTH_NUM: Record<string, string> = { JUN: "6", JUL: "7", AGO: "8" }
const MONTH_IDX: Record<string, number> = { JUN: 5,   JUL: 6,   AGO: 7   }

function formatEventDate(day: string, month: string, time: string): string {
  const date = new Date(2026, MONTH_IDX[month], parseInt(day))
  const dayName = date.toLocaleDateString("es-AR", { weekday: "long" })
  const cap = dayName.charAt(0).toUpperCase() + dayName.slice(1)
  return `${cap} ${day}/${MONTH_NUM[month]} ${time}`
}

// ─── Course data ──────────────────────────────────────────────────────────────

const courses = [
  { id: 1, category: "Agent developer",      title: "Primeros pasos como Agent Developer",  description: "Diseñá agentes desde cero y dominá los fundamentos de la plataforma." },
  { id: 2, category: "Agent developer",      title: "Construyendo agentes de email",         description: "Desde cero hasta experto en automatización de correo electrónico." },
  { id: 3, category: "Agent developer",      title: "Agent developer expert",                description: "Estrategias avanzadas para Agentes Developers que ya dominan Botmaker." },
  { id: 4, category: "Agentes de atención",  title: "Atención al cliente con IA",            description: "Creá flujos de atención efectivos con inteligencia artificial." },
  { id: 5, category: "Agentes de atención",  title: "Escalado y supervisión",                description: "Aprendé a gestionar escalados y supervisar conversaciones en tiempo real." },
  { id: 6, category: "IT developers",        title: "Integraciones y APIs",                  description: "Conectá Botmaker con tus sistemas mediante APIs y webhooks." },
  { id: 7, category: "IT developers",        title: "Configuración avanzada",                description: "Ajustes de infraestructura y configuraciones técnicas para IT." },
  { id: 8, category: "Notifications Engine", title: "Campañas proactivas",                   description: "Diseñá y lanzá campañas de notificaciones masivas efectivas." },
  { id: 9, category: "Notifications Engine", title: "Automatización de mensajes",            description: "Configurá disparadores automáticos y flujos de notificación." },
]

const courseCategories = ["Todos", "Agent developer", "Agentes de atención", "IT developers", "Notifications Engine"]

// ─── Workshop data ─────────────────────────────────────────────────────────────

type Workshop = {
  id: number; day: string; month: string; time: string
  city: string; country: string; modality: Modality
  spots: number; totalSpots: number; language: string; free: boolean
}

const WORKSHOP_DESCRIPTION = "Conocé las novedades de Botmaker 3.0 en un taller interactivo en vivo con nuestro equipo de expertos."

const workshops: Workshop[] = [
  { id: 1,  day: "19", month: "JUN", time: "10:00 AM", city: "Buenos Aires",     country: "Argentina", modality: "Presencial", spots: 8,  totalSpots: 12, language: "Español", free: true },
  { id: 2,  day: "19", month: "JUN", time: "10:00 AM", city: "Buenos Aires",     country: "Argentina", modality: "Virtual",    spots: 4,  totalSpots: 12, language: "Español", free: true },
  { id: 3,  day: "26", month: "JUN", time: "3:00 PM",  city: "Bogotá",           country: "Colombia",  modality: "Presencial", spots: 2,  totalSpots: 12, language: "Español", free: true },
  { id: 4,  day: "26", month: "JUN", time: "3:00 PM",  city: "Bogotá",           country: "Colombia",  modality: "Virtual",    spots: 6,  totalSpots: 12, language: "Español", free: true },
  { id: 13, day: "26", month: "JUN", time: "6:00 PM",  city: "Bogotá",           country: "Colombia",  modality: "Presencial", spots: 0,  totalSpots: 12, language: "Español", free: true },
  { id: 14, day: "26", month: "JUN", time: "6:00 PM",  city: "Bogotá",           country: "Colombia",  modality: "Virtual",    spots: 11, totalSpots: 12, language: "Español", free: true },
  { id: 5,  day: "03", month: "JUL", time: "11:00 AM", city: "Ciudad de México", country: "México",    modality: "Presencial", spots: 0,  totalSpots: 12, language: "Español", free: true },
  { id: 6,  day: "03", month: "JUL", time: "11:00 AM", city: "Ciudad de México", country: "México",    modality: "Virtual",    spots: 9,  totalSpots: 12, language: "Español", free: true },
  { id: 7,  day: "10", month: "JUL", time: "4:00 PM",  city: "Buenos Aires",     country: "Argentina", modality: "Presencial", spots: 3,  totalSpots: 12, language: "Español", free: true },
  { id: 8,  day: "10", month: "JUL", time: "4:00 PM",  city: "Buenos Aires",     country: "Argentina", modality: "Virtual",    spots: 7,  totalSpots: 12, language: "Español", free: true },
  { id: 9,  day: "17", month: "JUL", time: "10:00 AM", city: "Bogotá",           country: "Colombia",  modality: "Presencial", spots: 10, totalSpots: 12, language: "Español", free: true },
  { id: 10, day: "17", month: "JUL", time: "10:00 AM", city: "Bogotá",           country: "Colombia",  modality: "Virtual",    spots: 5,  totalSpots: 12, language: "Español", free: true },
  { id: 11, day: "24", month: "JUL", time: "3:00 PM",  city: "Ciudad de México", country: "México",    modality: "Presencial", spots: 6,  totalSpots: 12, language: "Español", free: true },
  { id: 12, day: "24", month: "JUL", time: "3:00 PM",  city: "Ciudad de México", country: "México",    modality: "Virtual",    spots: 8,  totalSpots: 12, language: "Español", free: true },
]

// ─── Botmaker Sessions data ────────────────────────────────────────────────────

type BotmakerSession = {
  id: number; day: string; month: string; time: string
  title: string; description: string; language: string; free: boolean
}

const upcomingSessions: BotmakerSession[] = [
  { id: 1, day: "15", month: "JUL", time: "10:00 AM", title: "Cómo diseñar tu primer agente",                    description: "Conocé los aspectos básicos de la configuración inicial de un chatbot y cómo potenciar tus conversaciones.",              language: "Español", free: true },
  { id: 2, day: "22", month: "JUL", time: "3:00 PM",  title: "Conecta canales como WhatsApp, Instagram y otros", description: "Aprendé a conectar los principales canales de comunicación y usá agentes multicanales para potenciar tus conversaciones.", language: "Español", free: true },
  { id: 3, day: "05", month: "AGO", time: "11:00 AM", title: "Automatización avanzada con IA",                   description: "Estrategias avanzadas para automatizar flujos de conversación con inteligencia artificial en Botmaker.",                  language: "Español", free: true },
]

// ─── Past videos data ──────────────────────────────────────────────────────────

type PastVideo = { id: number; title: string; duration: string; date: string }

const pastVideos: PastVideo[] = [
  { id: 1, title: "Cómo diseñar tu primer agente",                              duration: "60 mins", date: "25/3/2026" },
  { id: 2, title: "Conecta canales como WhatsApp, Instagram, Facebook y otros", duration: "50 mins", date: "4/3/2026"  },
  { id: 3, title: "Primeros pasos con el Notifications Engine",                 duration: "45 mins", date: "18/2/2026" },
  { id: 4, title: "Integraciones y APIs: conectá tus sistemas",                 duration: "55 mins", date: "5/2/2026"  },
]

// ─── Tabs ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "cursos",   label: "Cursos" },
  { id: "partners", label: "Partners" },
  { id: "sessions", label: "Training" },
] as const

// ─── Academy content ──────────────────────────────────────────────────────────

function AcademyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>((searchParams.get("tab") as Tab) || "cursos")
  const [courseSearch, setCourseSearch] = useState("")
  const [courseFilter, setCourseFilter] = useState("Todos")
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [registeredIds, setRegisteredIds] = useState<Set<number>>(new Set())
  const [cancelTarget, setCancelTarget] = useState<Workshop | null>(null)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const [selectedSession, setSelectedSession] = useState<BotmakerSession | null>(null)
  const [registeredSessionIds, setRegisteredSessionIds] = useState<Set<number>>(new Set())

  useEffect(() => {
    const tab = searchParams.get("tab") as Tab
    if (tab) setActiveTab(tab)
  }, [searchParams])

  function switchTab(tab: Tab) {
    setActiveTab(tab)
    router.replace(`/academy?tab=${tab}`, { scroll: false })
  }

  function openModal(w: Workshop) { setSelectedWorkshop(w); setSubmitted(false) }
  function closeModal() { setSelectedWorkshop(null); setSubmitted(false) }

  function confirmRegistration() {
    if (!selectedWorkshop) return
    setRegisteredIds(prev => new Set([...prev, selectedWorkshop.id]))
    setSubmitted(true)
  }

  function confirmSession() {
    if (!selectedSession) return
    setRegisteredSessionIds(prev => new Set([...prev, selectedSession.id]))
    setSelectedSession(null)
  }

  function confirmCancel() {
    if (!cancelTarget) return
    setRegisteredIds(prev => { const next = new Set(prev); next.delete(cancelTarget.id); return next })
    setCancelTarget(null)
  }

  function isWithin24h(w: Workshop): boolean {
    const eventDate = new Date(2026, MONTH_IDX[w.month], parseInt(w.day))
    const diffMs = eventDate.getTime() - Date.now()
    return diffMs >= 0 && diffMs <= 24 * 60 * 60 * 1000
  }

  const filteredWorkshops = workshops.filter(w => [1, 4, 5, 7].includes(w.id))

  const filteredCourses = courses.filter(c => {
    const matchesCategory = courseFilter === "Todos" || c.category === courseFilter
    const matchesSearch = courseSearch === "" || c.title.toLowerCase().includes(courseSearch.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedCourses = courseCategories.slice(1).reduce((acc, cat) => {
    const items = filteredCourses.filter(c => c.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {} as Record<string, typeof courses>)

  return (
    <main className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-x-0 top-0 h-[200px] overflow-hidden bg-[#7b82f0]">
          <div className="absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-white/5" />
          <div className="absolute right-40 -top-20 h-[300px] w-[300px] rounded-full bg-white/5" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 pt-12 pb-0">
          <h1 className="text-4xl font-semibold text-white">Botmaker Academy</h1>
          <div className="mt-8 flex gap-1">
            {TABS.map((tab) => (
              <button key={tab.id} onClick={() => switchTab(tab.id as Tab)}
                className={`rounded-t-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-white text-[#1e1b4b]" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="relative bg-white border-t border-gray-100">
        <div className="mx-auto max-w-[1400px] px-6 py-8">

          {/* ── Cursos ── */}
          {activeTab === "cursos" && (
            <div>
              <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-[#1e1b4b]">Impulsa tu carrera con nuestros cursos 🚀</h2>
                <p className="mt-1 text-sm text-gray-500">Aprendé a tu ritmo con contenidos 100% gratuitos pensados para que domines el uso de Botmaker.</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={courseSearch} onChange={e => setCourseSearch(e.target.value)}
                      placeholder="Busca lo que deseas aprender..."
                      className="h-9 rounded-lg border border-gray-200 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseCategories.map(cat => (
                      <button key={cat} onClick={() => setCourseFilter(cat)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${courseFilter === cat ? "bg-[#4f46e5] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-8">
                {Object.entries(groupedCourses).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="mb-4 text-lg font-bold text-[#1e1b4b]">{category}</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map(course => (
                        <div key={course.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                          <div className="flex h-32 items-center justify-center bg-[#4f46e5] px-6">
                            <p className="text-center text-base font-semibold text-white">{course.title}</p>
                          </div>
                          <div className="p-4">
                            <span className="rounded-full bg-[#eef0fe] px-2.5 py-0.5 text-xs font-medium text-[#4f46e5]">{course.category}</span>
                            <p className="mt-2 text-sm text-gray-500">{course.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Partners ── */}
          {activeTab === "partners" && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-2xl font-bold text-[#1e1b4b]">Partners</p>
              <p className="mt-2 text-gray-400">Contenido de partners próximamente.</p>
            </div>
          )}

          {/* ── Training ── */}
          {activeTab === "sessions" && (
            <div>

              <div>

                {/* Banner mis inscripciones */}
                {registeredIds.size > 0 && (
                  <div className="mb-8 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
                    <div className="flex items-center gap-2.5 border-b border-emerald-100 bg-emerald-50 px-5 py-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                      <p className="text-sm font-semibold text-emerald-800">
                        {registeredIds.size === 1 ? "Tenés 1 inscripción próxima" : `Tenés ${registeredIds.size} inscripciones próximas`}
                      </p>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {workshops.filter(w => registeredIds.has(w.id)).map(w => (
                        <div key={w.id} className="flex items-center justify-between gap-4 px-5 py-3.5">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                            <span className="font-semibold text-[#1e1b4b]">Botmaker 3.0</span>
                            <span className="text-gray-300">·</span>
                            <span className="text-xs text-gray-500">{w.day} {w.month} · {w.time}</span>
                            <span className="text-gray-300">·</span>
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${
                              w.modality === "Virtual" ? "border-indigo-200 bg-indigo-50 text-[#4f46e5]" : "border-emerald-200 bg-emerald-50 text-emerald-700"
                            }`}>
                              {w.modality === "Virtual" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                              {w.modality}
                            </span>
                            {w.modality === "Presencial" && (
                              <span className="text-xs text-gray-500">{w.city}, {w.country}</span>
                            )}
                          </div>
                          <button onClick={() => setCancelTarget(w)}
                            className="shrink-0 rounded-full border border-red-200 bg-white px-4 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50">
                            Cancelar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Próximos Workshops ── */}
                <div>
                  <h2 className="mb-5 text-xl font-bold text-[#1e1b4b]">Próximos Workshops</h2>

                  {filteredWorkshops.length === 0 ? (
                    <p className="py-8 text-center text-sm text-gray-400">No hay workshops para este período.</p>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {filteredWorkshops.map(w => {
                        const full = w.spots === 0
                        const urgent = w.spots > 0 && w.spots <= 2
                        const registered = registeredIds.has(w.id)
                        const ModalityIcon = w.modality === "Virtual" ? Video : MapPin
                        return (
                          <div key={w.id} className={`flex items-center gap-6 py-6 ${full ? "opacity-60" : ""}`}>
                            {/* Fecha */}
                            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#eef0fe]">
                              <span className="text-2xl font-bold leading-none text-[#1e1b4b]">{w.day}</span>
                              <span className="mt-1 text-xs font-semibold tracking-wider text-[#4f46e5]">{w.month}</span>
                            </div>
                            {/* Info */}
                            <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-[15px] font-semibold text-[#1e1b4b]">Botmaker 3.0</p>
                                <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${
                                  full ? "border-gray-200 bg-gray-100 text-gray-400"
                                  : w.modality === "Virtual" ? "border-indigo-200 bg-indigo-50 text-[#4f46e5]"
                                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                }`}>
                                  <ModalityIcon className="h-3 w-3" />{w.modality}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 line-clamp-1">{WORKSHOP_DESCRIPTION}</p>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatEventDate(w.day, w.month, w.time)}</span>
                                {w.modality === "Presencial" && (
                                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{w.city}, {w.country}</span>
                                )}
                                <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{w.language}</span>
                                <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />Sin costo</span>
                              </div>
                              {urgent && <p className="text-xs font-semibold text-[#e11d48]">¡Solo {w.spots} cupos disponibles!</p>}
                            </div>
                            {/* CTA */}
                            {registered ? (
                              <div className="shrink-0 flex flex-col items-end gap-1.5">
                                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                                  Inscripto ✓
                                </span>
                                <button onClick={() => openModal(w)} className="rounded-full border border-[#4f46e5] px-6 py-2 text-sm font-semibold text-[#4f46e5] hover:bg-[#eef0fe] transition-colors whitespace-nowrap">
                                  Reenviar invitación
                                </button>
                              </div>
                            ) : (
                              <button disabled={full} onClick={() => !full && openModal(w)}
                                className={`shrink-0 rounded-full px-6 py-2 text-sm font-semibold transition-colors whitespace-nowrap ${
                                  full ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#1d4ed8] text-white hover:bg-[#1e40af]"
                                }`}>
                                {full ? "Sin cupos" : "Inscribirse"}
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* ── Próximas Sessions ── */}
                <div className="mt-12">
                  <h2 className="mb-5 text-xl font-bold text-[#1e1b4b]">Próximas Sessions</h2>
                  <div className="divide-y divide-gray-100">
                    {upcomingSessions.map(s => (
                      <div key={s.id} className="flex items-center gap-6 py-6">
                        {/* Fecha */}
                        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#eef0fe]">
                          <span className="text-2xl font-bold leading-none text-[#1e1b4b]">{s.day}</span>
                          <span className="mt-1 text-xs font-semibold tracking-wider text-[#4f46e5]">{s.month}</span>
                        </div>
                        {/* Info */}
                        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[15px] font-semibold text-[#1e1b4b]">{s.title}</p>
                            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs font-medium text-[#4f46e5]">
                              <Video className="h-3 w-3" />Virtual
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-1">{s.description}</p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatEventDate(s.day, s.month, s.time)}</span>
                            <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{s.language}</span>
                            <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" />Sin costo</span>
                          </div>
                        </div>
                        {/* CTA */}
                        {registeredSessionIds.has(s.id) ? (
                          <div className="shrink-0 flex flex-col items-end gap-1.5">
                            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                              Inscripto ✓
                            </span>
                            <button onClick={() => setSelectedSession(s)} className="rounded-full border border-[#4f46e5] px-6 py-2 text-sm font-semibold text-[#4f46e5] hover:bg-[#eef0fe] transition-colors whitespace-nowrap">
                              Reenviar invitación
                            </button>
                          </div>
                        ) : (
                          <div className="flex shrink-0 items-center gap-3">
                            <button className="text-sm font-medium text-[#4f46e5] hover:underline whitespace-nowrap">
                              Ver más información
                            </button>
                            <button onClick={() => setSelectedSession(s)} className="rounded-full bg-[#1d4ed8] px-6 py-2 text-sm font-semibold text-white hover:bg-[#1e40af] transition-colors whitespace-nowrap">
                              Agendar Webinar
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── Sesiones anteriores (carousel) ── */}
              <div className="mt-12 border-t border-gray-100 pt-10">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1e1b4b]">Sesiones anteriores</h2>
                    <p className="mt-0.5 text-sm text-gray-400">Sesiones grabadas disponibles cuando quieras.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCarouselIdx(i => Math.max(0, i - 1))}
                      disabled={carouselIdx === 0}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setCarouselIdx(i => Math.min(pastVideos.length - 3, i + 1))}
                      disabled={carouselIdx >= pastVideos.length - 3}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="overflow-hidden">
                  <div
                    className="flex gap-5 transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(calc(${-carouselIdx} * (100% + 20px) / 3))` }}
                  >
                    {pastVideos.map(v => (
                      <div
                        key={v.id}
                        className="flex-none overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                        style={{ width: "calc((100% - 40px) / 3)" }}
                      >
                        <div className="flex h-40 items-center justify-center bg-[#eef0fe]">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4f46e5]">
                            <Play className="h-5 w-5 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold text-[#1e1b4b] leading-snug line-clamp-2">{v.title}</p>
                          <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{v.duration}</span>
                            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{v.date}</span>
                          </div>
                          <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#4f46e5] py-2 text-xs font-semibold text-[#4f46e5] hover:bg-[#eef0fe] transition-colors">
                            <Play className="h-3 w-3" fill="currentColor" />Reproducir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ── Modal inscripción ── */}
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={closeModal}>
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl" onClick={e => e.stopPropagation()}>

            {!submitted ? (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef0fe]">
                    <GraduationCap className="h-5 w-5 text-[#4f46e5]" />
                  </div>
                  <p className="flex-1 text-sm font-semibold text-[#1e1b4b]">Próximo entrenamiento</p>
                  <button onClick={closeModal} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <h3 className="text-xl font-bold text-[#1e1b4b]">Botmaker 3.0</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-semibold text-[#1e1b4b]">{selectedWorkshop.day} {selectedWorkshop.month}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selectedWorkshop.time}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium ${
                      selectedWorkshop.modality === "Virtual" ? "border-indigo-200 bg-indigo-50 text-[#4f46e5]" : "border-emerald-200 bg-emerald-50 text-emerald-700"
                    }`}>
                      {selectedWorkshop.modality === "Virtual" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                      {selectedWorkshop.modality}
                    </span>
                    {selectedWorkshop.modality === "Presencial" && (
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{selectedWorkshop.city}, {selectedWorkshop.country}</span>
                    )}
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Duración 120'</span>
                    <span className="font-medium text-[#16a34a]">Sin costo</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-gray-500">{WORKSHOP_DESCRIPTION}</p>
                  <button className="mt-3 text-sm text-gray-400 hover:text-[#4f46e5] transition-colors">
                    ¿Tenés dudas? Ver preguntas frecuentes →
                  </button>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 border-t border-gray-100 px-6 py-4">
                  <button onClick={closeModal} className="text-sm font-medium text-gray-500 hover:text-[#1e1b4b] transition-colors">
                    Cancelar
                  </button>
                  <button onClick={confirmRegistration} className="rounded-full bg-[#1d4ed8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1e40af] transition-colors">
                    Confirmar inscripción
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <CheckCircle className="h-14 w-14 text-[#16a34a]" />
                <h3 className="mt-4 text-xl font-bold text-[#1e1b4b]">¡Inscripción confirmada!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Te esperamos el <span className="font-semibold">{selectedWorkshop.day} {selectedWorkshop.month}</span>
                  {selectedWorkshop.modality === "Presencial" && <> en {selectedWorkshop.city}</>}.<br />
                  Recibirás un email con los detalles.
                </p>
                <button onClick={closeModal} className="mt-6 rounded-xl bg-[#1d4ed8] px-8 py-3 text-sm font-semibold text-white hover:bg-[#1e40af]">Listo</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Modal session ── */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={() => setSelectedSession(null)}>
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-6 py-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef0fe]">
                <Video className="h-5 w-5 text-[#4f46e5]" />
              </div>
              <p className="flex-1 text-sm font-semibold text-[#1e1b4b]">Próxima Session</p>
              <button onClick={() => setSelectedSession(null)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <h3 className="text-xl font-bold text-[#1e1b4b]">{selectedSession.title}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
                <span className="flex items-center gap-1 font-semibold text-[#1e1b4b]">{selectedSession.day} {selectedSession.month}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selectedSession.time}</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 font-medium text-[#4f46e5]">
                  <Video className="h-3 w-3" />Virtual
                </span>
                <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" />{selectedSession.language}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />Duración 60'</span>
                <span className="font-medium text-[#16a34a]">Sin costo</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">{selectedSession.description}</p>
              <button className="mt-3 text-sm text-gray-400 hover:text-[#4f46e5] transition-colors">
                ¿Tenés dudas? Ver preguntas frecuentes →
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-4 border-t border-gray-100 px-6 py-4">
              <button onClick={() => setSelectedSession(null)} className="text-sm font-medium text-gray-500 hover:text-[#1e1b4b] transition-colors">
                Cancelar
              </button>
              <button onClick={confirmSession} className="rounded-full bg-[#1d4ed8] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1e40af] transition-colors">
                Confirmar inscripción
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal cancelación ── */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" onClick={() => setCancelTarget(null)}>
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setCancelTarget(null)} className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition-colors">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold text-[#1e1b4b]">¿Cancelar inscripción?</h3>
            <p className="mt-1 text-xs text-gray-400">Revisá los detalles antes de confirmar.</p>
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              <p className="font-semibold text-[#1e1b4b]">{cancelTarget.day} {cancelTarget.month} · {cancelTarget.time}</p>
              <p className="mt-0.5">
                {cancelTarget.modality}{cancelTarget.modality === "Presencial" && ` · ${cancelTarget.city}, ${cancelTarget.country}`}
              </p>
            </div>
            {isWithin24h(cancelTarget) ? (
              <div className="mt-4 flex gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <span className="mt-0.5 text-base leading-none">⚠️</span>
                <p className="text-xs leading-relaxed text-red-700">
                  <span className="font-semibold">Cancelación tardía.</span> El evento es en menos de 24 hs. Se aplicará una penalidad de <span className="font-semibold">u$s 5</span>.
                </p>
              </div>
            ) : (
              <p className="mt-4 text-xs leading-relaxed text-gray-500">Tu cupo quedará disponible para otros participantes.</p>
            )}
            <div className="mt-5 flex flex-col gap-2">
              <button onClick={() => setCancelTarget(null)} className="w-full rounded-full bg-[#1d4ed8] py-2.5 text-sm font-semibold text-white hover:bg-[#1e40af] transition-colors">
                Volver
              </button>
              <button onClick={confirmCancel} className={`w-full rounded-full border py-2.5 text-sm font-semibold transition-colors ${
                isWithin24h(cancelTarget) ? "border-red-200 text-red-600 hover:bg-red-50" : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}>
                Sí, cancelar inscripción
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default function AcademyPage() {
  return (
    <Suspense>
      <AcademyContent />
    </Suspense>
  )
}
