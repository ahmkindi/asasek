"use client"

import { useEffect, useState, useCallback } from "react"
import TimelineSchedule from "@/components/horizontal-timeline"
import ReactFullpage, { fullpageApi, Item } from '@fullpage/react-fullpage'
import { usePathname } from "next/navigation"
import LoadingHero from "@/components/LoadingHero"
import { BookOpen } from "lucide-react"
import OrderFormModal from "@/components/OrderFormModal"
import Image from "next/image"

const pluginWrapper = () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../static/fullpage.scrollHorizontally.min');
};

const AboutSection = ({ onTimelineClick, onOrderClick, hideOrderButton }: { onTimelineClick: () => void; onOrderClick: () => void; hideOrderButton: boolean }) => {
  return (
    <div className="h-dvh relative flex items-end md:items-center justify-center md:justify-start overflow-hidden">
      <div className="w-full z-20 h-full absolute" />

      {/* Mobile: bottom-aligned, full-width banner | Desktop: left-aligned card */}
      <div className="absolute z-30 w-full md:w-1/2 lg:w-2/5 xl:w-1/3 md:h-full bottom-0 md:bottom-auto md:left-0 flex items-end md:items-center pb-4 md:pb-0 md:p-8">
        <div className="text-mud space-y-4 w-full md:max-w-lg">
          {/* Title - centered */}
          <h2 className="text-5xl md:text-7xl font-black text-center px-4 md:px-0">المــــقدمة</h2>

          {/* Banner - full width on mobile, rounded on desktop */}
          <p className="text-lg md:text-2xl font-semibold leading-relaxed bg-sand p-4 md:rounded-2xl text-justify">
            سعيًا نحو توثيق سيرة الشيخ سليمان بن علي الكندي،
            وتخليدًا لإسهاماته الاجتماعية والإصلاحية، تأتي هذه الندوة
            كمنصة علمية تسهم في جمع وتوثيق إرثه الفكري والعلمي.
            توزيع مجالات البحث بين الباحثين سيساعد على إثراء النقاش
            وفتح آفاق بحثية جديدة، لضمان تحقيق مستوى يليق بهذه
            الشخصية الفريدة.
          </p>

          {/* Buttons - centered on mobile, show only one */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2 px-4 md:px-0">
            {hideOrderButton ? (
              <div
                className="text-lg md:text-2xl inline-block bg-mud text-sand px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors cursor-pointer"
                onClick={onTimelineClick}
              >
                جدوــــل الندوة
              </div>
            ) : (
              <div
                className="text-lg md:text-2xl inline-flex items-center gap-2 bg-mud text-sand px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors cursor-pointer"
                onClick={onOrderClick}
              >
                <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
                <span>اطلب نسختك من الكتاب</span>
              </div>
            )}
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
    <div className="h-dvh bg-mud relative overflow-hidden flex flex-col items-center justify-center px-4">
      <Image
        src="/mud-bg.webp"
        alt=""
        fill
        className="object-cover object-[center_15%] z-0"
        priority
      />
      <div className="text-center z-10">
        <h2 className="text-3xl md:text-5xl xl:text-7xl font-bold text-sand mb-4">اضغـــط على التوقيـــع أعـــلاه للمـــزيد</h2>
        <p className="text-lg md:text-2xl xl:text-3xl text-sand">البحوث والوثائق</p>
      </div>
    </div>
  )
}


// Main HomePage Component
const HomePage = () => {
  const [fullpageApi, setFullpageApi] = useState<fullpageApi | null>(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Check if order button should be hidden
  const hideOrderButton = process.env.NEXT_PUBLIC_HIDE_ORDER_BUTTON === "true";

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

  const handleOrderClick = useCallback(() => {
    setIsOrderFormOpen(true);
  }, []);

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
    if (fullpageApi && window) {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // The moveTo method can accept the anchor string directly
        fullpageApi.moveTo(hash);
      }
    }
  }, [fullpageApi, pathname]);

  return (
    <>
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
        normalScrollElements=".timeline-scroll-container"
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
                <AboutSection onTimelineClick={handleGoToTimeline} onOrderClick={handleOrderClick} hideOrderButton={hideOrderButton} />
              </div>
              <div className="section">
                <TimelineSchedule />
              </div>
              <div className="section">
                <DocumentsSection />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />

      {/* Order Form Modal */}
      <OrderFormModal isOpen={isOrderFormOpen} onClose={() => setIsOrderFormOpen(false)} />
    </>
  );
};

export default HomePage
