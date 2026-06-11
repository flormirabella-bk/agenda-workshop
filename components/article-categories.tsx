import { ChevronRight, ArrowRight } from "lucide-react"

const categories = [
  {
    title: "Botmaker 3.0 - Agentes de IA",
    description:
      "Conoce Botmaker 3.0, la versión agéntica de la plataforma. Aprende a crear agentes de IA y resolver procesos completos sin guiones.",
  },
  {
    title: "Callbots y WhatsApp Calling",
    description: "Aprende a utilizar llamadas de voz con inteligencia artificial para teléfono y WhatsApp.",
  },
  {
    title: "Agentes de IA",
    description: "Conoce el nuevo Bot Designer con IA generativa. Aprende a crear bots y diseñar flujos.",
  },
  {
    title: "Mailbots",
    description: "Aprende a configurar mailbots para las casillas de correo electrónico",
  },
  {
    title: "Botmaker Sessions",
    description: "Revive tus sesiones en vivo cuando quieras. Accede a las grabaciones completas y revisa cada detalle.",
  },
  {
    title: "Primeros Pasos",
    description: "Conoce la plataforma",
  },
]

export function ArticleCategories() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1e1b4b]">Categorias de Artículos</h2>
        <a href="#" className="flex items-center gap-1 text-sm font-medium text-[#4f46e5] hover:underline">
          Ver todos <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat.title}
            className="flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 text-left transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#1e1b4b]">{cat.title}</h3>
              <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
            </div>
            <p className="text-sm leading-relaxed text-gray-500">{cat.description}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
