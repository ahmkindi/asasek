"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

// Get the target date - next Friday at 6pm Oman time (GMT+4)
function getNextFriday6pm(): Date {
  const now = new Date()
  const omanOffset = 4 * 60 // Oman is GMT+4
  const localOffset = now.getTimezoneOffset()
  const totalOffset = (omanOffset + localOffset) * 60 * 1000

  // Get current time in Oman
  const omanNow = new Date(now.getTime() + totalOffset)

  // Find next Friday
  const daysUntilFriday = (5 - omanNow.getDay() + 7) % 7
  const nextFriday = new Date(omanNow)

  // If today is Friday and it's before 6pm, use today
  if (daysUntilFriday === 0 && omanNow.getHours() < 18) {
    nextFriday.setHours(18, 0, 0, 0)
  } else if (daysUntilFriday === 0 && omanNow.getHours() >= 18) {
    // If it's Friday after 6pm, next Friday is 7 days away
    nextFriday.setDate(nextFriday.getDate() + 7)
    nextFriday.setHours(18, 0, 0, 0)
  } else {
    nextFriday.setDate(nextFriday.getDate() + daysUntilFriday)
    nextFriday.setHours(18, 0, 0, 0)
  }

  // Convert back to local time
  return new Date(nextFriday.getTime() - totalOffset)
}

// Check if we're past the target time
function isPastTarget(targetDate: Date): boolean {
  return new Date() >= targetDate
}

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 }
  }

  // Total hours (including days)
  const totalHours = Math.floor(difference / (1000 * 60 * 60))

  return {
    hours: totalHours,
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export default function LivePage() {
  const [targetDate] = useState(() => getNextFriday6pm())
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })
  const [isLive, setIsLive] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Get YouTube URL from environment variable
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_LIVE_URL

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft(targetDate))
    setIsLive(isPastTarget(targetDate))

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate)
      setTimeLeft(newTimeLeft)
      setIsLive(isPastTarget(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  // Extract YouTube video ID from URL
  const getYoutubeEmbedUrl = (url: string): string => {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1`
    }
    // If it's already an embed URL or live URL
    if (url.includes('/embed/') || url.includes('/live/')) {
      return url
    }
    return url
  }

  if (!mounted) {
    return (
      <div className="inverted-nav relative min-h-screen bg-mud overflow-hidden" dir="rtl">
        <Image
          src="/mud-bg.webp"
          alt=""
          fill
          className="object-cover object-[center_15%] z-0"
          priority
        />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-sand text-2xl">جاري التحميل...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="inverted-nav relative min-h-screen bg-mud overflow-hidden" dir="rtl">
      {/* Background Image */}
      <Image
        src="/mud-bg.webp"
        alt=""
        fill
        className="object-cover object-[center_15%] z-0"
        priority
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-sand mb-8 text-center">
          البـــــث المباشـــــر
        </h1>

        {isLive ? (
          // Show YouTube embed or "starting soon" message
          youtubeUrl ? (
            <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border-4 border-sand">
              <iframe
                src={getYoutubeEmbedUrl(youtubeUrl)}
                title="البث المباشر"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-3xl md:text-5xl font-bold text-sand mb-4">
                البـــــث سيبـــــدأ قريبـــــاً
              </p>
              <p className="text-xl md:text-2xl text-sand">
                تابعونا هنا أولاً
              </p>
            </div>
          )
        ) : (
          // Show countdown
          <div className="text-center">
            <p className="text-2xl md:text-4xl text-sand mb-8">
              ترقـــــبوا انطـــــلاق ندوة الشيخ سليـــــمان بن علي الكندي
            </p>
            <p className="text-2xl md:text-4xl text-sand mb-8">
              إرث سليـــــمان
            </p>

            <div className="flex justify-center items-center gap-2 md:gap-4" dir="ltr">
              <span className="text-6xl md:text-9xl font-bold text-sand w-16 md:w-32 text-center tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-6xl md:text-9xl font-bold text-sand">:</span>
              <span className="text-6xl md:text-9xl font-bold text-sand w-16  md:w-32 text-center tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-6xl md:text-9xl font-bold text-sand">:</span>
              <span className="text-6xl md:text-9xl font-bold text-sand w-16  md:w-32 text-center tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            <p className="text-xl md:text-2xl text-sand mt-12">
              الجمعة ١٢ ديسمبر ٢٠٢٥ - الساعة ٦:٠٠ مساءً
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
