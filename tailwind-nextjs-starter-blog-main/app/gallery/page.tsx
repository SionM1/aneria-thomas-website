'use client'

import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

// Note: We can't use Metadata directly in client components
// so we'll handle the page title differently

export default function GalleryPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Gallery
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Explore the artistic journey and creative expressions of Aneira Thomas
        </p>
      </div>

      <div className="container py-12">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Gallery content will be added here.
        </p>
      </div>
    </div>
  )
}