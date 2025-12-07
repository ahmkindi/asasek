"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

// --- Props for the component ---
interface LoadingHeroProps {
  showScrollIndicator: boolean;
  onScrollDown?: () => void;
}

// --- Isolated AnimatedLogo component, now inside our reusable component ---
const AnimatedLogo = () => {
  const [currentLogo, setCurrentLogo] = useState(1)

  useEffect(() => {
    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev === 1 ? 2 : 1))
    }, 3000)

    return () => {
      clearInterval(logoInterval)
    }
  }, [])

  return (
    <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] mb-8">
      <Image
        src="/top-logo-text.png"
        alt="Loading Logo 1"
        width={300}
        height={300}
        className={`absolute inset-0 transition-opacity duration-1000 w-full h-full ${currentLogo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        priority
      />
      <Image
        src="/top-logo-face.png"
        alt="Loading Logo 2"
        width={300}
        height={300}
        className={`absolute inset-0 transition-opacity duration-1000 w-full h-full ${currentLogo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        priority
      />
    </div>
  )
}


// --- The main reusable component ---
export default function LoadingHero({ showScrollIndicator, onScrollDown }: LoadingHeroProps) {
  return (
    <div className="h-dvh text-sand flex flex-col items-center justify-center relative bg-mud overflow-hidden">
      {/* Background Image */}
      <Image
        src="/mud-bg.webp"
        alt=""
        fill
        className="object-cover object-[center_15%] z-0"
        priority
      />

      {/* Veil ribbon tilted */}
      <div className="absolute top-4 lg:top-0 left-0 z-[1] lg:-rotate-[20deg] origin-bottom-left">
        <Image
          src="/veil-l-r.png"
          alt=""
          width={1920}
          height={200}
          className="h-auto"
          priority
        />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center z-10">
        <AnimatedLogo />
        <h1 className="text-3xl md:text-5xl text-[#D9A566] pb-2 md:mt-8">
          نــــدوة الشيــــخ العلامــــة
        </h1>
        <div>
          <Image
            src="/signature.png"
            alt="سليمان"
            width={300}
            height={167}
            className="w-[240px] h-auto md:w-[360px]"
            priority
          />
        </div>
      </div>

      {/* --- Conditionally render the scroll down indicator --- */}
      {showScrollIndicator && (
        <div
          className="absolute bottom-10 animate-bounce cursor-pointer p-4 z-10"
          onClick={onScrollDown}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
