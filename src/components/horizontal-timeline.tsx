"use client"

import { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TimelineEvent {
  time: string
  title: string
  subtitle?: string
}

const timelineData: TimelineEvent[] = [
  {
    time: "06:00 مساءً",
    title: "افتتــاح المعـــرض",
  },
  {
    time: "06:20 مساءً",
    title: "القـــرآن الكريـــم",
    subtitle: "أواب بن هـلال الكنــدي",
  },
  {
    time: "06:25 مساءً",
    title: "كلمـة العائلـــة",
    subtitle: "الشيــخ هــلال بن علي الكنــدي",
  },
  {
    time: "06:35 مساءً",
    title: "كلمة الجمعية العمانية للكتاب والأدباء",
    subtitle: "م. سعيد بن محمــد الصقلاوي",
  },
  {
    time: "06:40 مساءً",
    title: "القصيـــدة الشعريـــة",
    subtitle: "الشيخ محمد بن عبدالله الخليلي",
  },
  {
    time: "06:45 مساءً",
    title: "عرض الفيلـــم الوثائقي",
  },
  {
    time: "07:00 مساءً",
    title: "الجلســـة العلمية الأولى",
  },
  {
    time: "07:45 مساءً",
    title: "الأوبريت الإنشادي",
    subtitle: "يوسف الكندي، منيب الكندي، محمد الوهيبي، بدر الحارثي",
  },
  {
    time: "08:00 مساءً",
    title: "الجلســـة العلمية الثانية",
  },
  {
    time: "09:00 مساءً",
    title: "التكريــــــم والختام",
  },
]

// Threshold for accumulated scroll delta before triggering slide change
const SCROLL_THRESHOLD = 150
const TOUCH_THRESHOLD = 50

const TimelineSchedule = () => {
  const scrollContainerRef = useRef<HTMLUListElement>(null)
  const accumulatedDeltaRef = useRef(0)
  const lastDirectionRef = useRef<'up' | 'down' | null>(null)
  const touchStartYRef = useRef(0)
  const [allowFullpageScroll, setAllowFullpageScroll] = useState(false)

  const handleWheel = useCallback((e: WheelEvent) => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const isAtTop = scrollTop <= 0
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
    const direction = e.deltaY > 0 ? 'down' : 'up'

    // Reset accumulated delta if direction changes
    if (lastDirectionRef.current !== direction) {
      accumulatedDeltaRef.current = 0
      lastDirectionRef.current = direction
    }

    // If at edge and scrolling in that direction
    if ((direction === 'down' && isAtBottom) || (direction === 'up' && isAtTop)) {
      accumulatedDeltaRef.current += Math.abs(e.deltaY)

      // If accumulated enough scroll attempts, allow fullpage to take over
      if (accumulatedDeltaRef.current >= SCROLL_THRESHOLD) {
        setAllowFullpageScroll(true)
        // Don't stop propagation - let fullpage handle it
        return
      }
    } else {
      // Reset when not at edge
      accumulatedDeltaRef.current = 0
      setAllowFullpageScroll(false)
    }

    // Prevent fullpage scroll while scrolling within the container
    if (!allowFullpageScroll) {
      if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
        e.stopPropagation()
      }
    }
  }, [allowFullpageScroll])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY
    accumulatedDeltaRef.current = 0
  }, [])

  const handleTouchEnd = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const isAtTop = scrollTop <= 0
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

    // If accumulated enough and at edge, trigger fullpage navigation
    if (accumulatedDeltaRef.current >= TOUCH_THRESHOLD) {
      // Access fullpage API from window
      const fullpageApi = (window as unknown as { fullpage_api?: { moveSectionDown: () => void; moveSectionUp: () => void } }).fullpage_api
      if (fullpageApi) {
        if (lastDirectionRef.current === 'down' && isAtBottom) {
          fullpageApi.moveSectionDown()
        } else if (lastDirectionRef.current === 'up' && isAtTop) {
          fullpageApi.moveSectionUp()
        }
      }
    }

    // Reset
    accumulatedDeltaRef.current = 0
    lastDirectionRef.current = null
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const container = scrollContainerRef.current
    if (!container) return

    const touchY = e.touches[0].clientY
    const deltaY = touchStartYRef.current - touchY
    const direction = deltaY > 0 ? 'down' : 'up'

    const { scrollTop, scrollHeight, clientHeight } = container
    const isAtTop = scrollTop <= 0
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

    // Reset accumulated delta if direction changes
    if (lastDirectionRef.current !== direction) {
      accumulatedDeltaRef.current = 0
      lastDirectionRef.current = direction
    }

    // If at edge and scrolling in that direction, accumulate
    if ((direction === 'down' && isAtBottom) || (direction === 'up' && isAtTop)) {
      accumulatedDeltaRef.current += Math.abs(deltaY)
    }

    // Update touch start for next move calculation
    touchStartYRef.current = touchY
  }, [])

  // Reset allowFullpageScroll after a short delay when user stops scrolling
  useEffect(() => {
    if (allowFullpageScroll) {
      const timer = setTimeout(() => {
        setAllowFullpageScroll(false)
        accumulatedDeltaRef.current = 0
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [allowFullpageScroll])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <div className="h-dvh bg-mud relative overflow-hidden flex flex-col items-center pt-20 pb-12 px-4">
      {/* Background Image */}
      <Image
        src="/mud-bg.webp"
        alt=""
        fill
        className="object-cover object-[center_15%] z-0"
        priority
      />

      {/* Header - Fixed */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 z-10"
      >
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-3xl md:text-5xl font-black text-sand">
            برنامـــج النـــدوة
          </h1>
        </div>
      </motion.div>

      {/* Timeline List - Scrollable */}
      <motion.ul
        ref={scrollContainerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-3xl space-y-0 overflow-y-auto overflow-x-hidden z-10 timeline-scroll-container"
        dir="rtl"
      >
        {timelineData.map((event, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="relative"
          >
            {/* Content Row */}
            <div className="flex items-start justify-between py-3 md:py-4 gap-4">
              {/* Right side - Title and subtitle */}
              <div className="flex-1 text-right">
                <h3 className="text-lg md:text-2xl font-bold text-sand leading-tight">
                  {event.title}
                </h3>
                {event.subtitle && (
                  <p className="text-sm md:text-lg text-sand">
                    {event.subtitle}
                  </p>
                )}
              </div>

              {/* Left side - Time */}
              <div className="text-left">
                <span className="text-base md:text-xl font-semibold text-sand">
                  {event.time}
                </span>
              </div>
            </div>

            {index < timelineData.length - 1 && (
              <div className="relative h-[2.5px] w-full flex items-center">
                {/* Right semi-oval arc (pointing left) */}
                <div className="w-1.5 h-3 md:w-2 md:h-4 bg-sand rounded-r-full flex-shrink-0" />
                {/* Main line */}
                <div className="flex-1 h-[2.5px] bg-sand" />
                {/* Left semi-oval arc (pointing right) */}
                <div className="w-1.5 h-3 md:w-2 md:h-4 bg-sand rounded-l-full flex-shrink-0" />
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

export default TimelineSchedule
