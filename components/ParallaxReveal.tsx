'use client'

import Image from 'next/image'

interface ParallaxRevealProps {
  backgroundImage: string
  children: React.ReactNode
}

export default function ParallaxReveal({ backgroundImage, children }: ParallaxRevealProps) {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background - always visible and stays in place */}
      <div className="fixed inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Content that scrolls over the fixed background */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
