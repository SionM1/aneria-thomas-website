import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getArtworkBySlug, getAllArtworks } from '@/data/artworksData'

interface ArtworkPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const artworks = getAllArtworks()
  return artworks.map((artwork) => ({
    slug: artwork.slug,
  }))
}

export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params
  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    return {}
  }

  return {
    title: artwork.title,
    description: artwork.description,
    openGraph: {
      title: artwork.title,
      description: artwork.description,
      images: [artwork.imagePath],
    },
  }
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params
  const artwork = getArtworkBySlug(slug)

  if (!artwork) {
    notFound()
  }

  return (
    <div className="w-full">
      {/* Header with back button - constrained width */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/gallery"
          className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 group mb-8 inline-flex items-center"
        >
          <svg
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Gallery
        </Link>
      </div>

      {/* Main content area */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 xl:grid-cols-5">
            {/* Image - Takes up more space and centers itself */}
            <div className="flex justify-center xl:col-span-3">
              <div className="relative max-w-full">
                <Image
                  src={artwork.imagePath}
                  alt={artwork.title}
                  width={1200}
                  height={900}
                  className="h-auto w-full rounded-lg object-contain shadow-lg"
                  sizes="(max-width: 1280px) 100vw, 60vw"
                  priority
                />
              </div>
            </div>

            {/* Details - Takes up remaining space */}
            <div className="xl:col-span-2">
              <div className="flex flex-col justify-start space-y-6 xl:sticky xl:top-8">
                <div>
                  <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {artwork.title}
                  </h1>
                  {artwork.year && (
                    <p className="text-lg text-gray-600 dark:text-gray-400">{artwork.year}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
                      Medium
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">{artwork.medium}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
                      Dimensions
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">{artwork.size}</p>
                  </div>

                  {artwork.available !== undefined && (
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
                        Availability
                      </h3>
                      <p
                        className={`mt-1 ${artwork.available ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                      >
                        {artwork.available ? 'Available' : 'Sold'}
                      </p>
                    </div>
                  )}

                  {artwork.price && artwork.available && (
                    <div>
                      <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
                        Price
                      </h3>
                      <p className="mt-1 text-gray-600 dark:text-gray-400">{artwork.price}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="mb-2 text-sm font-semibold tracking-wide text-gray-900 uppercase dark:text-gray-100">
                    Description
                  </h3>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                    {artwork.description}
                  </p>
                </div>

                {/* Contact/Inquiry button */}
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  >
                    Inquire About This Piece
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
