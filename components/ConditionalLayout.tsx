'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <div className="flex h-screen flex-col justify-between font-sans">
      {!isHomePage && <Header />}
      <main className="mb-auto">{children}</main>
    </div>
  )
}
