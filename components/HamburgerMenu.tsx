'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import ThemeSwitch from './ThemeSwitch'

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // Close menu when navigating to a new page
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="burger relative block h-8 w-10 cursor-pointer bg-transparent focus:outline-none"
        aria-label="Menu toggle"
      >
        <span
          className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'top-3 rotate-45' : 'top-0'}`}
          style={{ backgroundColor: '#DED308' }}
        />
        <span
          className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'} top-1/2 -translate-y-1/2`}
          style={{ backgroundColor: '#DED308' }}
        />
        <span
          className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'bottom-3 -rotate-45' : 'bottom-0'}`}
          style={{ backgroundColor: '#DED308' }}
        />
      </button>

      {/* Simple Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 z-40 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="py-2">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block px-4 py-2 text-gray-800 transition-colors hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <div className="mt-2 border-t border-gray-200 pt-2">
              <div className="px-4 py-2">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
