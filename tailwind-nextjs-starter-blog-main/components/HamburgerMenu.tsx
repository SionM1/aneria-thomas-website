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
          className="burger relative w-10 h-8 bg-transparent cursor-pointer block focus:outline-none"
          aria-label="Menu toggle"
        >
          <span
            className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${
              isHomePage ? 'bg-white' : 'bg-gray-900 dark:bg-white'
            } ${
              isOpen
                ? 'rotate-45 top-0 left-1'
                : 'top-0 left-0'
            }`}
            style={{ transformOrigin: 'left center' }}
          />
          <span
            className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${
              isHomePage ? 'bg-white' : 'bg-gray-900 dark:bg-white'
            } ${
              isOpen ? 'w-0 opacity-0' : 'w-full opacity-100'
            } top-1/2 -translate-y-1/2 left-0`}
            style={{ transformOrigin: 'left center' }}
          />
          <span
            className={`absolute h-1 w-full rounded-full transition-all duration-300 ease-in-out ${
              isHomePage ? 'bg-white' : 'bg-gray-900 dark:bg-white'
            } ${
              isOpen
                ? '-rotate-45 top-7 left-1'
                : 'bottom-0 left-0'
            }`}
            style={{ transformOrigin: 'left center' }}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-48 py-2">
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {siteMetadata.headerTitle}
              </p>
            </div>
            
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
              <ThemeSwitch />
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}