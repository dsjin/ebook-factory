import React from "react"
import Link from "next/link"
import Image from "next/image"

type NavItem = { href: string; label: string }

type Props = {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
  userName?: string
  avatarUrl?: string
  onSignOut?: () => void
}

export default function MobileSlidingPanel({ open, onClose, navItems, userName = "User", avatarUrl, onSignOut }: Props) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 overflow-y-auto pb-8 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="p-4 min-h-full">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-200 relative overflow-hidden">
                {avatarUrl ? (
                  <Image src={avatarUrl} fill alt="Profile Image" className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-white font-medium">{userName.charAt(0)}</div>
                )}
              </div>

              <div>
                <div className="font-semibold">{userName}</div>
              </div>
            </div>

            <button onClick={onClose} className="p-2" aria-label="Close menu">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((n) => (
              <Link key={n.href} href={n.href} className="px-3 py-2 rounded hover:bg-gray-100" onClick={onClose}>
                {n.label}
              </Link>
            ))}
          </nav>

          <hr className="my-4" />

          <nav className="flex flex-col gap-1">
            <Link href="/profile" className="px-3 py-2 rounded hover:bg-gray-100" onClick={onClose}>
              Profile
            </Link>
            <Link href="/settings" className="px-3 py-2 rounded hover:bg-gray-100" onClick={onClose}>
              Settings
            </Link>
            <button
              onClick={() => {
                onSignOut?.();
                onClose();
              }}
              className="text-left px-3 py-2 rounded text-red-600 hover:bg-gray-100"
            >
              Sign out
            </button>
          </nav>
        </div>
      </aside>
    </div>
  )
}
