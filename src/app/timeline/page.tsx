"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Download, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

const TimelineItem = ({
  time,
  title,
  duration,
  children,
  id,
}: {
  time: string
  title: string
  duration: string
  children: React.ReactNode
  id: string
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div id={id} className="relative mb-16">
      <div className="flex items-start">
        {/* Time column */}
        <div className="flex-shrink-0 w-32 text-right mr-12">
          <div
            className="text-xl font-bold text-white px-4 py-2 rounded-lg shadow-sm"
            style={{ backgroundColor: "#76424E" }}
          >
            {time}
          </div>
          <div className="text-sm text-gray-600 mt-2 px-4">{duration}</div>
        </div>

        {/* Timeline dot */}
        <div className="flex-shrink-0 relative">
          <div
            className="w-6 h-6 rounded-full border-4 border-white shadow-lg z-10 relative"
            style={{ backgroundColor: "#BF965A" }}
          ></div>
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-300"></div>
        </div>

        {/* Content */}
        <div className="flex-1 mr-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
                >
                  {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </button>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-100 pt-6 animate-in slide-in-from-top-2 duration-300">
                  {children}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpeakerCard = ({
  name,
  title,
  image,
  research,
  quote,
  researchSlug,
}: {
  name: string
  title: string
  image: string
  research: string
  quote: string
  researchSlug: string
}) => (
  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-8 mb-6 border border-gray-200 hover:border-yellow-300 transition-all duration-300 hover:shadow-md">
    <div className="flex items-start gap-6 mb-6">
      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <div className="flex-1">
        <h4 className="text-xl font-bold text-gray-900 mb-2">{name}</h4>
        <p className="text-gray-600 mb-3">{title}</p>
        <h5 className="text-lg font-semibold text-gray-800 leading-relaxed">{research}</h5>
      </div>
    </div>

    <div className="mb-6">
      <blockquote className="text-gray-700 italic border-r-4 border-yellow-600 pr-6 mb-4 leading-relaxed text-lg">
        &quote;{quote}&quote;
      </blockquote>
    </div>

    <div className="flex gap-4">
      <a
        href={`/research/${researchSlug}`}
        className="inline-flex items-center px-6 py-3 text-white rounded-lg transition-colors hover:opacity-90 shadow-sm"
        style={{ backgroundColor: "#76424E" }}
      >
        <ExternalLink className="w-4 h-4 ml-2" />
        عرض البحث كاملاً
      </a>
      <a
        href={`/papers/${researchSlug}.pdf`}
        download
        className="inline-flex items-center px-6 py-3 border-2 rounded-lg transition-colors hover:bg-yellow-50"
        style={{ borderColor: "#BF965A", color: "#76424E" }}
      >
        <Download className="w-4 h-4 ml-2" />
        تحميل PDF
      </a>
    </div>
  </div>
)

const TimelinePage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const section = searchParams.get("section")
    if (section) {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [searchParams])

  const scrollToSection = (sectionId: string) => {
    router.push(`/timeline?section=${sectionId}`, { scroll: false })
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="w-20 h-1 mx-auto mb-8" style={{ backgroundColor: "#BF965A" }}></div>
          <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ color: "#76424E" }}>
            جدول أعمال الندوة
          </h1>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            برنامج مفصل لفعاليات ندوة إرث سليمان - الشيخ سليمان بن علي الكندي
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">الانتقال السريع</h3>
          <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { id: "quran-recitation", title: "تلاوة القرآن", time: "6:00" },
              { id: "family-speech", title: "كلمة العائلة", time: "6:05" },
              { id: "association-speech", title: "كلمة الجمعية", time: "6:10" },
              { id: "operetta", title: "الأوبريت", time: "6:15" },
              { id: "documentary", title: "الفيلم الوثائقي", time: "6:25" },
              { id: "first-session", title: "الجلسة الأولى", time: "6:30" },
              { id: "second-session", title: "الجلسة الثانية", time: "7:40" },
              { id: "closing-ceremony", title: "الختام", time: "8:40" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="p-4 text-center rounded-xl border border-gray-200 hover:border-yellow-600 hover:bg-yellow-50 transition-all duration-300 group"
              >
                <div className="text-sm font-bold text-gray-900 mb-1 group-hover:text-yellow-700">{item.title}</div>
                <div className="text-xs text-gray-600">{item.time}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Main vertical line */}
          <div
            className="absolute right-44 top-0 bottom-0 w-1 rounded-full"
            style={{ backgroundColor: "#BF965A", opacity: 0.3 }}
          ></div>

          <TimelineItem id="quran-recitation" time="6:00 م" title="تلاوة القرآن الكريم" duration="5 دقائق">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                افتتاح الندوة بتلاوة عطرة من القرآن الكريم، تبركاً وطلباً للتوفيق والسداد في هذا المحفل العلمي المبارك.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">القارئ: الشيخ محمد بن سالم الكندي</h4>
                <p className="text-gray-700 leading-relaxed">
                  من حفظة القرآن الكريم وأئمة المساجد في ولاية نخل، معروف بجمال صوته وإتقان التلاوة. حاصل على إجازة في
                  القراءات العشر من الأزهر الشريف.
                </p>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="family-speech" time="6:05 م" title="كلمة العائلة" duration="5 دقائق">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                كلمة ترحيبية من عائلة الشيخ سليمان الكندي، تعبر عن امتنانهم لإقامة هذه الندوة وتقديرهم للباحثين
                والمشاركين في إحياء ذكرى جدهم العالم.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">المتحدث: الأستاذ هلال بن حمد الكندي</h4>
                <p className="text-gray-700 leading-relaxed">
                  من أحفاد الشيخ سليمان الكندي، يعمل في مجال التعليم ومهتم بالتراث العماني والتاريخ المحلي. له عدة
                  مؤلفات في تاريخ ولاية نخل وأعلامها.
                </p>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="association-speech" time="6:10 م" title="كلمة الجمعية" duration="5 دقائق">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                كلمة ترحيبية من جمعية التراث العماني بولاية نخل، تسلط الضوء على أهمية توثيق تراث الأعلام العمانيين ودور
                الجمعية في الحفاظ على التراث المحلي.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">المتحدث: الأستاذ سالم بن محمد الكندي</h4>
                <p className="text-gray-700 leading-relaxed">
                  رئيس جمعية التراث العماني بولاية نخل، باحث في التاريخ المحلي ومؤلف عدة كتب عن تراث المنطقة. حاصل على
                  جائزة السلطان قابوس للثقافة والفنون والآداب.
                </p>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="operetta" time="6:15 م" title="الأوبريت الشعري" duration="10 دقائق">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                عرض فني راقٍ يتضمن إلقاء وإنشاد لبعض الأبيات الشعرية من قصائد الشيخ سليمان الكندي، بأداء مجموعة من
                الشعراء والمنشدين المحليين المتميزين.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">المشاركون في الأوبريت:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">الشاعر أحمد بن سعيد الكندي</h5>
                    <p className="text-sm text-gray-600">إلقاء شعري - متخصص في الشعر النبطي والفصيح</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-2">المنشد محمد بن علي الراشدي</h5>
                    <p className="text-sm text-gray-600">إنشاد تراثي - حاصل على عدة جوائز في المهرجانات المحلية</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg md:col-span-2">
                    <h5 className="font-semibold text-gray-800 mb-2">فرقة التراث الشعبي بنخل</h5>
                    <p className="text-sm text-gray-600">مصاحبة موسيقية تراثية بالآلات العمانية التقليدية</p>
                  </div>
                </div>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="documentary" time="6:25 م" title="الفيلم الوثائقي" duration="5 دقائق">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                عرض فيلم وثائقي قصير عن حياة الشيخ سليمان الكندي، يسلط الضوء على أبرز محطات حياته العلمية والعملية من
                خلال مقابلات مع المختصين وعرض الوثائق النادرة.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">فريق الإنتاج:</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1">المخرج</h5>
                    <p className="text-sm text-gray-600">عمر الكندي</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1">المنتج</h5>
                    <p className="text-sm text-gray-600">منير الراوحي</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-800 mb-1">كاتبة السيناريو</h5>
                    <p className="text-sm text-gray-600">نسيبة اليعربي</p>
                  </div>
                </div>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="first-session" time="6:30 م" title="الجلسة العلمية الأولى" duration="ساعة واحدة">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">رئيس الجلسة: الدكتور صالح المعمري</h4>
                <p className="text-gray-700 leading-relaxed">
                  أستاذ الدراسات الإسلامية بجامعة السلطان قابوس، متخصص في الفقه الإسلامي والقضاء الشرعي. له أكثر من 20
                  بحثاً منشوراً في المجلات العلمية المحكمة.
                </p>
              </div>

              <div className="space-y-8">
                <SpeakerCard
                  name="الشيخ د. عبدالله السيابي"
                  title="أستاذ الفقه والأصول - جامعة نزوى"
                  image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  research="الشيخ سليمان الكندي قاضياً وفقيهاً"
                  quote="لقد كان الشيخ سليمان الكندي نموذجاً فريداً في الجمع بين العلم والعمل، فقد طبق ما تعلمه من أحكام الفقه في قضائه بعدالة ونزاهة، وترك إرثاً قضائياً يُحتذى به في التعامل مع القضايا المعقدة بحكمة وبصيرة."
                  researchSlug="sheikh-sulaiman-judge-faqih"
                />

                <SpeakerCard
                  name="د. محمد حساني"
                  title="أستاذ علم الاجتماع - جامعة السلطان قابوس"
                  image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  research="الحياة الاجتماعية للشيخ سليمان الكندي"
                  quote="تميز الشيخ سليمان الكندي بقدرته على التفاعل مع مختلف طبقات المجتمع، فكان قريباً من الناس، يشاركهم أفراحهم وأحزانهم، ويسعى لحل مشاكلهم الاجتماعية بروح الأبوة والحكمة، مما جعله محبوباً ومحترماً من الجميع."
                  researchSlug="social-life-sheikh-sulaiman"
                />

                <SpeakerCard
                  name="د. محسن الكندي"
                  title="أستاذ الأدب العربي - كلية الآداب والعلوم الاجتماعية"
                  image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
                  research="دراسة في شعر الشيخ سليمان الكندي"
                  quote="شعر الشيخ سليمان الكندي يعكس عمق ثقافته وسعة اطلاعه، فقد نظم في مختلف الأغراض الشعرية بلغة فصيحة وأسلوب بليغ، وتميزت قصائده بالحكمة والموعظة الحسنة، مما يجعلها مدرسة أدبية قائمة بذاتها."
                  researchSlug="poetry-study-sheikh-sulaiman"
                />
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="break" time="7:30 م" title="استراحة وزيارة المعارض" duration="10 دقائق">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                استراحة قصيرة للحضور مع تقديم المرطبات والقهوة العمانية التقليدية، وفرصة ذهبية لزيارة المعارض المصاحبة
                والاطلاع على التراث النادر للشيخ.
              </p>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">المعارض المتاحة للزيارة:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h5 className="font-semibold text-gray-800 mb-2">معرض مقتنيات الشيخ الشخصية</h5>
                    <p className="text-sm text-gray-600">أدوات الكتابة، الملابس التراثية، والمتعلقات الشخصية</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h5 className="font-semibold text-gray-800 mb-2">المكتبة الفكرية</h5>
                    <p className="text-sm text-gray-600">مخطوطات وكتب الشيخ النادرة مع شروحاته الهامشية</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h5 className="font-semibold text-gray-800 mb-2">ركن الأوراق البحثية</h5>
                    <p className="text-sm text-gray-600">عرض تفاعلي للأبحاث المقدمة في الندوة</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-100">
                    <h5 className="font-semibold text-gray-800 mb-2">ركن مشروع أساسك التعليمي</h5>
                    <p className="text-sm text-gray-600">استمرار رسالة الشيخ التعليمية في العصر الحديث</p>
                  </div>
                </div>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="second-session" time="7:40 م" title="الجلسة العلمية الثانية" duration="ساعة واحدة">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-3 text-lg">رئيس الجلسة: الدكتور محمود السليمي</h4>
                <p className="text-gray-700 leading-relaxed">
                  أستاذ التاريخ الإسلامي بجامعة نزوى، متخصص في تاريخ عُمان الحديث والمعاصر. مؤلف كتاب أعلام عُمان في
                  القرن التاسع عشر الحائز على جائزة أفضل كتاب تاريخي.
                </p>
              </div>

              <div className="space-y-8">
                <SpeakerCard
                  name="د. عبدالرحمن طعمة"
                  title="أستاذ البلاغة والنقد - جامعة الشارقة"
                  image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
                  research="الحجاج في الأحكام القضائية للشيخ سليمان الكندي"
                  quote="تميزت أحكام الشيخ سليمان القضائية بقوة الحجة ووضوح البرهان، فقد كان يستخدم أساليب الحجاج البلاغية في إقناع المتخاصمين بعدالة الحكم، مما يعكس عمق فهمه لعلوم البلاغة وتطبيقها العملي في القضاء."
                  researchSlug="argumentation-judicial-rulings"
                />

                <SpeakerCard
                  name="د. خالد الكندي و د. أفلح الكندي"
                  title="أستاذ التاريخ - كلية التربية"
                  image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
                  research="الشيخ سليمان الكندي النشأة والتكوين"
                  quote="نشأ الشيخ سليمان في بيئة علمية محفزة، وتلقى تعليمه على يد كبار علماء عصره، مما شكل شخصيته العلمية والفكرية. وقد ساهمت ظروف نشأته في ولاية نخل وما تميزت به من تنوع ثقافي في إثراء تكوينه المعرفي."
                  researchSlug="upbringing-formation-sheikh-sulaiman"
                />

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200">
                  <h4 className="font-bold text-gray-900 mb-6 text-xl">الأوراق الإضافية - معرض البوسترات</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h5 className="font-bold text-gray-800 mb-3 text-lg">الأثر التربوي للشيخ سليمان الكندي</h5>
                      <p className="text-gray-600 mb-3">أ. تسنيم الكندية + أ. بصائر الكندية</p>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        دراسة تحليلية لمنهجية الشيخ في التعليم وأثرها على الأجيال المتعاقبة
                      </p>
                      <a href="/papers/educational-impact.pdf" className="text-blue-600 text-sm hover:underline">
                        تحميل البحث
                      </a>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <h5 className="font-bold text-gray-800 mb-3 text-lg">رسائل وقصائد الشيخ سليمان: دراسة فنية</h5>
                      <p className="text-gray-600 mb-3">أ. النضر الخنجري</p>
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                        تحليل أدبي وفني لمراسلات الشيخ وإنتاجه الشعري من منظور نقدي معاصر
                      </p>
                      <a
                        href="/papers/letters-poems-artistic-study.pdf"
                        className="text-blue-600 text-sm hover:underline"
                      >
                        تحميل البحث
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="closing-ceremony" time="8:40 م" title="التكريم والختام" duration="20 دقيقة">
            <div className="space-y-8">
              <p className="text-gray-700 leading-relaxed text-lg">
                حفل ختام الندوة يتضمن تكريم الباحثين والمشاركين، وتقديم الشهادات والدروع التذكارية، مع كلمة ختامية ملهمة
                من سعادة الشيخ أحمد بن سعود السيابي.
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-8 rounded-xl border border-yellow-200">
                <h4 className="font-bold text-gray-900 mb-6 text-xl">برنامج التكريم:</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl text-center shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-yellow-100">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">درع تذكاري</h5>
                    <p className="text-sm text-gray-600">يحمل شعار الندوة واسم الباحث مع تاريخ الفعالية</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-blue-100">
                      <span className="text-2xl">📜</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">شهادة مشاركة</h5>
                    <p className="text-sm text-gray-600">مختومة ومعتمدة من الجهات المنظمة للندوة</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl text-center shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-green-100">
                      <span className="text-2xl">💰</span>
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">مكافأة مالية</h5>
                    <p className="text-sm text-gray-600">150 ريال عماني لكل باحث مشارك</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-xl border border-purple-200">
                <h4 className="font-bold text-gray-900 mb-4 text-xl">المتحدث الرئيس</h4>
                <div className="flex items-center gap-6">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                    alt="الشيخ أحمد بن سعود السيابي"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h5 className="font-bold text-gray-900 mb-2 text-lg">سعادة الشيخ أحمد بن سعود السيابي</h5>
                    <p className="text-gray-700 leading-relaxed">
                      عضو مجلس الدولة، وأحد كبار علماء السلطنة، سيلقي كلمة ختامية عن أهمية توثيق تراث العلماء والمفكرين
                      العمانيين ودور الأجيال الجديدة في الحفاظ على هذا الإرث الثمين.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TimelineItem>
        </div>
      </div>
    </div>
  )
}

export default TimelinePage
