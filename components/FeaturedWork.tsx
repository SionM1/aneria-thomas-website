'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getFeaturedArtworks } from '@/data/artworksData'

interface FeaturedWorkProps {
  className?: string
}

export default function FeaturedWork({ className = '' }: FeaturedWorkProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const artworks = getFeaturedArtworks(3)

  const navigateToGallery = () => {
    router.push('/gallery')
  }

  const navigateToArtwork = (slug: string) => {
    router.push(`/gallery/${slug}`)
  }

  return (
    <div
      ref={sectionRef}
      className={`relative z-20 py-24 transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } ${className}`}
    >
      {/* Section Title - full width */}
      <div className="px-8">
        <div
          className={`mb-20 text-center transition-all duration-1200 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2
            className="mb-6 text-5xl md:text-6xl"
            style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
          >
            Featured Work
          </h2>
        </div>
      </div>

      {/* Full-width Gallery - Three cards per row */}
      <div
        className={`w-full transition-all duration-1200 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="px-8">
          <div className="grid max-w-none grid-cols-1 gap-8 md:grid-cols-3">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.slug}
                className={`group relative z-30 cursor-pointer transition-all duration-800 ease-out ${
                  isVisible
                    ? 'translate-y-0 scale-100 opacity-100'
                    : 'translate-y-12 scale-95 opacity-0'
                }`}
                role="button"
                tabIndex={0}
                aria-label={`View ${artwork.title}`}
                style={{
                  transitionDelay: `${600 + index * 150}ms`,
                }}
                onClick={() => navigateToArtwork(artwork.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigateToArtwork(artwork.slug)
                  }
                }}
              >
                {/* Artwork Container */}
                <div className="relative h-[28rem] w-full overflow-hidden bg-transparent transition-all duration-500 group-hover:scale-105">
                  {/* Image container with higher z-index */}
                  <div className="absolute relative inset-6 z-40 overflow-hidden border-2 border-gray-200 bg-transparent transition-colors duration-300 group-hover:border-gray-300">
                    <img
                      src={artwork.imagePath}
                      alt={artwork.title}
                      className="h-full w-full object-contain"
                      style={{
                        position: 'relative',
                        zIndex: 50,
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Hover overlay */}
                  <div className="bg-opacity-0 group-hover:bg-opacity-20 absolute relative inset-0 z-45 flex items-center justify-center bg-black transition-all duration-500">
                    <div className="translate-y-4 transform opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="bg-opacity-95 rounded-full bg-white px-6 py-3 shadow-lg">
                        <span className="text-base font-semibold text-black">View Artwork</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artwork Info */}
                <div className="mt-6 text-center">
                  <h3
                    className="text-xl"
                    style={{ color: '#DED308', fontFamily: 'Menlo', fontWeight: 'bold' }}
                  >
                    {artwork.title}
                  </h3>
                  <p
                    className="mt-2 text-base text-black"
                    style={{ fontFamily: 'Menlo', fontWeight: '400' }}
                  >
                    {artwork.medium}
                  </p>
                  {artwork.year && (
                    <p
                      className="mt-1 text-sm text-black"
                      style={{ fontFamily: 'Menlo', fontWeight: '400' }}
                    >
                      {artwork.year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Button - full width */}
      <div className="px-8">
        <div
          className={`mt-16 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button
            className="bg-orange bg-opacity-20 border-opacity-40 hover:bg-opacity-30 rounded-full border-white px-10 py-4 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            style={{
              color: '#DED308',
              borderColor: '#DED308',
              fontFamily: 'Menlo',
              fontWeight: 'bold',
            }}
            onClick={navigateToGallery}
          >
            View All Work
          </button>
        </div>
      </div>
    </div>
  )
}
