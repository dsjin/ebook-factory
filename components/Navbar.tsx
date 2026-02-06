"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavbarUserMenu from "./NavbarUserMenu"
import MobileSlidingPanel from "./MobileSlidingPanel"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="w-full p-3 bg-sky-500 flex justify-center text-white">
        <div className="nav-content flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <h1 className="h-fit">Book Factory</h1>
            <ul className="hidden md:flex gap-3">
              <li>
                <Link
                  href="/"
                  className={`px-3 py-2 cursor-pointer transition-colors rounded-xl ${pathname === '/' ? 'bg-sky-700' : 'hover:bg-sky-700'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/ebooks"
                  className={`px-3 py-2 cursor-pointer transition-colors rounded-xl ${pathname?.startsWith('/ebooks') ? 'bg-sky-700' : 'hover:bg-sky-700'}`}
                >
                  Ebooks
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <NavbarUserMenu userName="Alice" avatarUrl="/next.svg" onSignOut={() => console.log("sign out")} />
            </div>

            <button
              className="md:hidden p-2 rounded-md hover:bg-sky-600"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      <MobileSlidingPanel
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={[{ href: '/', label: 'Home' }, { href: '/ebooks', label: 'Ebooks' }]}
        userName="Alice"
        avatarUrl="/next.svg"
        onSignOut={() => console.log('sign out')}
      />
    </>
  )
}

export default Navbar
