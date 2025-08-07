'use client'

import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isAboutPage = pathname === '/about'

  return (
    <footer
      className={`relative right-1/2 left-1/2 -mx-[50vw] w-screen ${isAboutPage ? 'bg-teal-900 text-white' : ''}`}
    >
      {/* Your footer content */}
      <div className="mt-20 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <div>
            Website Created By{' '}
            <Link href="https://www.linkedin.com/in/si%C3%B4n-morgan-b28994295/">Siôn Morgan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
