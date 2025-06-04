'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from './ThemeSwitch'

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

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
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="burger relative block h-8 w-10 cursor-pointer bg-transparent focus:outline-none"
          aria-label="Menu toggle"
        >
          <span
            className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${
              isHomePage ? 'bg-white' : 'bg-gray-900 dark:bg-white'
            } ${isOpen ? 'top-0 left-1 rotate-45' : 'top-0 left-0'}`}
            style={{ transformOrigin: 'left center' }}
          />
          <span
            className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${
              isHomePage ? 'bg-white' : 'bg-gray-900 dark:bg-white'
            } ${isOpen ? 'w-0 opacity-0' : 'w-full opacity-100'} top-1/2 left-0 -translate-y-1/2`}
            style={{ transformOrigin: 'left center' }}
          />
          <span
            className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${
              isHomePage ? 'bg-white' : 'bg-gray-900 dark:bg-white'
            } ${isOpen ? 'top-7 left-1 -rotate-45' : 'bottom-0 left-0'}`}
            style={{ transformOrigin: 'left center' }}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-12 right-0 min-w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-200 px-4 py-2 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {siteMetadata.headerTitle}
              </p>
            </div>

            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            ))}

            <div className="border-t border-gray-200 px-4 py-2 dark:border-gray-700">
              <ThemeSwitch />
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(false)
            }
          }}
        />
      )}
    </div>
  )
}
