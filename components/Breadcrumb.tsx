"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Breadcrumb() {
  const pathname = usePathname() || "/"
  const parts = pathname.split("/").filter(Boolean)

  const crumbs = [{ href: "/", label: "Home" }, ...parts.map((p, i) => {
    const href = `/${parts.slice(0, i + 1).join("/")}`
    // capitalise label
    const label = decodeURIComponent(p).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    return { href, label }
  })]

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-4">
      <ol className="flex items-center gap-2">
        {crumbs.map((c, idx) => (
          <li key={c.href} className="flex items-center">
            {idx > 0 && <span className="text-gray-400">/</span>}
            <Link href={c.href} className={`ml-2 ${idx === crumbs.length - 1 ? 'font-semibold text-gray-900' : 'hover:underline'}`}>
              {c.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
