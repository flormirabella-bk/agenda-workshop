"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"
import {
  ArrowLeftRight, Bot, MessageSquare, Megaphone,
  Zap, Mail, Phone, MessageCircle, Ticket, Users,
  ChevronDown,
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
    cta: "Ir a Agentes de IA",
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
    cta: "Ir a Bot Designer",
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
    cta: "Ir a Atención",
    tags: [
      { label: "Chats",      Icon: MessageCircle },
      { label: "Tickets",    Icon: Ticket },
      { label: "Contactos",  Icon: Users },
    ],
  },
  {
    id: 4,
    Icon: Megaphone,
    title: "Enviar notificaciones",
    description: "Gestiona campañas y notificaciones masivas.",
    cta: "Ir a Notificaciones",
    tags: [
      { label: "Notifications engine", Icon: Megaphone },
    ],
  },
]

const allBots = [
  { id: 1, name: "Bot Reco",           date: "09/06/2026", type: "chat" },
  { id: 2, name: "Luis mailbot test",  date: "18/05/2026", type: "mail" },
  { id: 3, name: "Luis test 2",        date: "15/05/2026", type: "chat" },
  { id: 4, name: "Agente soporte",     date: "10/05/2026", type: "chat" },
  { id: 5, name: "Bot ventas MX",      date: "02/05/2026", type: "chat" },
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
  const visibleBots = showAll ? allBots : allBots.slice(0, 3)

  return (
    <main className="min-h-screen bg-[#f5f7fb]">
      <SiteHeader />

      <div className="mx-auto max-w-[1200px] px-6 py-10">

        {/* ── Greeting ── */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-[#1a1a2e]">{getGreeting()}, Florencia</h1>
          <p className="mt-0.5 text-lg font-semibold text-[#4f46e5]">¿Qué deseas hacer hoy?</p>
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
                <a href="#" className="mt-3 text-xs font-semibold text-[#4f46e5] underline underline-offset-2 hover:text-[#3730a3] transition-colors">
                  {action.cta}
                </a>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[#dde0f7] pt-4">
                  {action.tags.map(tag => (
                    <span key={tag.label} className="flex items-center gap-1 text-[11px] text-gray-500">
                      <tag.Icon className="h-3 w-3 text-[#4f46e5]" />
                      {tag.label}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* ── Three columns ── */}
        <div className="mt-10 grid grid-cols-3 gap-10">

          {/* Mis bots */}
          <div>
            <h2 className="mb-4 text-base font-bold text-[#1a1a2e]">Mis bots</h2>
            <div className="space-y-4">
              {visibleBots.map(bot => (
                <div key={bot.id} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef0fe]">
                    {bot.type === "mail"
                      ? <Mail className="h-3.5 w-3.5 text-[#4f46e5]" />
                      : <Zap  className="h-3.5 w-3.5 text-[#4f46e5]" fill="currentColor" />
                    }
                  </div>
                  <div className="min-w-0">
                    <span className="text-sm font-semibold text-[#1a1a2e]">{bot.name}</span>
                    <span className="ml-2 text-xs text-gray-400">Modificado {bot.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAll(v => !v)}
              className="mt-4 flex items-center gap-1 text-sm font-medium text-[#4f46e5] hover:underline"
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
              <a href="#"
                className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.33.18.7.24 1.06.18l11.9-11.9-2.37-2.37L3.18 23.76zm15.23-12.83L15.8 9.3 3.96.48C3.56.24 3.08.18 2.64.36L14.04 11.76l4.37-.83zM21.4 10.3c-.4-.22-.85-.33-1.3-.33-.45 0-.9.11-1.3.33l-2.1 1.2 2.37 2.37 2.1-1.2c.8-.46.8-1.64.23-2.37zM4.24.06C3.88 0 3.52.06 3.18.24L14.04 11.1l2.37-2.37L4.24.06z"/>
                </svg>
                Google Play
              </a>
              <a href="#"
                className="flex items-center gap-2 rounded-lg bg-black px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 transition-colors">
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
