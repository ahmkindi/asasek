"use client"

import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import HorizontalTimeline from "@/components/horizontal-timeline"
import ReactFullpage from '@fullpage/react-fullpage'

// Plugin wrapper for scrollHorizontally extension
const pluginWrapper = () => {
  require('../static/fullpage.scrollHorizontally.min');
};

// Isolated AnimatedLogo component - handles its own state without affecting parent
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
    <div className="relative w-[300px] h-[300px] mb-8">
      <Image
        src="/top-logo-text.png"
        alt="Loading Logo 1"
        width={300}
        height={300}
        className={`absolute inset-0 transition-opacity duration-1000 ${currentLogo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        priority
      />
      <Image
        src="/top-logo-face.png"
        alt="Loading Logo 2"
        width={300}
        height={300}
        className={`absolute inset-0 transition-opacity duration-1000 ${currentLogo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        priority
      />
    </div>
  )
}

// Hero Section Component
const HeroSection = ({ onScrollDown }: { onScrollDown: () => void }) => {
  return (
    <div className="h-screen text-sand flex flex-col items-center justify-center relative">
      <div className="flex-grow flex flex-col items-center justify-center">
        {/* Isolated animated logo component */}
        <AnimatedLogo />

        <h1 className="text-5xl text-[#D9A566] pb-2 mt-8">
          نــــدوة الشيــــخ العلامــــة
        </h1>
        <div>
          <Image
            src="/signature.png"
            alt="سليمان"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>

      {/* Scroll Down Indicator - now with working click handler */}
      <div
        className="absolute bottom-10 animate-bounce cursor-pointer p-4"
        onClick={onScrollDown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
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
    </div>
  )
}

// About Section Component
const AboutSection = ({ onTimelineClick }: { onTimelineClick: () => void }) => {
  return (
    <div className="h-screen relative flex items-center justify-start overflow-hidden">
      <div className="w-full z-20 h-full absolute bg-gradient-to-r from-[#D9A566] to-transparent" />
      <div className="absolute z-30 h-full w-full md:w-1/2 lg:w-2/5 xl:w-1/3 p-8 flex items-center left-0">
        <div className="text-mud space-y-4 max-w-lg">
          <h2 className="text-7xl font-black">المــــقدمة</h2>
          <p className="text-2xl font-semibold leading-relaxed">
            سعيًا نحو توثيق سيرة الشيخ سليمان بن علي الكندي،
            وتخليدًا لإسهاماته الاجتماعية والإصلاحية، تأتي هذه الندوة
            كمنصة علمية تسهم في جمع وتوثيق إرثه الفكري والعلمي.
            توزيع مجالات البحث بين الباحثين سيساعد على إثراء النقاش
            وفتح آفاق بحثية جديدة، لضمان تحقيق مستوى يليق بهذه
            الشخصية الفريدة.
          </p>
          <div
            className="mt-6 text-2xl inline-block bg-mud text-sand px-6 py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors cursor-pointer"
            onClick={onTimelineClick}
          >
            جدوــــل الندوة
          </div>
        </div>
      </div>
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/bg-video.webm" type="video/webm" />
      </video>
    </div>
  )
}

// Documents Section Component
const DocumentsSection = () => {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">قسم الوثائق</h2>
        <p className="text-2xl text-gray-600">مجموعة نادرة من الوثائق والمخطوطات</p>
      </div>
    </div>
  )
}

// Timeline Slides Component
const TimelineSlides = () => {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
        <div key={index} className="slide">
          <HorizontalTimeline currentSlide={index} onSlideChange={() => { }} />
        </div>
      ))}
    </>
  )
}

// Main HomePage Component
const HomePage = () => {
  const [fullpageApi, setFullpageApi] = useState<any>(null)

  // Navigation handlers
  const handleScrollDown = useCallback(() => {
    if (fullpageApi) {
      fullpageApi.moveSectionDown()
    }
  }, [fullpageApi])

  const handleGoToTimeline = useCallback(() => {
    if (fullpageApi) {
      // Move to section 3 (index starts at 1 in fullpage.js)
      fullpageApi.moveTo(3)
    }
  }, [fullpageApi])

  return (
    <ReactFullpage
      pluginWrapper={pluginWrapper}
      licenseKey={process.env.NEXT_PUBLIC_FULLPAGE_LICENSE_KEY}
      scrollingSpeed={1000}
      scrollHorizontally={true}
      scrollHorizontallyKey={process.env.NEXT_PUBLIC_FULLPAGE_SCROLL_HORIZONTALLY_KEY}
      credits={{ enabled: false }}
      navigation={true}
      navigationPosition='right'
      navigationTooltips={['الرئيسية', 'المقدمة', 'جدول الندوة', 'الوثائق']}
      showActiveTooltip={true}
      render={({ state, fullpageApi: api }) => {
        // Store the API reference when it becomes available
        if (api && !fullpageApi) {
          setFullpageApi(api)
        }
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <HeroSection onScrollDown={handleScrollDown} />
            </div>

            <div className="section">
              <AboutSection onTimelineClick={handleGoToTimeline} />
            </div>

            <div className="section">
              <TimelineSlides />
            </div>

            <div className="section">
              <DocumentsSection />
            </div>
          </ReactFullpage.Wrapper>
        )
      }}
    />
  )
}

export default HomePage
