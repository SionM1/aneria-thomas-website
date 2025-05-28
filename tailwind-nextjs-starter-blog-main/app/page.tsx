import ParallaxReveal from '@/components/ParallaxReveal'
import FeaturedWork from '@/components/FeaturedWork'

export default async function Page() {
  return (
    <ParallaxReveal backgroundImage="/static/images/HomeBackground.jpg">
      {/* Hero section with the name */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-bold drop-shadow-lg">
            Aneira Thomas
          </h1>
        </div>
      </div>

  
      {/* Featured Work section with transparent background */}
      <div className="bg-transparent">
        <FeaturedWork />
      </div>
    </ParallaxReveal>
  )
}
