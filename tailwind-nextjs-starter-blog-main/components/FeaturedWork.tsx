'use client'

import { useEffect, useRef, useState } from 'react'

interface FeaturedWorkProps {
  className?: string
}

export default function FeaturedWork({ className = '' }: FeaturedWorkProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px 0px -50px 0px', // Start animation a bit before fully visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Placeholder artwork data
  const artworks = [
    { id: 1, title: 'Artwork 1' },
    { id: 2, title: 'Artwork 2' },
    { id: 3, title: 'Artwork 3' },
    { id: 4, title: 'Artwork 4' },
    { id: 5, title: 'Artwork 5' },
  ]

  return (
    <div 
      ref={sectionRef}
      className={`py-24 transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {/* Section Title - centered with max width */}
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className={`text-center mb-20 transition-all duration-1200 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Featured Work
          </h2>
          <p className="text-xl text-white drop-shadow-md">
            A selection of standout pieces
          </p>
        </div>
      </div>

      {/* Full-width Horizontal Scrolling Gallery - Spans entire viewport */}
      <div 
        className={`w-full transition-all duration-1200 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="overflow-x-auto pb-8">
          <div className="flex gap-6 px-6" style={{ width: 'max-content' }}>
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={`cursor-pointer group transition-all duration-800 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{ 
                  transitionDelay: `${600 + index * 150}ms`,
                  width: 'calc((100vw - 84px) / 3)' // 3 cards per viewport, accounting for gaps and padding
                }}
                onClick={() => {
                  // TODO: Navigate to gallery page with this artwork
                  console.log(`Navigate to artwork ${artwork.id}`)
                }}
              >
                {/* Artwork Container */}
                <div className="relative w-full h-[28rem] bg-black rounded-xl overflow-hidden shadow-2xl group-hover:shadow-3xl group-hover:scale-105 transition-all duration-500">
                  {/* White placeholder box */}
                  <div className="absolute inset-6 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center group-hover:border-gray-300 transition-colors duration-300">
                    <span className="text-gray-400 text-lg font-medium">
                      {artwork.title}
                    </span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white bg-opacity-95 px-6 py-3 rounded-full shadow-lg">
                        <span className="text-black text-base font-semibold">View Artwork</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artwork Info */}
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-bold text-white drop-shadow-md">
                    {artwork.title}
                  </h3>
                  <p className="text-base text-white text-opacity-90 drop-shadow-sm mt-2">
                    Oil on Canvas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Button - centered with max width */}
      <div className="max-w-7xl mx-auto px-4">
        <div 
          className={`text-center mt-16 transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button 
            className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-40 text-white px-10 py-4 rounded-full hover:bg-opacity-30 hover:scale-105 transition-all duration-300 font-semibold text-lg drop-shadow-lg"
            onClick={() => {
              // TODO: Navigate to full gallery
              console.log('Navigate to gallery')
            }}
          >
            View All Work
          </button>
        </div>
      </div>
    </div>
  )
}
