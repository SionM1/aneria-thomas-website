'use client'

import { ReactNode, useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'

interface LocomotiveScrollProviderProps {
  children: ReactNode
  options?: Record<string, unknown>
}

export default function LocomotiveScrollProvider({
  children,
  options = {},
}: LocomotiveScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Locomotive Scroll
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
      ...options,
    })

    // Update scroll on window resize
    const handleResize = () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.update()
      }
    }

    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
      locomotiveScrollRef.current?.destroy()
    }
  }, [options])

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  )
}
