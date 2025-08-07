import { Covered_By_Your_Grace } from 'next/font/google'
import ParallaxAbout from '@/components/ParallaxAbout'
import AboutSections from '@/components/AboutSections'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

export default function AboutPage() {
  return (
    <div className="relative w-full">
      {/* Break out of the container completely */}
      <div className="absolute left-1/2 w-screen -translate-x-1/2 transform">
        {/* Parallax Hero Section */}
        <ParallaxAbout coveredByYourGrace={coveredByYourGrace} />

        {/* About Content Sections */}
        <div className="bg-opacity-90 bg-teal-900 py-20">
          <AboutSections coveredByYourGrace={coveredByYourGrace} />
        </div>
      </div>
      {/* Spacer to push the footer down */}
      <div className="h-screen"></div>
      <div className="h-[250vh]"></div> {/* Adjust this height based on your content */}
    </div>
  )
}
