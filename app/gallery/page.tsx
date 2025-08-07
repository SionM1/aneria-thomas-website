import { Metadata } from 'next'
import { Covered_By_Your_Grace } from 'next/font/google'
import { getAllArtworks } from '@/data/artworksData'
import GalleryGrid from '@/components/GalleryGrid'
import { genPageMetadata } from 'app/seo'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = genPageMetadata({ title: 'Gallery' })

export default function GalleryPage() {
  const artworks = getAllArtworks()

  return (
    <div className="relative w-full">
      {/* Break out of the container completely */}
      <div className="absolute left-1/2 w-screen -translate-x-1/2 transform">
        {/* Gallery Header Section - Centered like home/about */}
        <div className="bg-opacity-90 relative flex min-h-screen items-center justify-center bg-teal-900">
          <div className="px-4 text-center text-white">
            <h1
              className={`${coveredByYourGrace.className} mb-6 text-6xl drop-shadow-lg`}
              style={{ color: '#DED308' }}
            >
              Gallery
            </h1>
            <p className="text-xl drop-shadow-md">
              A collection of my latest works exploring color, form, and emotion.
            </p>
          </div>

          {/* Scroll indicator - same as ParallaxAbout */}
          <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 transform flex-col items-center text-center text-white">
            <p className="mb-2">Scroll to explore</p>
            <div className="animate-bounce">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Gallery Content */}
        <div className="bg-opacity-90 bg-teal-900 py-20">
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
