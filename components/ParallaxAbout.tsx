'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface ParallaxAboutProps {
  coveredByYourGrace: {
    className: string
  }
}

export default function ParallaxAbout({ coveredByYourGrace }: ParallaxAboutProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const layers = container.querySelectorAll('.parallax-layer')

    const handleScroll = () => {
      const scrollY = window.scrollY

      layers.forEach((layer) => {
        const depth = parseFloat(layer.getAttribute('data-depth') || '0')
        const translateY = scrollY * depth

        // Apply the transform
        ;(layer as HTMLElement).style.transform = `translateY(${translateY}px)`
      })
    }

    // Initial position
    handleScroll()

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      ref={containerRef}
      style={{ width: '100vw' }}
    >
      {/* Background layer */}
      <div className="parallax-layer absolute inset-0" data-depth="0.1">
        <div className="bg-opacity-60 absolute inset-0 bg-black"></div>
      </div>

      {/* Image layers */}
      <div className="parallax-layer absolute inset-0" data-depth="0.2">
        <div className="relative h-screen" style={{ width: '100vw' }}>
          <Image
            src="/static/images/AneiraWorking1.jpeg"
            alt="Aneira Working"
            className="object-cover object-center opacity-70"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className="parallax-layer absolute inset-0" data-depth="0.3">
        <div className="absolute top-[20%] right-[5%] h-[40%] w-[40%]">
          <Image
            src="/static/images/AneiraWorking2.jpeg"
            alt="Aneira Working"
            className="rounded-full object-cover opacity-60"
            fill
            sizes="40vw"
          />
        </div>
      </div>

      <div className="parallax-layer absolute inset-0" data-depth="0.4">
        <div className="absolute top-[60%] left-[5%] h-[30%] w-[30%]">
          <Image
            src="/static/images/AneiraWorking3.jpeg"
            alt="Aneira Working"
            className="rounded-full object-cover opacity-60"
            fill
            sizes="30vw"
          />
        </div>
      </div>

      <div className="parallax-layer absolute inset-0" data-depth="0.5">
        <div className="absolute top-[30%] left-[2%] h-[25%] w-[25%]">
          <Image
            src="/static/images/AneiraWorking4.jpeg"
            alt="Aneira Working"
            className="rounded-full object-cover opacity-60"
            fill
            sizes="25vw"
          />
        </div>
      </div>

      <div className="parallax-layer absolute inset-0" data-depth="0.6">
        <div className="absolute top-[70%] right-[10%] h-[20%] w-[20%]">
          <Image
            src="/static/images/AneiraWorking5.jpeg"
            alt="Aneira Working"
            className="rounded-full object-cover opacity-60"
            fill
            sizes="20vw"
          />
        </div>
      </div>

      <div className="parallax-layer absolute inset-0" data-depth="0.7">
        <div className="absolute top-[40%] right-[25%] h-[15%] w-[15%]">
          <Image
            src="/static/images/AneiraWorking6.jpeg"
            alt="Aneira Working"
            className="rounded-full object-cover opacity-60"
            fill
            sizes="15vw"
          />
        </div>
      </div>

      <div className="parallax-layer absolute inset-0" data-depth="0.8">
        <div className="absolute top-[20%] left-[35%] h-[10%] w-[10%]">
          <Image
            src="/static/images/AneiraWorking7.jpeg"
            alt="Aneira Working"
            className="rounded-full object-cover opacity-60"
            fill
            sizes="10vw"
          />
        </div>
      </div>

      {/* Content layer - moves slower than images */}
      <div
        className="parallax-layer absolute inset-0 flex items-center justify-center"
        data-depth="0.1"
      >
        <div className="z-10 w-full px-6 text-center">
          <h1
            className={`${coveredByYourGrace.className} mb-8 text-5xl drop-shadow-lg md:text-6xl`}
            style={{ color: '#DED308' }}
          >
            About Aneira
          </h1>
          <p
            className="mx-auto mb-12 max-w-4xl text-xl text-white drop-shadow-md"
            style={{ fontFamily: 'Menlo' }}
          >
            Artist, nature enthusiast, and creator of evocative visual experiences.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 transform flex-col items-center text-center"
        style={{ color: '#DED308' }}
      >
        <p className="mb-2" style={{ fontFamily: 'Menlo' }}>
          Scroll to explore
        </p>
        <div className="animate-bounce">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
