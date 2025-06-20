"use client"

import type React from "react"

import { useState } from "react"
import { Download, ChevronDown, ChevronUp } from "lucide-react"

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
    <div id={id} className="relative">
      <div className="flex items-start mb-8">
        <div className="flex-shrink-0 w-24 text-right mr-8">
          <div className="text-lg font-bold text-gray-900" style={{ fontFamily: "Amiri, serif" }}>
            {time}
          </div>
          <div className="text-sm text-gray-600" style={{ fontFamily: "Amiri, serif" }}>
            {duration}
          </div>
        </div>

        <div className="flex-shrink-0 w-4 h-4 rounded-full mt-2 mr-4" style={{ backgroundColor: "#BF965A" }}></div>

        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Amiri, serif" }}>
              {title}
            </h3>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>

          {isExpanded && <div className="border-t border-gray-100 pt-4">{children}</div>}
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
  downloadLink,
}: {
  name: string
  title: string
  image: string
  research: string
  quote: string
  downloadLink: string
}) => (
  <div className="bg-gray-50 rounded-lg p-6 mb-4">
    <div className="flex items-start gap-4 mb-4">
      <img
        src={image || "/placeholder.svg"}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
      />
      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-900 mb-1" style={{ fontFamily: "Amiri, serif" }}>
          {name}
        </h4>
        <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "Amiri, serif" }}>
          {title}
        </p>
        <h5 className="text-base font-semibold text-gray-800" style={{ fontFamily: "Amiri, serif" }}>
          {research}
        </h5>
      </div>
    </div>

    <div className="mb-4">
      <blockquote
        className="text-gray-700 italic border-r-4 border-yellow-600 pr-4 mb-3"
        style={{ fontFamily: "Amiri, serif" }}
      >
        &quot;{quote}&quot;
      </blockquote>
    </div>

    <a
      href={downloadLink}
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
      style={{ backgroundColor: "#76424E" }}
    >
      <Download className="w-4 h-4 ml-2" />
      تحميل البحث
    </a>
  </div>
)

const TimelinePage = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: "#BF965A" }}></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "Amiri, serif", color: "#76424E" }}>
            جدول أعمال الندوة
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: "Amiri, serif" }}>
            برنامج مفصل لفعاليات ندوة إرث سليمان - الشيخ سليمان بن علي الكندي
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute right-32 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          <TimelineItem id="quran-recitation" time="6:00 م" title="تلاوة القرآن الكريم" duration="5 دقائق">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Amiri, serif" }}>
                افتتاح الندوة بتلاوة عطرة من القرآن الكريم، تبركاً وطلباً للتوفيق والسداد في هذا المحفل العلمي المبارك.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  القارئ: الشيخ محمد بن سالم الكندي
                </h4>
                <p className="text-sm text-gray-700" style={{ fontFamily: "Amiri, serif" }}>
                  من حفظة القرآن الكريم وأئمة المساجد في ولاية نخل، معروف بجمال صوته وإتقان التلاوة.
                </p>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="family-speech" time="6:05 م" title="كلمة العائلة" duration="5 دقائق">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Amiri, serif" }}>
                كلمة ترحيبية من عائلة الشيخ سليمان الكندي، تعبر عن امتنانهم لإقامة هذه الندوة وتقديرهم للباحثين
                والمشاركين.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  المتحدث: الأستاذ هلال بن حمد الكندي
                </h4>
                <p className="text-sm text-gray-700" style={{ fontFamily: "Amiri, serif" }}>
                  من أحفاد الشيخ سليمان الكندي، يعمل في مجال التعليم ومهتم بالتراث العماني والتاريخ المحلي.
                </p>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="association-speech" time="6:10 م" title="كلمة الجمعية" duration="5 دقائق">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Amiri, serif" }}>
                كلمة ترحيبية من جمعية التراث العماني بولاية نخل، تسلط الضوء على أهمية توثيق تراث الأعلام العمانيين.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  المتحدث: الأستاذ سالم بن محمد الكندي
                </h4>
                <p className="text-sm text-gray-700" style={{ fontFamily: "Amiri, serif" }}>
                  رئيس جمعية التراث العماني بولاية نخل، باحث في التاريخ المحلي ومؤلف عدة كتب عن تراث المنطقة.
                </p>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="operetta" time="6:15 م" title="الأوبريت" duration="10 دقائق">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Amiri, serif" }}>
                عرض فني يتضمن إلقاء وإنشاد لبعض الأبيات الشعرية من قصائد الشيخ سليمان الكندي، بأداء مجموعة من الشعراء
                والمنشدين المحليين.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  المشاركون:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1" style={{ fontFamily: "Amiri, serif" }}>
                  <li>• الشاعر أحمد بن سعيد الكندي - إلقاء شعري</li>
                  <li>• المنشد محمد بن علي الراشدي - إنشاد</li>
                  <li>• فرقة التراث الشعبي بنخل - مصاحبة موسيقية</li>
                </ul>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="documentary" time="6:25 م" title="الفيلم الوثائقي" duration="5 دقائق">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Amiri, serif" }}>
                عرض فيلم وثائقي قصير عن حياة الشيخ سليمان الكندي، يسلط الضوء على أبرز محطات حياته العلمية والعملية.
              </p>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  فريق الإنتاج:
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700" style={{ fontFamily: "Amiri, serif" }}>
                  <div>
                    <p>
                      <strong>المخرج:</strong> عمر الكندي
                    </p>
                    <p>
                      <strong>المنتج:</strong> منير الراوحي
                    </p>
                    <p>
                      <strong>كاتبة السيناريو:</strong> نسيبة اليعربي
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>مدير التصوير:</strong> أحمد الخصيبي
                    </p>
                    <p>
                      <strong>المدير الفني:</strong> عبدالعزيز الجميلي
                    </p>
                    <p>
                      <strong>مساعد المخرج:</strong> مهند المرضي
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="first-session" time="6:30 م" title="الجلسة العلمية الأولى" duration="ساعة واحدة">
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  رئيس الجلسة: الدكتور صالح المعمري
                </h4>
                <p className="text-sm text-gray-700" style={{ fontFamily: "Amiri, serif" }}>
                  أستاذ الدراسات الإسلامية بجامعة السلطان قابوس، متخصص في الفقه الإسلامي والقضاء الشرعي.
                </p>
              </div>

              <div className="space-y-6">
                <SpeakerCard
                  name="الشيخ د. عبدالله السيابي"
                  title="أستاذ الفقه والأصول - جامعة نزوى"
                  image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  research="الشيخ سليمان الكندي قاضياً وفقيهاً"
                  quote="لقد كان الشيخ سليمان الكندي نموذجاً فريداً في الجمع بين العلم والعمل، فقد طبق ما تعلمه من أحكام الفقه في قضائه بعدالة ونزاهة، وترك إرثاً قضائياً يُحتذى به في التعامل مع القضايا المعقدة بحكمة وبصيرة."
                  downloadLink="/papers/sheikh-sulaiman-judge-faqih.pdf"
                />

                <SpeakerCard
                  name="د. محمد حساني"
                  title="أستاذ علم الاجتماع - جامعة السلطان قابوس"
                  image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  research="الحياة الاجتماعية للشيخ سليمان الكندي"
                  quote="تميز الشيخ سليمان الكندي بقدرته على التفاعل مع مختلف طبقات المجتمع، فكان قريباً من الناس، يشاركهم أفراحهم وأحزانهم، ويسعى لحل مشاكلهم الاجتماعية بروح الأبوة والحكمة، مما جعله محبوباً ومحترماً من الجميع."
                  downloadLink="/papers/social-life-sheikh-sulaiman.pdf"
                />

                <SpeakerCard
                  name="د. محسن الكندي"
                  title="أستاذ الأدب العربي - كلية الآداب والعلوم الاجتماعية"
                  image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
                  research="دراسة في شعر الشيخ سليمان الكندي"
                  quote="شعر الشيخ سليمان الكندي يعكس عمق ثقافته وسعة اطلاعه، فقد نظم في مختلف الأغراض الشعرية بلغة فصيحة وأسلوب بليغ، وتميزت قصائده بالحكمة والموعظة الحسنة، مما يجعلها مدرسة أدبية قائمة بذاتها."
                  downloadLink="/papers/poetry-study-sheikh-sulaiman.pdf"
                />
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="break" time="7:30 م" title="استراحة" duration="10 دقائق">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Amiri, serif" }}>
                استراحة قصيرة للحضور مع تقديم المرط��ات والقهوة العمانية التقليدية، وفرصة لزيارة المعارض المصاحبة.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  المعارض المتاحة للزيارة:
                </h4>
                <ul className="text-sm text-gray-700 space-y-1" style={{ fontFamily: "Amiri, serif" }}>
                  <li>• معرض مقتنيات الشيخ الشخصية</li>
                  <li>• المكتبة الفكرية - مخطوطات وكتب الشيخ</li>
                  <li>• ركن الأوراق البحثية</li>
                  <li>• ركن مشروع أساسك التعليمي</li>
                </ul>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem id="second-session" time="7:40 م" title="الجلسة العلمية الثانية" duration="ساعة واحدة">
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  رئيس الجلسة: الدكتور محمود السليمي
                </h4>
                <p className="text-sm text-gray-700" style={{ fontFamily: "Amiri, serif" }}>
                  أستاذ التاريخ الإسلامي بجامعة نزوى، متخصص في تاريخ عُمان الحديث والمعاصر.
                </p>
              </div>

              <div className="space-y-6">
                <SpeakerCard
                  name="د. عبدالرحمن طعمة"
                  title="أستاذ البلاغة والنقد - جامعة الشارقة"
                  image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face"
                  research="الحجاج في الأحكام القضائية للشيخ سليمان الكندي"
                  quote="تميزت أحكام الشيخ سليمان القضائية بقوة الحجة ووضوح البرهان، فقد كان يستخدم أساليب الحجاج البلاغية في إقناع المتخاصمين بعدالة الحكم، مما يعكس عمق فهمه لعلوم البلاغة وتطبيقها العملي في القضاء."
                  downloadLink="/papers/argumentation-judicial-rulings.pdf"
                />

                <SpeakerCard
                  name="د. خالد الكندي"
                  title="أستاذ التاريخ - كلية التربية"
                  image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
                  research="الشيخ سليمان الكندي النشأة والتكوين (بالاشتراك مع د. أفلح الكندي)"
                  quote="نشأ الشيخ سليمان في بيئة علمية محفزة، وتلقى تعليمه على يد كبار علماء عصره، مما شكل شخصيته العلمية والفكرية. وقد ساهمت ظروف نشأته في ولاية نخل وما تميزت به من تنوع ثقافي في إثراء تكوينه المعرفي."
                  downloadLink="/papers/upbringing-formation-sheikh-sulaiman.pdf"
                />

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: "Amiri, serif" }}>
                    الأوراق الإضافية - معرض البوسترات
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                        الأثر التربوي للشيخ سليمان الكندي
                      </h5>
                      <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                        أ. تسنيم الكندية + أ. بصائر الكندية
                      </p>
                      <a href="/papers/educational-impact.pdf" className="text-blue-600 text-sm hover:underline">
                        تحميل البحث
                      </a>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                        رسائل وقصائد الشيخ سليمان: دراسة فنية
                      </h5>
                      <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                        أ. النضر الخنجري
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
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Amiri, serif" }}>
                حفل ختام الندوة يتضمن تكريم الباحثين والمشاركين، وتقديم الشهادات والدروع التذكارية، مع كلمة ختامية من
                سعادة الشيخ أحمد بن سعود السيابي.
              </p>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4" style={{ fontFamily: "Amiri, serif" }}>
                  برنامج التكريم:
                </h4>
                <div className="space-y-3 text-sm text-gray-700" style={{ fontFamily: "Amiri, serif" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#BF965A" }}></div>
                    <span>درع تذكاري يحمل شعار الندوة واسم الباحث</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#BF965A" }}></div>
                    <span>شهادة مشاركة مختومة ومعتمدة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#BF965A" }}></div>
                    <span>مكافأة مالية بقيمة 150 ريال عماني لكل باحث</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2" style={{ fontFamily: "Amiri, serif" }}>
                  المتحدث الرئيس: سعادة الشيخ أحمد بن سعود السيابي
                </h4>
                <p className="text-sm text-gray-700" style={{ fontFamily: "Amiri, serif" }}>
                  عضو مجلس الدولة، وأحد كبار علماء السلطنة، سيلقي كلمة ختامية عن أهمية توثيق تراث العلماء والمفكرين
                  العمانيين.
                </p>
              </div>
            </div>
          </TimelineItem>
        </div>

        {/* Quick Navigation */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Amiri, serif" }}>
            الانتقال السريع
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { id: "quran-recitation", title: "تلاوة القرآن" },
              { id: "first-session", title: "الجلسة الأولى" },
              { id: "second-session", title: "الجلسة الثانية" },
              { id: "closing-ceremony", title: "الختام" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block p-3 text-center rounded-lg border border-gray-200 hover:border-yellow-600 hover:bg-yellow-50 transition-colors"
                style={{ fontFamily: "Amiri, serif" }}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelinePage
