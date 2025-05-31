import { Metadata } from 'next'
import { getAllArtworks } from '@/data/artworksData'
import GalleryGrid from '@/components/GalleryGrid'
import { genPageMetadata } from 'app/seo'

export const metadata: Metadata = genPageMetadata({ title: 'Gallery' })

export default function GalleryPage() {
  const artworks = getAllArtworks()

  return (
    <div className="relative w-full">
      {/* Break out of the container completely */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-screen">
        {/* Gallery Header Section - Centered like home/about */}
        <div className="bg-teal-900 bg-opacity-90 min-h-screen flex items-center justify-center relative">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-bold drop-shadow-lg mb-6">
              Gallery
            </h1>
            <p className="text-xl drop-shadow-md">
              A collection of my latest works exploring color, form, and emotion.
            </p>
          </div>
          
          {/* Scroll indicator - same as ParallaxAbout */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white text-center">
            <p className="mb-2">Scroll to explore</p>
            <div className="animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Gallery Content */}
        <div className="bg-teal-900 bg-opacity-90 py-20">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <GalleryGrid artworks={artworks} />
          </div>
        </div>
      </div>
      
      {/* Spacer to push the footer down */}
      <div className="h-screen"></div>
      <div className="h-[150vh]"></div>
    </div>
  )
}
