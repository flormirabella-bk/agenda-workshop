import { FileText, GraduationCap, Receipt, Search } from "lucide-react"

const topCards = [
  {
    icon: FileText,
    title: "Articulos",
    description: "Accede a nuestros artículos en línea",
    badge: null,
    href: "#",
  },
  {
    icon: GraduationCap,
    title: "Botmaker Academy",
    description: "Accede a la academia de cursos de Botmaker",
    badge: null,
    href: "/academy",
  },
  {
    icon: Receipt,
    title: "Contactar a Soporte",
    description: "Crea tu ticket y haz seguimiento de tu reclamo",
    badge: null,
    href: "#",
  },
]

export function HelpHero() {
  return (
    <section className="relative">
      {/* Blue background */}
      <div className="absolute inset-x-0 top-0 h-[420px] overflow-hidden bg-[#7b82f0]">
        <div className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-white/5" />
        <div className="absolute right-40 -top-20 h-[400px] w-[400px] rounded-full bg-white/5" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 pt-16">
        <h1 className="text-4xl font-semibold text-white">Centro de ayuda</h1>

        {/* Search */}
        <div className="relative mt-10">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Escribe tu pregunta o problema"
            className="h-14 w-full rounded-xl border border-white/20 bg-white pl-14 pr-5 text-base text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 pb-4 sm:grid-cols-3 lg:grid-cols-3">
          {topCards.map((card) => {
            const Icon = card.icon
            return (
              <a
                key={card.title}
                href={card.href}
                className="group relative flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md overflow-visible"
              >
                {card.badge && (
                  <span className="absolute -top-3 right-3 rounded-full bg-[#4f46e5] px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                    {card.badge}
                  </span>
                )}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef0fe]">
                  <Icon className="h-6 w-6 text-[#4f46e5]" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-[#1e1b4b] leading-snug">{card.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-500">{card.description}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
