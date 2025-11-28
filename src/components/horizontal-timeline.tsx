"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Download, Users, MicVocal, FileText } from 'lucide-react'

interface TimelineSlide {
  time: string
  title: string
  duration: string
  description: string
  details?: string[]
  links?: { text: string; url: string }[]
  performers?: { name: string; role: string }[]
}

// Custom images for specific slides (0-indexed)
const slideImages: { [key: number]: string } = {
  0: "/quran.png",          // Slide 1: القرآن الكريم
  2: "/book-club-logo.png", // Slide 3: كلمة الجمعية
  5: "/camera.png",         // Slide 6: الفلم الوثائقي
  6: "/men-sitting.png",    // Slide 7: الجلسة العلمية الأولى
  8: "/men-sitting.png",    // Slide 9: الجلسة العلمية الثانية
}

const getSlideImage = (slideIndex: number): string => {
  return slideImages[slideIndex] || `/timeline/${slideIndex + 1}.png`
}

const timelineData: TimelineSlide[] = [
  {
    time: "6:00 مساءً",
    duration: "5 دقائق",
    title: "القرآن الكريم",
    description: "افتتاح الندوة بتلاوة عطرة من القرآن الكريم، تبركاً وطلباً للتوفيق والسداد في هذا المحفل العلمي المبارك. يتلو القرآن الكريم حفيد الشيخ: أواب بن هلال بن علي بن سليمان الكندي."
  },
  {
    time: "",
    duration: "5 دقائق",
    title: "كلمة العائلة",
    description: "كلمة ترحيبية من عائلة الشيخ سليمان الكندي، تعبر عن امتنانهم لإقامة هذه الندوة وتقديرهم للباحثين."
  },
  {
    time: "",
    duration: "5 دقائق",
    title: "كلمة الجمعية",
    description: "كلمة ترحيبية من الجمعية العمانية للكتاب والأدباء، تسلط الضوء على أهمية توثيق تراث الأعلام العمانيين."
  },
  {
    time: "",
    duration: "5 دقائق",
    title: "القصيدة الشعرية",
    description: "إلقاء قصيدة شعرية مؤثرة من تأليف الشيخ سليمان الكندي أو قصيدة في رثائه.",
  },
  {
    time: "",
    duration: "10 دقائق",
    title: "الأوبريت",
    description: "عرض فني راقٍ يتضمن إلقاء وإنشاد لأبيات من قصائد الشيخ سليمان الكندي.",
    performers: [
      { name: "يوسف الكندي", role: "إنشاد" },
      { name: "منيب الكندي", role: "إنشاد" },
      { name: "بدر الحارثي", role: "إنشاد" },
      { name: "محمد الوهيبي", role: "إنشاد" },
      { name: "هلال الشيادي", role: "إشراف عام" },
      { name: "سليمان الراشدي", role: "إخراج" }
    ],
    details: ["شركة الوطن - الإنتاج والتنظيم"],
    links: [
      { text: "تحميل الأبيات الشعرية", url: "/abyat.pdf" }
    ]
  },
  {
    time: "",
    duration: "10 دقائق",
    title: "الفلم الوثائقي",
    description: "عرض فيلم وثائقي قصير عن حياة الشيخ سليمان الكندي، يسلط الضوء على أبرز محطات حياته العلمية."
  },
  {
    time: "",
    duration: "ساعة",
    title: "الجلسة العلمية الأولى",
    description: "جلسة بحثية متخصصة تناقش مختلف جوانب حياة وإرث الشيخ سليمان الكندي ",
    links: [
      { text: "قاضياً وفقيهاً", url: "/research/sheikh-sulaiman-judge-faqih" },
      { text: "التكوين والإنجاز", url: "/research/formation-achievement" },
      { text: "الأنماط البنائية والدلالية", url: "/research/structural-semantic-patterns" }
    ]
  },
  {
    time: "",
    duration: "10 دقائق",
    title: "التكريم والختام",
    description: "حفل ختام الندوة يتضمن تكريم الباحثين والمشاركين، وتقديم الشهادات والدروع التذكارية."
  },
  {
    time: "",
    duration: "ساعة",
    title: "الجلسة العلمية الثانية",
    description: "تكملة الجلسات البحثية مع التركيز على الجوانب الأدبية والاجتماعية من حياة الشيخ سليمان الكندي.",
    links: [
      { text: "الحجاج في الأحكام القضائية", url: "/research/argumentation-judicial-rulings" },
      { text: "رسائل وقصائد: دراسة فنية", url: "/research/letters-poems-artistic-study" },
      { text: "المنهج التربوي", url: "/research/educational-methodology" }
    ]
  }
]

interface HorizontalTimelineProps {
  currentSlide: number
  onSlideChange: (slide: number) => void
}

const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ currentSlide }) => {
  const currentData = timelineData[currentSlide]

  if (!currentData) return null

  return (
    <div className="h-dvh bg-gradient-to-br from-sand via-[#F5E6D3] to-[#E8D4B0] relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="h-full w-full flex items-center justify-center relative px-8"
      >
        {/* Main Content */}
        <div className={`grid gap-8 lg:gap-16 max-w-7xl mx-auto h-full items-center ${currentSlide === 4 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>

          {/* Image Section - Hidden for Operetta slide */}
          {currentSlide !== 4 && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex justify-center lg:justify-end order-2 lg:order-1"
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -15, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <motion.div
                  className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={getSlideImage(currentSlide)}
                    alt={currentData.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-[#BF965A] rounded-full opacity-30"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-mud rounded-full opacity-30"
                  animate={{
                    scale: [1, 0.8, 1],
                    rotate: [360, 180, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Text Section */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-right order-1 lg:order-2 space-y-6"
            dir="rtl"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap items-center gap-2 md:gap-3 pt-10"
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-mud leading-tight">
                {currentData.title}
              </h2>
              {currentData.time && (
                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white px-2 md:px-6 pt-1.5 pb-1 md:py-3 rounded-2xl shadow-lg bg-mud">
                  {currentData.time}
                </div>
              )}
              <div className="text-sm md:text-lg lg:text-xl font-semibold text-mud px-2 md:px-4 pt-1.5 pb-1 md:py-3 rounded-2xl bg-white/70 backdrop-blur-sm">
                {currentData.duration}
              </div>
            </motion.div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-lg md:text-xl lg:text-2xl text-[#5A5A5A] leading-relaxed font-medium"
            >
              {currentData.description}
            </motion.p>

            {/* Performers Section for Operetta */}
            {currentData.performers && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg md:text-xl font-bold text-mud mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  المشاركون
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentData.performers.map((performer, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <MicVocal className="w-4 h-4 text-[#BF965A]" />
                      <div>
                        <p className="text-sm md:text-md font-semibold text-gray-800">{performer.name}</p>
                        <p className="text-xs md:text-sm text-gray-600">{performer.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {currentData.details && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    {currentData.details.map((detail, index) => (
                      <p key={index} className="text-sm md:text-lg text-gray-700">{detail}</p>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* Research Links for Academic Sessions */}
            {currentData.links && (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="space-y-3"
              >
                <h3 className="hidden md:flex text-base md:text-lg font-bold text-mud items-center gap-2">
                  <FileText className="w-5 h-5" />
                  الأبحاث والوثائق
                </h3>
                <div className="flex flex-wrap gap-1 md:gap-3">
                  {currentData.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-mud text-sand rounded-lg hover:bg-mud/90 transition-colors text-sm md:text-lg font-medium"
                    >
                      <Download className="w-4 h-4" />
                      {link.text}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Slide Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="absolute top-5 left-4 bg-white/80 backdrop-blur-md rounded-full px-2 pt-1.5 pb-1 text-mud font-bold text-sm md:text-base"
        >
          {timelineData.length} / {currentSlide + 1}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-[#BF965A] to-mud"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: ((currentSlide + 1) / timelineData.length) }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            transformOrigin: 'left',
            width: '100%'
          }}
        />
      </motion.div>
    </div>
  )
}

export default HorizontalTimeline
