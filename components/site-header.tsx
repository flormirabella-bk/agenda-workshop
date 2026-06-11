"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronDown, Globe } from "lucide-react"

const navItems = [
  { label: "Inicio",              href: "/"        },
  { label: "Artículos",           href: "#"        },
  { label: "Academy",             href: "/academy" },
  { label: "Contactar a soporte", href: "#"        },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#4f46e5]" fill="currentColor" aria-hidden="true">
            <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" />
          </svg>
          <span className="text-xl font-bold text-[#1e1b4b]">botmaker</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && item.href !== "#"
            return (
              <div key={item.label} className="flex flex-col items-center">
                <Link
                  href={item.href}
                  className={`text-sm ${
                    active ? "font-medium text-[#4f46e5]" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
                {active && <span className="mt-1 h-0.5 w-full rounded-full bg-[#4f46e5]" />}
              </div>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a href="#" className="hidden text-sm font-medium text-[#4f46e5] lg:block">
            Monitor de servicios
          </a>
          <span className="hidden rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 lg:block">
            Support Plan: Standard
          </span>
          <button className="flex items-center gap-1 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            ES
            <ChevronDown className="h-3 w-3" />
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-pink-300 to-orange-200">
            <img
              src="/woman-profile-photo.png"
              alt="Foto de perfil"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
