"use client"

import { SiteHeader } from "@/components/site-header"
import { ArrowRight, Bot, GitBranch, Users, Bell, Clock, Video, MapPin, Smartphone } from "lucide-react"
import Link from "next/link"

// ─── Action cards ──────────────────────────────────────────────────────────────

const actionCards = [
  {
    icon: Bot,
    title: "Diseñar agentes de IA",
    description: "Creá y configurá agentes inteligentes desde cero.",
    badge: "Agente de IA",
    count: 3,
    color: "bg-violet-50",
    iconColor: "text-violet-500",
  },
  {
    icon: GitBranch,
    title: "Diseñar bots con Flujos",
    description: "Armá conversaciones con el diseñador visual de flujos.",
    tags: ["Creativo", "Métricas", "Callbots"],
    color: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: Users,
    title: "Asistir usuarios",
    description: "Respondé conversaciones y gestioná la atención humana.",
    tags: ["Conversaciones", "Métricas", "Callbots"],
    color: "bg-emerald-50",
    iconColor: "text-emerald-500",
  },
  {
    icon: Bell,
    title: "Enviar notificaciones",
    description: "Lanzá campañas proactivas a tus usuarios.",
    badge: "Notification engine",
    color: "bg-amber-50",
    iconColor: "text-amber-500",
  },
]

// ─── Bots ─────────────────────────────────────────────────────────────────────

const bots = [
  { id: 1, name: "Jouranlo Balla-Kalla",  type: "Agente AI",    dot: "bg-emerald-400", date: "Ago 8, 2024"  },
  { id: 2, name: "Flusama Bella-Kalla",   type: "Dispensaries", dot: "bg-orange-400",  date: "Sep 2, 2024"  },
  { id: 3, name: "Orquesta Bot 1",        type: "Orquestador",  dot: "bg-blue-400",    date: "Oct 14, 2024" },
  { id: 4, name: "Demo BQ2",             type: "Bot",          dot: "bg-violet-400",  date: "Nov 1, 2024"  },
  { id: 5, name: "Montoya Restaurants",  type: "Bot",          dot: "bg-teal-400",    date: "Nov 8, 2024"  },
]

// ─── Agenda ───────────────────────────────────────────────────────────────────

type EventType = "Workshop" | "Session"
type BtnState  = "primary" | "secondary" | "outline" | "disabled"

type AgendaEvent = {
  id: number; type: EventType; day: string; month: string; time: string
  title: string; city?: string; country?: string
  modality: "Presencial" | "Virtual"
  btnLabel: string; btnState: BtnState
}

const agendaEvents: AgendaEvent[] = [
  {
    id: 1, type: "Workshop", day: "19", month: "JUN", time: "10:00 AM",
    title: "Botmaker 3.0", modality: "Presencial", city: "Buenos Aires", country: "Argentina",
    btnLabel: "Inscribirse", btnState: "primary",
  },
  {
    id: 2, type: "Workshop", day: "26", month: "JUN", time: "3:00 PM",
    title: "Botmaker 3.0", modality: "Virtual",
    btnLabel: "Inscribirse", btnState: "primary",
  },
  {
    id: 3, type: "Workshop", day: "03", month: "JUL", time: "11:00 AM",
    title: "Botmaker 3.0", modality: "Presencial", city: "Ciudad de México", country: "México",
    btnLabel: "Sin cupos", btnState: "disabled",
  },
  {
    id: 4, type: "Workshop", day: "10", month: "JUL", time: "4:00 PM",
    title: "Botmaker 3.0", modality: "Presencial", city: "Buenos Aires", country: "Argentina",
    btnLabel: "Inscribirse", btnState: "primary",
  },
  {
    id: 10, type: "Session", day: "15", month: "JUL", time: "10:00 AM",
    title: "Cómo diseñar tu primer agente", modality: "Virtual",
    btnLabel: "Agendar", btnState: "primary",
  },
  {
    id: 11, type: "Session", day: "22", month: "JUL", time: "3:00 PM",
    title: "Conecta canales como WhatsApp e Instagram", modality: "Virtual",
    btnLabel: "Agendar", btnState: "primary",
  },
]

const helpLinks = [
  "Primeros pasos",
  "Crear un agente de IA",
  "Conectar canales",
  "Notificaciones masivas",
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeCPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <SiteHeader />

      <div className="mx-auto max-w-[1400px] px-6 py-10">

        {/* ── Greeting ── */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e1b4b]">Buenos días, Gonzalo.</h1>
          <p className="mt-0.5 text-2xl font-semibold text-[#1e1b4b]">¿Qué quieres hacer hoy?</p>
          <p className="mt-2 max-w-xl text-sm text-gray-400 leading-relaxed">
            Un lugar para diseñar agentes inteligentes, darle una buena experiencia a tus usuarios y siempre estar al tanto de tus campañas.
          </p>
        </div>

        {/* ── Action cards ── */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {actionCards.map((card) => {
            const Icon = card.icon
            return (
              <a key={card.title} href="#"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                {/* Top colored area */}
                <div className={`relative flex h-24 items-center justify-center ${card.color}`}>
                  {card.count && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#4f46e5] text-[10px] font-bold text-white">
                      {card.count}
                    </span>
                  )}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm`}>
                    <Icon className={`h-6 w-6 ${card.iconColor}`} />
                  </div>
                </div>
                {/* Content */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-sm font-semibold text-[#1e1b4b]">{card.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{card.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {card.badge && (
                      <span className="rounded-full bg-[#eef0fe] px-2.5 py-0.5 text-[11px] font-medium text-[#4f46e5]">
                        {card.badge}
                      </span>
                    )}
                    {card.tags?.map(tag => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* ── Two columns ── */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Mis bots */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#1e1b4b]">Mis bots, agentes y orquestadores</h2>
              <a href="#" className="flex items-center gap-1 text-xs text-[#4f46e5] hover:underline">
                Ver más <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            <div className="mt-3 divide-y divide-gray-50">
              {bots.map(bot => (
                <div key={bot.id} className="flex items-center gap-3 py-3">
                  <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${bot.dot}`} />
                  <p className="flex-1 truncate text-sm font-medium text-[#1e1b4b]">{bot.name}</p>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                    {bot.type}
                  </span>
                  <span className="shrink-0 text-xs text-gray-400">{bot.date}</span>
                </div>
              ))}
            </div>

            <a href="#" className="mt-2 flex items-center gap-1 text-xs text-[#4f46e5] hover:underline">
              Ver más <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Agenda de próximos eventos */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#1e1b4b]">Agenda de próximos eventos</h2>
              <Link href="/academy?tab=sessions" className="flex items-center gap-1 text-xs text-[#4f46e5] hover:underline">
                Ver más <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="mt-3 divide-y divide-gray-50">
              {agendaEvents.map(event => (
                <div key={event.id} className="flex items-center gap-3 py-3">
                  {/* Fecha */}
                  <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-xl bg-[#eef0fe]">
                    <span className="text-sm font-bold leading-none text-[#1e1b4b]">{event.day}</span>
                    <span className="mt-0.5 text-[9px] font-semibold tracking-wide text-[#4f46e5]">{event.month}</span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <p className="truncate text-xs font-semibold text-[#1e1b4b]">{event.title}</p>
                      <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                        event.type === "Workshop" ? "bg-violet-50 text-violet-600" : "bg-sky-50 text-sky-600"
                      }`}>
                        {event.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400">
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3" />{event.time}
                      </span>
                      <span className="flex items-center gap-0.5">
                        {event.modality === "Virtual" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        {event.modality}
                      </span>
                      {event.city && <span>{event.city}</span>}
                    </div>
                  </div>

                  {/* CTA */}
                  <button disabled={event.btnState === "disabled"} className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap ${
                    event.btnState === "primary"
                      ? "bg-[#1d4ed8] text-white hover:bg-[#1e40af] transition-colors"
                      : event.btnState === "secondary"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : event.btnState === "disabled"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors"
                  }`}>
                    {event.btnLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom ── */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Ayuda */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-[#1e1b4b]">Ayuda</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {helpLinks.map(link => (
                <li key={link}>
                  <a href="#" className="flex items-center gap-1.5 text-sm text-[#4f46e5] hover:underline">
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />{link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Botmaker App */}
          <div className="col-span-2 flex items-center gap-6 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#eef0fe]">
              <Smartphone className="h-8 w-8 text-[#4f46e5]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#1e1b4b]">Botmaker App</h2>
              <p className="mt-1 max-w-md text-sm text-gray-400 leading-relaxed">
                Accedé a Botmaker desde tu celular. Gestioná conversaciones, revisá métricas y respondé a tus usuarios desde cualquier lugar.
              </p>
              <div className="mt-3 flex gap-2">
                <a href="#" className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  App Store
                </a>
                <a href="#" className="rounded-lg border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  Google Play
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
