'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface ParallaxRevealAdvancedProps {
  backgroundImage: string
  children: React.ReactNode
  revealHeight?: number // Height in viewport units to complete the reveal
  className?: string
}

export default function ParallaxRevealAdvanced({
  backgroundImage,
  children,
  revealHeight = 100,
  className = '',
}: ParallaxRevealAdvancedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const containerHeight = containerRef.current.offsetHeight

      // Calculate how much of the container has been scrolled through
      const scrolled = Math.max(0, windowHeight - rect.top)
      const maxScroll = windowHeight + containerHeight
      const progress = Math.min(1, scrolled / maxScroll)

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen ${className}`}
      style={{ height: `${revealHeight}vh` }}
    >
      {/* Fixed background container */}
      <div className="fixed inset-0 z-0">
        {/* Background image */}
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={backgroundImage}
            alt="Parallax background"
            fill
            className="object-cover"
            priority
            style={{
              transform: `scale(${1 + scrollProgress * 0.2}) translateY(${scrollProgress * -20}px)`,
              opacity: scrollProgress,
            }}
          />

          {/* Overlay that fades out */}
          <div
            className="absolute inset-0 bg-black transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
          />
        </div>
      </div>

      {/* Scrolling content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
