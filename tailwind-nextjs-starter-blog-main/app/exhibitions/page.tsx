import { Metadata } from 'next'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from '../seo'

export const metadata: Metadata = genPageMetadata({ title: 'Exhibitions' })

export default function ExhibitionsPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Exhibitions
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Current, upcoming, and past exhibitions featuring the work of Aneira Thomas
        </p>
      </div>

      <div className="container py-12">
        <p className="text-center text-gray-500 dark:text-gray-400">
          Exhibitions content will be added here.
        </p>
      </div>
    </div>
  )
}