"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"
import {
  ArrowLeftRight, Bot, MessageSquare, Megaphone,
  Zap, Mail, Phone, MessageCircle, Ticket, Users,
  ChevronDown, Clock, Globe, DollarSign, Star, Network,
  Calendar, CalendarPlus,
} from "lucide-react"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Buenos días"
  if (h < 18) return "Buenas tardes"
  return "Buenas noches"
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const quickActions = [
  {
    id: 1,
    Icon: ArrowLeftRight,
    badge: "NUEVO",
    title: "Diseñar agentes de IA",
    description: "Crea, modifica y administra agentes y orquestadores",
    cta: "Agente de IA",
    tags: [
      { label: "Chatbots",  Icon: MessageSquare },
      { label: "Mailbots",  Icon: Mail },
      { label: "Callbots",  Icon: Phone },
    ],
  },
  {
    id: 2,
    Icon: Bot,
    title: "Diseñar bots con flujos",
    description: "Diseña bots basados en flujos y herramientas generativas.",
    cta: "Bot Designer",
    tags: [
      { label: "Chatbots",  Icon: MessageSquare },
      { label: "Mailbots",  Icon: Mail },
      { label: "Callbots",  Icon: Phone },
    ],
  },
  {
    id: 3,
    Icon: MessageSquare,
    title: "Atender usuarios",
    description: "Responde y gestiona conversaciones en tiempo real.",
    cta: "Conversaciones",
    tags: [
      { label: "Conversaciones", Icon: MessageCircle },
      { label: "Tickets",        Icon: Ticket },
    ],
  },
  {
    id: 4,
    Icon: Megaphone,
    title: "Enviar notificaciones",
    description: "Gestiona campañas y notificaciones masivas.",
    cta: "Notification engine",
    tags: [
      { label: "Notification engine", Icon: Megaphone },
    ],
  },
]

const allBots = [
  { id: 1, name: "Asistente Bella Italia", type: "Agente IA",     time: "hace 2 h",   Icon: Star,    color: "text-[#4f46e5]", bg: "bg-[#eef0fe]" },
  { id: 2, name: "Pizzeria Bella Italia",  type: "Orquestador",   time: "hace 4 h",   Icon: Network, color: "text-[#7c3aed]", bg: "bg-[#f3f0ff]" },
  { id: 3, name: "Soporte Nivel 1",        type: "Agente IA",     time: "ayer",        Icon: Star,    color: "text-[#4f46e5]", bg: "bg-[#eef0fe]" },
  { id: 4, name: "Demo BAX",               type: "Bot",           time: "24/06/2024",  Icon: Bot,     color: "text-[#0891b2]", bg: "bg-[#e0f7fa]" },
  { id: 5, name: "Reservas Restaurante",   type: "Bot",           time: "hace 5 d",   Icon: Bot,     color: "text-[#0891b2]", bg: "bg-[#e0f7fa]" },
]

type AgendaState = "live" | "registered" | "upcoming"

const agendaItems: { id: number; day: string; month: string; title: string; time: string; language: string; state: AgendaState }[] = [
  { id: 1, day: "15", month: "JUL", title: "Cómo diseñar tu primer agente",                    time: "ahora",        language: "Español", state: "live"       },
  { id: 2, day: "22", month: "JUL", title: "Conecta canales como WhatsApp, Instagram y otros", time: "10:00 AM",     language: "Español", state: "registered" },
  { id: 3, day: "05", month: "AGO", title: "Automatización avanzada con IA",                   time: "11:00 AM",     language: "Español", state: "upcoming"   },
]

const ayudaLinks = [
  { label: "Primeros pasos",          href: "#" },
  { label: "Centro de ayuda",         href: "#" },
  { label: "Monitor de servicios",    href: "#" },
  { label: "Webinar de Bot Designer", href: "#" },
  { label: "Lanzamiento de Mailbots", href: "#" },
  { label: "Botmaker Academy",        href: "/academy" },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeCPage() {
  const [showAll, setShowAll] = useState(false)
  const visibleBots = showAll ? allBots : allBots.slice(0, 5)

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <SiteHeader />

      <div className="mx-auto max-w-[1200px] px-6 py-10">

        {/* ── Greeting ── */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#1a1a2e]">{getGreeting()}, Florencia.</h1>
          <p className="mt-0.5 text-xl font-bold text-[#4f46e5]">¿Qué quieres hacer hoy?</p>
          <p className="mt-2 text-sm text-gray-500">
            Un lugar para diseñar agentes inteligentes, bots con flujos, atender chats en vivo y enviar campañas masivas.
          </p>
        </div>

        {/* ── Quick Actions ── */}
        <div className="overflow-hidden rounded-2xl border border-[#dde0f7] bg-[#eef0fe]">
          <div className="grid grid-cols-4 divide-x divide-[#dde0f7]">
            {quickActions.map(action => (
              <div key={action.id} className="flex flex-col px-6 py-6">

                {/* Icon + badge */}
                <div className="relative mb-4 self-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dde0f7]">
                    <action.Icon className="h-5 w-5 text-[#4f46e5]" />
                  </div>
                  {action.badge && (
                    <span className="absolute -right-3 -top-1 rounded-full bg-[#4f46e5] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                      {action.badge}
                    </span>
                  )}
                </div>

                {/* Text */}
                <p className="text-sm font-bold text-[#1a1a2e]">{action.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-gray-500">{action.description}</p>

                {/* CTA */}
                <a href="#" className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#4f46e5] hover:underline transition-colors">
                  <span>→</span> {action.cta}
                </a>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[#dde0f7] pt-4">
                  {action.tags.map(tag => (
                    <a key={tag.label} href="#" className="flex items-center gap-1 text-[11px] text-[#4f46e5] hover:underline">
                      <tag.Icon className="h-3 w-3" />
                      {tag.label}
                    </a>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ── Main two columns ── */}
        <div className="mt-10 grid grid-cols-2 gap-8">

          {/* LEFT: Mis bots */}
          <div>
            <h2 className="mb-4 text-base font-bold text-[#1a1a2e]">Mis bots, agentes y orquestadores</h2>

            <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
              {visibleBots.map(bot => (
                <div key={bot.id} className="flex items-center gap-3 px-4 py-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bot.bg}`}>
                    <bot.Icon className={`h-3.5 w-3.5 ${bot.color}`} />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-[#1a1a2e]">{bot.name}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                    {bot.type}
                  </span>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">{bot.time}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAll(v => !v)}
              className="mt-3 flex items-center gap-1 text-sm font-medium text-[#4f46e5] hover:underline"
            >
              Ver más
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
            </button>

            {/* Canales */}
            <div className="mt-8">
              <h2 className="mb-3 text-base font-bold text-[#1a1a2e]">Canales</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c7d2fe] bg-[#eef0fe] px-3 py-1 text-xs font-semibold text-[#4f46e5]">
                Conectados
              </span>
            </div>
          </div>

          {/* RIGHT: Agenda */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-[#1a1a2e]">Agenda de próximos entrenamientos</h2>
              <Link href="/academy?tab=sessions" className="text-xs font-semibold text-[#4f46e5] hover:underline">
                Ver todas
              </Link>
            </div>

            <div className="space-y-3">
              {agendaItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-4 py-3">

                  {/* Date box */}
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#eef0fe]">
                    <span className="text-lg font-bold leading-none text-[#1e1b4b]">{item.day}</span>
                    <span className="mt-0.5 text-[10px] font-bold tracking-wider text-[#4f46e5]">{item.month}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1a1a2e] leading-snug line-clamp-1">{item.title}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 text-[11px] text-gray-400">
                      {item.state === "live" ? (
                        <span className="font-semibold text-[#16a34a]">● ahora</span>
                      ) : (
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{item.time}</span>
                      )}
                      <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{item.language}</span>
                      <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />Sin costo</span>
                    </div>
                  </div>

                  {/* Action */}
                  {item.state === "live" && (
                    <button className="shrink-0 rounded-full bg-[#1d4ed8] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#1e40af] transition-colors whitespace-nowrap">
                      Ingresar ahora
                    </button>
                  )}
                  {item.state === "registered" && (
                    <button className="shrink-0 rounded-full border border-[#4f46e5] px-4 py-1.5 text-xs font-semibold text-[#4f46e5] hover:bg-[#eef0fe] transition-colors whitespace-nowrap">
                      Reenviar invitación
                    </button>
                  )}
                  {item.state === "upcoming" && (
                    <button className="shrink-0 flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
                      <CalendarPlus className="h-3.5 w-3.5" />
                      Agregar a calendario
                    </button>
                  )}

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Bottom two columns ── */}
        <div className="mt-10 grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">

          {/* Ayuda */}
          <div>
            <h2 className="mb-4 text-base font-bold text-[#1a1a2e]">Ayuda</h2>
            <div className="space-y-3">
              {ayudaLinks.map(link => (
                <div key={link.label}>
                  <Link href={link.href} className="text-sm font-medium text-[#4f46e5] hover:underline">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Botmaker App */}
          <div>
            <h2 className="mb-4 text-base font-bold text-[#1a1a2e]">Botmaker App</h2>
            <p className="text-sm leading-relaxed text-gray-500">
              Accede y responde a las conversaciones con tus agentes desde tu smartphone.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.33.18.7.24 1.06.18l11.9-11.9-2.37-2.37L3.18 23.76zm15.23-12.83L15.8 9.3 3.96.48C3.56.24 3.08.18 2.64.36L14.04 11.76l4.37-.83zM21.4 10.3c-.4-.22-.85-.33-1.3-.33-.45 0-.9.11-1.3.33l-2.1 1.2 2.37 2.37 2.1-1.2c.8-.46.8-1.64.23-2.37zM4.24.06C3.88 0 3.52.06 3.18.24L14.04 11.1l2.37-2.37L4.24.06z"/>
                </svg>
                Google Play
              </a>
              <a href="#" className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
