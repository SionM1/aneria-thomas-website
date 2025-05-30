import ParallaxAbout from '@/components/ParallaxAbout'
import AboutSections from '@/components/AboutSections'


export default function AboutPage() {
  return (
    <div className="relative w-full">
      {/* Break out of the container completely */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-screen">
        {/* Parallax Hero Section */}
        <ParallaxAbout />
        
        {/* About Content Sections */}
        <div className="bg-teal-900 bg-opacity-90 py-20">
          <AboutSections />
        </div>
      </div>
      
      {/* Spacer to push the footer down */}
      <div className="h-screen"></div>
      <div className="h-[250vh]"></div> {/* Adjust this height based on your content */}
    </div>
  )
}