import { Metadata } from 'next'
import ExhibitionTimeline from '@/components/ExhibitionTimeline'
import { genPageMetadata } from 'app/seo'

export const metadata: Metadata = genPageMetadata({ title: 'Exhibitions' })

// Sample exhibition data - replace with your actual data
const exhibitions = [
  {
    id: 1,
    title: "Solo Exhibition: 'Chromatic Visions'",
    venue: "Modern Art Gallery, London",
    date: "June 2023",
    description: "A solo exhibition featuring a collection of abstract works exploring the relationship between color and emotion. The exhibition showcased 15 new paintings created over the course of two years.",
    imagePath: "/static/images/gallery/CynffonYTân.jpeg",
    link: "/exhibitions/chromatic-visions"
  },
  {
    id: 2,
    title: "Group Show: 'New Perspectives'",
    venue: "Contemporary Arts Center, Cardiff",
    date: "March 2023",
    description: "A curated selection of works by emerging Welsh artists, examining themes of identity and place in contemporary society. Featured alongside five other notable artists from the region.",
    imagePath: "/static/images/gallery/Duckie.jpeg"
  },
  {
    id: 3,
    title: "Annual Exhibition: 'Reflections'",
    venue: "Royal Academy of Arts, London",
    date: "November 2022",
    description: "Participated in this prestigious annual exhibition showcasing the best of contemporary British art. My piece 'Mapping the Changing Colours' was selected from over 3,000 submissions.",
    imagePath: "/static/images/gallery/MappingtheChangingColours.jpeg"
  },
  {
    id: 4,
    title: "International Art Fair",
    venue: "Saatchi Gallery, London",
    date: "September 2022",
    description: "Featured artist at this international art fair, presenting a series of works exploring themes of nature and transformation. The exhibition attracted collectors and art enthusiasts from around the world.",
    imagePath: "/static/images/gallery/SlugTrail.jpeg"
  },
  {
    id: 5,
    title: "Emerging Artists Showcase",
    venue: "Tate Modern, London",
    date: "May 2022",
    description: "Selected for this special showcase highlighting the work of promising emerging artists. The exhibition provided a platform for experimental approaches and innovative techniques.",
    imagePath: "/static/images/gallery/WiltedOrchidNo.1.jpeg"
  }
]

export default function ExhibitionsPage() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      {/* Header Section */}
      <div className="bg-teal-900 bg-opacity-90 min-h-screen flex items-center justify-center relative">
        <div className="text-center text-white px-4">
          <h1 className="text-6xl font-bold drop-shadow-lg mb-6">
            Exhibitions
          </h1>
          <p className="text-xl drop-shadow-md max-w-3xl mx-auto">
            A journey through my artistic career, featuring solo and group exhibitions across galleries and art spaces.
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white text-center">
          <p className="mb-2">Scroll to explore</p>
          <div className="animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Timeline Content */}
      <div className="bg-white py-20">
        <ExhibitionTimeline exhibitions={exhibitions} />
      </div>
    </div>
  )
}
