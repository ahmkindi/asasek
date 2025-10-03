"use client"

import { useEffect, useState, useCallback } from "react"
import HorizontalTimeline from "@/components/horizontal-timeline"
import ReactFullpage, { fullpageApi, Item } from '@fullpage/react-fullpage'
import { usePathname } from "next/navigation"
import LoadingHero from "@/components/LoadingHero"
import '../static/fullpage.scrollHorizontally.min';

const pluginWrapper = () => { };

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
    <div className="h-screen bg-mud from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-sand mb-4">خريطــــة النــــدوة</h2>
        <p className="text-2xl text-[#D9A566]">هنا صورة توضح تقسيم القلعة ومواقع المعارض المصاحبة والمسرح</p>
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
  const [fullpageApi, setFullpageApi] = useState<fullpageApi | null>(null);

  const handleScrollDown = useCallback(() => {
    if (fullpageApi) {
      fullpageApi.moveSectionDown();
    }
  }, [fullpageApi]);

  const handleGoToTimeline = useCallback(() => {
    if (fullpageApi) {
      fullpageApi.moveTo(3); // Corresponds to the 'timeline' anchor
    }
  }, [fullpageApi]);

  // --- NEW: Callback to control navbar visibility ---
  const handleOnLeave = (destination: Item) => {
    if (destination.anchor === 'hero') {
      document.body.classList.add('is-hero-section');
    } else {
      document.body.classList.remove('is-hero-section');
    }
  };

  // --- NEW: Effect to set initial state and cleanup ---
  useEffect(() => {
    // On component mount, hide the navbar if we are on the hero section
    document.body.classList.add('is-hero-section');

    // On component unmount, remove the class to avoid affecting other pages
    return () => {
      document.body.classList.remove('is-hero-section');
    };
  }, []);
  const pathname = usePathname();

  useEffect(() => {
    if (fullpageApi) {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // The moveTo method can accept the anchor string directly
        fullpageApi.moveTo(hash);
      }
    }
  }, [fullpageApi, pathname]);

  return (
    <ReactFullpage
      pluginWrapper={pluginWrapper}
      licenseKey={process.env.NEXT_PUBLIC_FULLPAGE_LICENSE_KEY}
      scrollingSpeed={1000}
      scrollHorizontally={true}
      scrollHorizontallyKey={process.env.NEXT_PUBLIC_FULLPAGE_SCROLL_HORIZONTALLY_KEY}
      credits={{ enabled: false }}
      navigation={true}
      controlArrows={false}
      navigationPosition='right'
      navigationTooltips={['الرئيسية', 'المقدمة', 'جدول الندوة', 'الوثائق']}
      anchors={['hero', 'about', 'timeline', 'documents-section']}
      onLeave={(_, destination) => handleOnLeave(destination)}
      render={({ fullpageApi: api }) => {
        if (api && !fullpageApi) {
          setFullpageApi(api);
        }
        return (
          <ReactFullpage.Wrapper>
            <div className="section">
              <LoadingHero
                showScrollIndicator={true}
                onScrollDown={handleScrollDown}
              />
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
        );
      }}
    />
  );
};

export default HomePage
