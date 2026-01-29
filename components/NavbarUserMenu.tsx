"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Props = {
  userName?: string
  avatarUrl?: string
  onSignOut?: () => void
}

const NavbarUserMenu = ({ userName = "User", avatarUrl, onSignOut }: Props) => {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleDocClick)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleDocClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const first = menuRef.current?.querySelector<HTMLElement>('a, button, [tabindex="0"]')
    first?.focus()
  }, [open])

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-3 px-3 py-1.5 rounded-md hover:bg-sky-700 transition"
      >
        <span className="relative w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
          {avatarUrl ? (
            <Image src={avatarUrl} alt={`${userName} avatar`} fill className="object-cover" />
          ) : (
            <span className="text-sm font-medium text-white">
              {userName.charAt(0).toUpperCase()}
            </span>
          )}
        </span>
        <span className="text-sm font-medium hidden sm:inline text-white">{userName}</span>
        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={menuRef}
        role="menu"
        aria-hidden={!open}
        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black/5 transform origin-top-right transition-all duration-150 ${
          open ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
        }`}
      >
        <div className="py-2">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="text-sm font-semibold text-gray-800">{userName}</div>
          </div>

          <nav className="py-2 flex flex-col">
            <Link
              href="/profile"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              role="menuitem"
              tabIndex={0}
            >
              Profile
            </Link>

            <Link
              href="/settings"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              role="menuitem"
              tabIndex={0}
            >
              Settings
            </Link>

            <button
              type="button"
              onClick={() => (onSignOut ? onSignOut() : alert("Sign out"))}
              className="text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              role="menuitem"
              tabIndex={0}
            >
              Sign out
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default NavbarUserMenu
