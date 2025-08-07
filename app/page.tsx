'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Covered_By_Your_Grace } from 'next/font/google'
import FeaturedWork from '@/components/FeaturedWork'

const coveredByYourGrace = Covered_By_Your_Grace({
  weight: '400',
  subsets: ['latin'],
})

const sliderImages = [
  '/static/images/HomePageImage/Copy of IMG_2694.jpeg',
  '/static/images/HomePageImage/Copy of IMG_2698.jpeg',
  '/static/images/HomePageImage/Copy of IMG_2701.jpeg',
  '/static/images/HomePageImage/IMG_0756.jpg',
  '/static/images/HomePageImage/IMG_0758.jpg',
  '/static/images/HomePageImage/IMG_0762.jpg',
  '/static/images/HomePageImage/IMG_0766.JPG',
  '/static/images/HomePageImage/IMG_0767.JPG',
  '/static/images/HomePageImage/IMG_1052.jpg',
  '/static/images/HomePageImage/IMG_1054.jpg',
  '/static/images/HomePageImage/IMG_1055.jpg',
  '/static/images/HomePageImage/IMG_1059.jpg',
  '/static/images/HomePageImage/IMG_1081.JPG',
  '/static/images/HomePageImage/IMG_1093.jpg',
  '/static/images/HomePageImage/IMG_1362.jpg',
  '/static/images/HomePageImage/IMG_1391.JPG',
  '/static/images/HomePageImage/IMG_1392.JPG',
  '/static/images/HomePageImage/IMG_2323.jpg',
  '/static/images/HomePageImage/IMG_2324.jpg',
  '/static/images/HomePageImage/IMG_2326.JPG',
  '/static/images/HomePageImage/IMG_2327.JPG',
  '/static/images/HomePageImage/IMG_2653.jpeg',
  '/static/images/HomePageImage/IMG_2658.jpeg',
  '/static/images/HomePageImage/IMG_2662.jpeg',
  '/static/images/HomePageImage/IMG_2667.jpeg',
]

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  // Trigger header animation on scroll or click
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSliderVisible(true)
      }
    }

    const handleClick = () => {
      setIsSliderVisible(true)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
  }

  return (
    <div className="relative w-full">
      {/* Hero Section - Full Bleed */}
      <div className="relative w-full">
        {/* Break out of container completely */}
        <div className="absolute left-1/2 w-screen -translate-x-1/2 transform">
          <div className="relative min-h-screen w-full">
            {/* Full viewport width slider */}
            <div className="relative min-h-screen overflow-hidden" style={{ width: '100vw' }}>
              {sliderImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Aneira Working ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    quality={100}
                  />
                </div>
              ))}

              {/* Dark overlay when heading is centered */}
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-500 ease-out ${
                  isSliderVisible ? 'opacity-0' : 'opacity-30'
                }`}
              />

              {/* Top gradient shadow for text visibility */}
              <div className="absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-black/50 via-black/20 to-transparent" />

              {/* Animated Heading */}
              <div
                className={`absolute z-[60] transition-all duration-500 ease-out ${
                  isSliderVisible
                    ? 'top-6 left-8'
                    : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'
                }`}
              >
                <h1
                  className={`${coveredByYourGrace.className} ${
                    isSliderVisible ? 'text-5xl' : 'text-8xl'
                  } transition-all duration-500 ease-out`}
                  style={{ color: '#DED308' }}
                >
                  Aneira Thomas
                </h1>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-8 z-50 flex h-16 w-16 -translate-y-1/2 transform items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                style={{ color: '#DED308' }}
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-8 z-50 flex h-16 w-16 -translate-y-1/2 transform items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                style={{ color: '#DED308' }}
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Spacer to maintain layout */}
        <div className="h-screen"></div>
      </div>

      {/* Featured Work Section - Boxed Container */}
      <div className="bg-white">
        <FeaturedWork />
      </div>
    </div>
  )
}
