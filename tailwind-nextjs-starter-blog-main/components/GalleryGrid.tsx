'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Artwork } from '@/data/artworksData'
import { useState } from 'react'

interface GalleryGridProps {
  artworks: Artwork[]
}

interface ImageDimensions {
  [key: string]: { width: number; height: number }
}

export default function GalleryGrid({ artworks }: GalleryGridProps) {
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions>({})

  const handleImageLoad = (slug: string, naturalWidth: number, naturalHeight: number) => {
    setImageDimensions(prev => ({
      ...prev,
      [slug]: { width: naturalWidth, height: naturalHeight }
    }))
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {artworks.map((artwork) => {
        const dimensions = imageDimensions[artwork.slug]
        const aspectRatio = dimensions ? dimensions.height / dimensions.width : 1

        return (
          <Link
            key={artwork.slug}
            href={`/gallery/${artwork.slug}`}
            className="group relative block break-inside-avoid overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-transform duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            <div className="relative w-full">
              <Image
                src={artwork.imagePath}
                alt={artwork.title}
                width={800}
                height={Math.round(800 * aspectRatio) || 600}
                className="w-full h-auto object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement
                  handleImageLoad(artwork.slug, img.naturalWidth, img.naturalHeight)
                }}
              />
              {/* Overlay with artwork info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{artwork.title}</h3>
                  <p className="text-sm opacity-90 mb-1">{artwork.medium}</p>
                  {artwork.year && (
                    <p className="text-sm opacity-75 mb-2">{artwork.year}</p>
                  )}
                  {artwork.available !== undefined && (
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        artwork.available
                          ? 'bg-green-500/90 text-white'
                          : 'bg-red-500/90 text-white'
                      }`}
                    >
                      {artwork.available ? 'Available' : 'Sold'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}