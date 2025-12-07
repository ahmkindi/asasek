"use client"

import { useRef, useEffect, useCallback } from 'react'
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
    title: "الأوبريت الشعري",
    subtitle: "يوسف الكندي، منيب الكندي، محمد الوهيبي، بدر الحارثي",
  },
  {
    time: "08:00 مساءً",
    title: "الجلســـة العلمية الثانية",
  },
  {
    time: "09:00 مساءً",
    title: "التكريـــــم",
  },
]

const TimelineSchedule = () => {
  const scrollContainerRef = useRef<HTMLUListElement>(null)

  const handleWheel = useCallback((e: WheelEvent) => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const isAtTop = scrollTop <= 0
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

    // If scrolling down and not at bottom, or scrolling up and not at top, prevent fullpage scroll
    if ((e.deltaY > 0 && !isAtBottom) || (e.deltaY < 0 && !isAtTop)) {
      e.stopPropagation()
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [handleWheel])

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
