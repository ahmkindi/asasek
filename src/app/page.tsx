"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";

const HomePage = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [currentLogo, setCurrentLogo] = useState(1);
  const [hideSignature, setHideSignature] = useState(false);

  useEffect(() => {
    // Logo Flashing Effect for the loader
    const logoInterval = setInterval(() => {
      setCurrentLogo((prev) => (prev === 1 ? 2 : 1));
    }, 3000);

    // Video Loading Logic
    const videoElement = document.getElementById('background-video') as HTMLVideoElement;
    const handleVideoLoad = () => {
      setIsPageLoaded(true);
    };

    if (videoElement) {
      if (videoElement.readyState >= 3) {
        handleVideoLoad();
      } else {
        videoElement.onloadeddata = () => handleVideoLoad();
      }
    }

    // Hide signature when scrolling past it
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Hide when scrolled more than 80% of viewport height
      setHideSignature(scrollPosition > windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(logoInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-500
                    ${isPageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="relative w-[300px] h-[300px] mb-[10.5rem]">
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
      </div>

      <div>
        {/* Hero Section */}
        <section
          id="hero"
          className="h-screen text-sand flex flex-col items-center justify-center relative"
        >
          <div className="flex-grow flex flex-col items-center justify-center">
            {/* Container for flashing logos */}
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
            <h1 className="text-5xl text-[#D9A566] pb-2 mt-8">
              نــــدوة الشيــــخ العلامــــة
            </h1>
            {/* Signature in Hero - This one fades out */}
            <div
              id="hero-signature"
              className={`transition-opacity duration-500 ${hideSignature ? 'opacity-0' : 'opacity-100'
                }`}
            >
              <Image
                src="/signature.png"
                alt="سليمان"
                width={300}
                height={300}
                priority
              />
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <Link
            href="#about"
            className="absolute bottom-10 animate-bounce cursor-pointer p-4"
            aria-label="Scroll to next section"
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
          </Link>
        </section>

        <section id="about" className="h-screen relative flex items-center justify-start overflow-hidden">
          <div className="w-full z-20 h-full absolute bg-gradient-to-r from-[#D9A566] to-transparent" />
          <div className="absolute z-30 h-full w-full md:w-1/2 lg:w-2/5 xl:w-1/3 p-8 flex items-center left-0">
            <div className="text-mud space-y-4 max-w-lg">
              <h2 className="text-7xl font-black">المــــقدمة</h2>
              <p className="text-2xl font-semibold leading-relaxed">سعيًانحوتوثيقسيرةالشيخسليمانبنعليالكندي،
                وتخليدًاإلسهاماتهاالجتماعيةواإلصالحية،تأتيهذهالندوة
                كمنصةعلميةتسهمفيجمعوتوثيقإرثهالفكريوالعلمي.
                توزيعمجاالتالبحثبينالباحثينسيساعدعلىإثراءالنقاش
                وفتحآفاقبحثيةجديدة،لضمانتحقيقمستوىيليقبهذه
                الشخصيةالفريدة.</p>
              <Link href="#timeline" className="mt-6 text-2xl inline-block bg-mud text-sand px-6 py-3 rounded-full font-semibold hover:bg-amber-900 transition-colors">
                جدوــــل الندوة
              </Link>
            </div>
          </div>
          <video id="background-video" className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline preload="auto">
            <source src="/bg-video.webm" type="video/webm" />
          </video>
        </section>

        <section
          id="timeline"
          className="h-screen bg-gray-100 flex items-center justify-center"
        >
          <h2 className="text-5xl font-bold text-gray-800">Timeline Section</h2>
        </section>

        <section
          id="documents"
          className="h-screen bg-gray-200 flex items-center justify-center"
        >
          <h2 className="text-5xl font-bold text-gray-800">Documents Section</h2>
        </section>
      </div>
    </>
  )
}

export default HomePage
