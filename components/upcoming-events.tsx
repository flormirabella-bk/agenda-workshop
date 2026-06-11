import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

export function UpcomingEvents() {
  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-[1400px] px-6 pt-10 pb-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#3730a3] to-[#7b82f0] px-8 py-10">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute -bottom-10 right-32 h-48 w-48 rounded-full bg-white/5" />

          {/* Próximo evento pill — informativa */}
          <span className="absolute right-6 top-6 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#3730a3]">
            Próximo evento
          </span>

          {/* Content */}
          <div className="relative max-w-lg">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold text-white">Botmaker 3.0</h2>
              <span className="rounded-full border border-white/40 bg-white/15 px-3 py-1 text-sm font-semibold text-white">
                Workshop
              </span>
            </div>
            <p className="mt-3 text-base text-white/75 leading-relaxed">
              Capacitate en vivo con el equipo de Botmaker. Talleres presenciales y virtuales, sin costo, en Argentina, Colombia y México.
            </p>

            {/* Next event detail */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
              <span className="font-semibold text-white">19 JUN · 10:00 AM</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Buenos Aires, Argentina
              </span>
            </div>

            {/* CTA */}
            <Link
              href="/academy?tab=workshops"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#3730a3] transition-colors hover:bg-white/90"
            >
              Ver fechas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
