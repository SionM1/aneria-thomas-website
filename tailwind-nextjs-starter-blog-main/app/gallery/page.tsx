import { Metadata } from 'next'
import { getAllArtworks } from '@/data/artworksData'
import GalleryGrid from '@/components/GalleryGrid'
import { genPageMetadata } from 'app/seo'

export const metadata: Metadata = genPageMetadata({ title: 'Gallery' })

export default function GalleryPage() {
  const artworks = getAllArtworks()

  return (
    <div className="w-full">
      {/* Header section with constrained width */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Gallery
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A collection of my latest works exploring color, form, and emotion.
          </p>
        </div>
      </div>
      
      {/* Gallery grid with full width */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <GalleryGrid artworks={artworks} />
      </div>
    </div>
  )
}