"use client"

import React, { useState } from "react"
import NavbarUserMenu from "./NavbarUserMenu"
import MobileSlidingPanel from "./MobileSlidingPanel"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="w-full p-3 bg-sky-500 flex justify-center text-white">
        <div className="nav-content flex justify-between items-center px-4">
          <div className="flex items-center gap-3">
            <h1 className="h-fit">Book Factory</h1>
            <ul className="hidden md:flex gap-3">
              <li className="px-3 py-2 bg-sky-700 hover:bg-sky-700 cursor-pointer transition-colors rounded-xl">
                Home
              </li>
              <li className="px-3 py-2 hover:bg-sky-700 cursor-pointer transition-colors rounded-xl">
                List
              </li>
              <li className="px-3 py-2 hover:bg-sky-700 cursor-pointer transition-colors rounded-xl">
                Upload
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
        navItems={[{ href: '/', label: 'Home' }, { href: '/list', label: 'List' }, { href: '/upload', label: 'Upload' }]}
        userName="Alice"
        avatarUrl="/next.svg"
        onSignOut={() => console.log('sign out')}
      />
    </>
  )
}

export default Navbar
