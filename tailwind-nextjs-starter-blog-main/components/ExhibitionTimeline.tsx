'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Exhibition data interface
interface Exhibition {
  id: number
  title: string
  venue: string
  date: string
  description: string
  imagePath: string
  link?: string
}

interface ExhibitionTimelineProps {
  exhibitions: Exhibition[]
}

export default function ExhibitionTimeline({ exhibitions }: ExhibitionTimelineProps) {
  const [visibleSections, setVisibleSections] = useState<number[]>([])
  const [permanentlyVisible, setPermanentlyVisible] = useState<number[]>([]) // New state for permanent visibility
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [highlightedId, setHighlightedId] = useState<number | null>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [pathLength, setPathLength] = useState(0)

  // ADJUSTABLE PARAMETERS - Change these to control the animation
  const ANIMATION_CONFIG = {
    startDelay: 300,        // pixels - how much to scroll before line starts drawing
    speedMultiplier: 1.7,   // overall speed multiplier (1.0 = normal, 2.0 = 2x faster)
    easingPower: 1.0,       // curve steepness (1.0 = linear, 2.0 = quadratic, 3.0 = cubic)
    // Higher easingPower = starts slower, ends faster
  }

  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, exhibitions.length)
    
    // Get the actual path length for accurate animation
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = parseInt(entry.target.getAttribute('data-id') || '0')
          if (entry.isIntersecting) {
            // Add to visible sections for highlighting
            setVisibleSections((prev) => 
              prev.includes(id) ? prev : [...prev, id]
            )
            setHighlightedId(id)
            
            // Add to permanently visible (once visible, always visible)
            setPermanentlyVisible((prev) => 
              prev.includes(id) ? prev : [...prev, id]
            )
          } else {
            // Remove from current visible (for highlighting) but keep in permanent
            setVisibleSections((prev) => prev.filter(visibleId => visibleId !== id))
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -40% 0px',
      }
    )

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    // Replace the handleScroll function with this version that handles short delays properly:
    const handleScroll = () => {
      if (!timelineRef.current) return
      
      const timeline = timelineRef.current
      const rect = timeline.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      let progress = 0
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Timeline is visible
        const visibleTop = Math.max(0, -rect.top)
        const visibleHeight = Math.min(rect.height, windowHeight - Math.max(0, rect.top))
        
        // Calculate total scroll distance from when timeline first becomes visible
        const timelineEntryPoint = Math.max(0, windowHeight - rect.height)
        const totalScrolled = windowHeight - rect.top
        const adjustedScrolled = Math.max(0, totalScrolled - timelineEntryPoint)
  
        // FIXED: Use adjusted scroll calculation for better short delay handling
        if (adjustedScrolled < ANIMATION_CONFIG.startDelay) {
          progress = 0 // Don't start until we've scrolled past the delay
          console.log('DELAYED - not starting yet')
        } else {
          // Calculate progress starting from the delay point
          const scrolledPastDelay = adjustedScrolled - ANIMATION_CONFIG.startDelay
          const totalScrollableHeight = rect.height + windowHeight - ANIMATION_CONFIG.startDelay
          const rawProgress = scrolledPastDelay / totalScrollableHeight
          
          // Apply easing curve (starts slow, accelerates)
          const easedProgress = Math.pow(rawProgress, ANIMATION_CONFIG.easingPower)
          
          // Apply speed multiplier
          progress = Math.min(1, Math.max(0, easedProgress * ANIMATION_CONFIG.speedMultiplier))
          console.log('STARTED - scrolledPastDelay:', scrolledPastDelay)
        }
      }
      
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [exhibitions.length])

  // Generate the winding path for the SVG
  const generateWindingPath = () => {
    const spacing = 300
    const amplitude = 60
    const centerX = 60
    
    let path = `M${centerX},50`
    
    exhibitions.forEach((_, index) => {
      const y = (index + 1) * spacing + 50
      const isEven = index % 2 === 0
      
      const controlX1 = centerX + (isEven ? amplitude : -amplitude)
      const controlY1 = y - spacing * 0.7
      const controlX2 = centerX + (isEven ? amplitude * 0.5 : -amplitude * 0.5)
      const controlY2 = y - spacing * 0.3
      const endX = centerX
      const endY = y
      
      path += ` C${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`
    })
    
    return path
  }

  const getMarkerPosition = (index: number) => {
    const spacing = 300
    const centerX = 60
    
    return {
      x: centerX,
      y: (index + 1) * spacing + 50
    }
  }

  const totalSVGHeight = (exhibitions.length + 1) * 300 + 100

  return (
    <div className="w-full py-12" ref={timelineRef}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column - Dynamic Winding Line */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-8">
              <svg 
                width="120" 
                height={totalSVGHeight}
                viewBox={`0 0 120 ${totalSVGHeight}`}
                className="w-full"
              >
                {/* Hidden reference path */}
                <path
                  ref={pathRef}
                  d={generateWindingPath()}
                  stroke="none"
                  fill="none"
                  style={{ visibility: 'hidden' }}
                />
                
                {/* Background path */}
                <path
                  d={generateWindingPath()}
                  stroke="#E5E7EB"
                  strokeWidth="2"
                  fill="none"
                  className="opacity-20"
                />
                
                {/* Animated path - draws with easing curve */}
                <path
                  d={generateWindingPath()}
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={pathLength}
                  strokeDashoffset={pathLength * (1 - scrollProgress)}
                  className="transition-none"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(20, 184, 166, 0.3))'
                  }}
                />
                
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="50%" stopColor="#0D9488" />
                    <stop offset="100%" stopColor="#0F766E" />
                  </linearGradient>
                </defs>
                
                {/* Circle markers */}
                {exhibitions.map((exhibition, index) => {
                  const position = getMarkerPosition(index)
                  const isHighlighted = highlightedId === exhibition.id
                  const isVisible = visibleSections.includes(exhibition.id)
                  
                  // Node appears when line reaches it
                  const nodeThreshold = (index + 1) / exhibitions.length * 0.8
                  const isRevealed = scrollProgress >= nodeThreshold
                  
                  return (
                    <g key={exhibition.id}>
                      <circle
                        cx={position.x}
                        cy={position.y}
                        r="12"
                        stroke="#14B8A6"
                        strokeWidth="2"
                        fill="none"
                        className={`transition-all duration-500 ${
                          isRevealed ? 'opacity-60 scale-100' : 'opacity-0 scale-0'
                        }`}
                        style={{ transformOrigin: `${position.x}px ${position.y}px` }}
                      />
                      
                      <circle
                        cx={position.x}
                        cy={position.y}
                        r="8"
                        stroke="#374151"
                        strokeWidth="3"
                        fill={isRevealed ? (isHighlighted ? "#14B8A6" : "white") : "transparent"}
                        className={`transition-all duration-500 ${
                          isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                        }`}
                        style={{
                          transformOrigin: `${position.x}px ${position.y}px`,
                          filter: isHighlighted ? 'drop-shadow(0 0 8px rgba(20, 184, 166, 0.6))' : 'none'
                        }}
                      />
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
          
          {/* Right Column - Exhibition Cards */}
          <div className="lg:col-span-10">
            <div className="space-y-32">
              {exhibitions.map((exhibition, index) => {
                const isCurrentlyVisible = visibleSections.includes(exhibition.id)
                const hasBeenVisible = permanentlyVisible.includes(exhibition.id) // Check if it has ever been visible
                
                return (
                  <div 
                    key={exhibition.id}
                    ref={(el) => {
                      sectionRefs.current[index] = el;
                    }}
                    data-id={exhibition.id}
                    className={`transition-all duration-1000 ease-out ${
                      hasBeenVisible // Use permanent visibility instead of current visibility
                        ? 'opacity-100 translate-y-0 translate-x-0' 
                        : 'opacity-0 translate-y-12 translate-x-8'
                    }`}
                  >
                    <div className={`bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${
                      isCurrentlyVisible ? 'ring-2 ring-teal-200' : '' // Optional: add subtle ring when currently in view
                    }`}>
                      <div className="lg:flex">
                        <div className="lg:w-1/4">
                          <div className="relative h-60 lg:h-full overflow-hidden">
                            <Image
                              src={exhibition.imagePath || '/static/images/placeholder-exhibition.jpg'}
                              alt={exhibition.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                              sizes="(max-width: 1024px) 100vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </div>
                        
                        <div className="lg:w-3/4 p-8">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors duration-300">
                                {exhibition.title}
                              </h3>
                              <p className="text-lg text-gray-600 mb-1">
                                {exhibition.venue}
                              </p>
                            </div>
                            <div className="mt-2 lg:mt-0">
                              <span className="inline-block px-4 py-2 bg-teal-600 text-white rounded-full text-sm font-medium group-hover:bg-teal-700 transition-colors duration-300">
                                {exhibition.date}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {exhibition.description}
                          </p>
                          
                          {exhibition.link && (
                            <Link
                              href={exhibition.link}
                              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              View Details
                              <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
