import ParallaxAbout from '@/components/ParallaxAbout'
import AboutSections from '@/components/AboutSections'

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Break out of the container completely */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-screen">
        {/* Parallax Hero Section */}
        <ParallaxAbout />
        
        {/* About Content Sections */}
        <div className="bg-black bg-opacity-80 py-20">
          <AboutSections />
        </div>
      </div>
    </div>
  )
}
