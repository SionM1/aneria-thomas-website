import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Artwork Not Found
      </h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        The artwork you're looking for doesn't exist or may have been removed.
      </p>
      <Link
        href="/gallery"
        className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 group inline-flex items-center"
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
  )
}
