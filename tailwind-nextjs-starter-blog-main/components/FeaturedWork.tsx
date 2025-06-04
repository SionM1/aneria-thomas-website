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

  const artworks = getFeaturedArtworks(5)

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
      {/* Section Title - centered with max width */}
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`mb-20 text-center transition-all duration-1200 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2 className="mb-6 text-5xl font-bold text-white drop-shadow-lg md:text-6xl">
            Featured Work
          </h2>
          <p className="text-xl text-white drop-shadow-md">A selection of standout pieces</p>
        </div>
      </div>

      {/* Full-width Horizontal Scrolling Gallery - Three cards per view */}
      <div
        className={`w-full transition-all duration-1200 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <div className="overflow-x-auto pb-8">
          <div className="flex gap-6 px-6" style={{ width: 'max-content' }}>
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
                  width: 'calc((100vw - 84px) / 3)',
                }}
                onClick={() => navigateToArtwork(artwork.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigateToArtwork(artwork.slug)
                  }
                }}
              >
                {/* Artwork Container */}
                <div className="group-hover:shadow-3xl relative h-[28rem] w-full overflow-hidden rounded-xl bg-black shadow-2xl transition-all duration-500 group-hover:scale-105">
                  {/* Image container with higher z-index */}
                  <div className="absolute relative inset-6 z-40 overflow-hidden rounded-lg border-2 border-gray-200 bg-white transition-colors duration-300 group-hover:border-gray-300">
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
                  <h3 className="text-xl font-bold text-white drop-shadow-md">{artwork.title}</h3>
                  <p className="text-opacity-90 mt-2 text-base text-white drop-shadow-sm">
                    {artwork.medium}
                  </p>
                  {artwork.year && (
                    <p className="text-opacity-75 mt-1 text-sm text-white drop-shadow-sm">
                      {artwork.year}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View All Button - centered with max width */}
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`mt-16 text-center transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <button
            className="bg-orange bg-opacity-20 border-opacity-40 hover:bg-opacity-30 rounded-full border border-white px-10 py-4 text-lg font-semibold text-white drop-shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
            onClick={navigateToGallery}
          >
            View All Work
          </button>
        </div>
      </div>
    </div>
  )
}
