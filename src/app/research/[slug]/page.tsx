"use client"

import { useState } from "react"
import { Download, MessageCircle, X, Calendar, BookOpen, ExternalLink } from "lucide-react"
import { useParams } from "next/navigation"

interface ResearchPaper {
  id: string
  slug: string
  title: string
  author: string
  authorTitle: string
  authorImage: string
  date: string
  category: string
  abstract: string
  methodology: string
  keyFindings: string[]
  resources: string[]
  downloadUrl: string
  quote: string
}

const researchPapers: ResearchPaper[] = [
  {
    id: "sheikh-sulaiman-judge-faqih",
    slug: "sheikh-sulaiman-judge-faqih",
    title: "الشيخ سليمان الكندي قاضياً وفقيهاً",
    author: "الشيخ د. عبدالله السيابي",
    authorTitle: "أستاذ الفقه والأصول - جامعة نزوى",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    date: "٢٠٢٥",
    category: "القضاء والفقه",
    abstract:
      "تهدف هذه الدراسة إلى تسليط الضوء على الجانب القضائي والفقهي في حياة الشيخ سليمان بن علي الكندي، من خلال تتبع مسيرته القضائية وتحليل أحكامه وفتاواه. تبرز الدراسة منهجيته في القضاء وأسلوبه في التعامل مع القضايا المختلفة، وتأثيره على النظام القضائي في عصره.",
    methodology:
      "اعتمدت الدراسة على المنهج التاريخي التحليلي، من خلال جمع وتحليل الوثائق القضائية والفتاوى المنسوبة للشيخ، بالإضافة إلى المقابلات مع المختصين والباحثين في التاريخ القضائي العماني.",
    keyFindings: [
      "تميز الشيخ سليمان بالعدالة والنزاهة في أحكامه القضائية",
      "اتبع منهجاً متوازناً بين النصوص الشرعية والواقع المعاش",
      "ساهم في تطوير الممارسات القضائية في المنطقة",
      "ترك إرثاً فقهياً غنياً يستفاد منه حتى اليوم",
    ],
    resources: [
      "أرشيف المحاكم الشرعية في ولاية نخل",
      "مجموعة فتاوى الشيخ سليمان الكندي",
      "مخطوطات دار الوثائق القومية",
      "شهادات شفوية من أحفاد الشيخ",
      "السجلات القضائية التاريخية",
    ],
    downloadUrl: "/papers/sheikh-sulaiman-judge-faqih.pdf",
    quote:
      "لقد كان الشيخ سليمان الكندي نموذجاً فريداً في الجمع بين العلم والعمل، فقد طبق ما تعلمه من أحكام الفقه في قضائه بعدالة ونزاهة، وترك إرثاً قضائياً يُحتذى به في التعامل مع القضايا المعقدة بحكمة وبصيرة.",
  },
  {
    id: "social-life-sheikh-sulaiman",
    slug: "social-life-sheikh-sulaiman",
    title: "الحياة الاجتماعية للشيخ سليمان الكندي",
    author: "د. محمد حساني",
    authorTitle: "أستاذ علم الاجتماع - جامعة السلطان قابوس",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    date: "٢٠٢٥",
    category: "المحور التربوي",
    abstract:
      "تتناول هذه الدراسة الجوانب الاجتماعية في حياة الشيخ سليمان الكندي، وتأثيره على المجتمع المحلي، ودوره في الإصلاح الاجتماعي. تحلل الدراسة علاقاته الاجتماعية وتفاعله مع مختلف طبقات المجتمع.",
    methodology:
      "استخدمت الدراسة المنهج الاجتماعي التاريخي، مع الاعتماد على الوثائق التاريخية والمقابلات الشفوية مع أفراد المجتمع المحلي وأحفاد الشيخ.",
    keyFindings: [
      "كان الشيخ قريباً من جميع طبقات المجتمع",
      "ساهم في حل النزاعات الاجتماعية بالحكمة",
      "أسس تقاليد اجتماعية إيجابية لا تزال متبعة",
      "كان نموذجاً في التواضع والتعامل الحسن",
    ],
    resources: [
      "أرشيف العائلات المحلية",
      "التاريخ الشفوي لولاية نخل",
      "الوثائق الاجتماعية التاريخية",
      "مذكرات معاصري الشيخ",
    ],
    downloadUrl: "/papers/social-life-sheikh-sulaiman.pdf",
    quote:
      "تميز الشيخ سليمان الكندي بقدرته على التفاعل مع مختلف طبقات المجتمع، فكان قريباً من الناس، يشاركهم أفراحهم وأحزانهم، ويسعى لحل مشاكلهم الاجتماعية بروح الأبوة والحكمة.",
  },
  {
    id: "poetry-study-sheikh-sulaiman",
    slug: "poetry-study-sheikh-sulaiman",
    title: "دراسة في شعر الشيخ سليمان الكندي",
    author: "د. محسن الكندي",
    authorTitle: "أستاذ الأدب العربي - كلية الآداب والعلوم الاجتماعية",
    authorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    date: "٢٠٢٥",
    category: "الأدب",
    abstract:
      "دراسة أدبية شاملة لشعر الشيخ سليمان الكندي، تحلل أسلوبه الشعري وموضوعاته وتأثيره على الأدب المحلي. تتناول الدراسة الخصائص الفنية لشعره ومكانته في الأدب العماني.",
    methodology:
      "اعتمدت الدراسة على المنهج الأدبي التحليلي، مع جمع وتحليل الأعمال الشعرية للشيخ ومقارنتها بشعراء عصره.",
    keyFindings: [
      "تنوع موضوعات شعره بين الحكمة والموعظة والمدح",
      "استخدم بحوراً شعرية متنوعة بمهارة عالية",
      "تأثر بالتراث الشعري العربي الأصيل",
      "ترك مدرسة شعرية مؤثرة في المنطقة",
    ],
    resources: [
      "ديوان الشيخ سليمان الكندي",
      "المخطوطات الشعرية النادرة",
      "مجموعات الشعر الشعبي المحلي",
      "دراسات الأدب العماني المعاصر",
    ],
    downloadUrl: "/papers/poetry-study-sheikh-sulaiman.pdf",
    quote:
      "شعر الشيخ سليمان الكندي يعكس عمق ثقافته وسعة اطلاعه، فقد نظم في مختلف الأغراض الشعرية بلغة فصيحة وأسلوب بليغ، وتميزت قصائده بالحكمة والموعظة الحسنة.",
  },
  {
    id: "argumentation-judicial-rulings",
    slug: "argumentation-judicial-rulings",
    title: "الحجاج في الأحكام القضائية للشيخ سليمان الكندي",
    author: "د. عبدالرحمن طعمة",
    authorTitle: "أستاذ البلاغة والنقد - جامعة الشارقة",
    authorImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    date: "٢٠٢٥",
    category: "القضاء والفقه",
    abstract:
      "تحلل هذه الدراسة أساليب الحجاج والإقناع في الأحكام القضائية للشيخ سليمان الكندي، وتبرز مهارته في استخدام الأدلة الشرعية والعقلية في إصدار الأحكام وإقناع المتقاضين.",
    methodology:
      "استخدمت الدراسة منهج التحليل البلاغي والحجاجي، مع دراسة نماذج من الأحكام القضائية وتحليل أساليب الإقناع المستخدمة فيها.",
    keyFindings: [
      "استخدم أساليب حجاجية متنوعة ومؤثرة",
      "ربط بين الأدلة الشرعية والواقع العملي",
      "تميز بوضوح العبارة وقوة البرهان",
      "أثر في تطوير الخطاب القضائي المحلي",
    ],
    resources: [
      "مجموعة الأحكام القضائية للشيخ",
      "كتب البلاغة والحجاج الكلاسيكية",
      "دراسات في الخطاب القضائي",
      "نصوص فقهية مقارنة",
    ],
    downloadUrl: "/papers/argumentation-judicial-rulings.pdf",
    quote:
      "تميزت أحكام الشيخ سليمان القضائية بقوة الحجة ووضوح البرهان، فقد كان يستخدم أساليب الحجاج البلاغية في إقناع المتخاصمين بعدالة الحكم.",
  },
  {
    id: "upbringing-formation-sheikh-sulaiman",
    slug: "upbringing-formation-sheikh-sulaiman",
    title: "الشيخ سليمان الكندي النشأة والتكوين",
    author: "د. خالد الكندي و د. أفلح الكندي",
    authorTitle: "أستاذ التاريخ - كلية التربية",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    date: "٢٠٢٥",
    category: "مسارات الحياة",
    abstract:
      "دراسة تاريخية شاملة لمراحل نشأة وتكوين الشيخ سليمان الكندي، من طفولته المبكرة حتى نضجه العلمي، مع التركيز على العوامل التي أثرت في تشكيل شخصيته العلمية والفكرية.",
    methodology:
      "اعتمدت الدراسة على المنهج التاريخي الوصفي، مع الاستعانة بالوثائق التاريخية والمصادر الشفوية والمكتوبة.",
    keyFindings: [
      "تأثر بالبيئة العلمية في ولاية نخل",
      "تلقى تعليماً متنوعاً على يد علماء مختلفين",
      "ساهمت ظروف نشأته في تكوين شخصيته المتوازنة",
      "بدأ التدريس والإفتاء في سن مبكرة",
    ],
    resources: ["سجلات الولادة والنسب", "مذكرات معاصريه", "وثائق تعليمية تاريخية", "شهادات شفوية من العائلة"],
    downloadUrl: "/papers/upbringing-formation-sheikh-sulaiman.pdf",
    quote:
      "نشأ الشيخ سليمان في بيئة علمية محفزة، وتلقى تعليمه على يد كبار علماء عصره، مما شكل شخصيته العلمية والفكرية وساهم في إثراء تكوينه المعرفي.",
  },
]

const QuestionDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [question, setQuestion] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">اطرح سؤالاً</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">سؤالك حول البحث</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="اكتب سؤالك هنا..."
            />
          </div>

          <div className="flex gap-3">
            <button
              className="flex-1 px-4 py-2 text-white rounded-lg transition-colors"
              style={{ backgroundColor: "#76424E" }}
            >
              إرسال السؤال
            </button>
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ResearchPaperPage = () => {
  const params = useParams()
  const [showQuestionDialog, setShowQuestionDialog] = useState(false)

  const paper = researchPapers.find((p) => p.slug === params.slug)

  if (!paper) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">البحث غير موجود</h1>
          <a href="/timeline" className="text-blue-600 hover:underline">
            العودة إلى الجدول
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: "#76424E" }}
                >
                  {paper.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{paper.date}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{paper.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <img
                  src={paper.authorImage || "/placeholder.svg"}
                  alt={paper.author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{paper.author}</h3>
                  <p className="text-gray-600">{paper.authorTitle}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={paper.downloadUrl}
                  download
                  className="inline-flex items-center justify-center px-6 py-3 text-white rounded-lg transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#76424E" }}
                >
                  <Download className="w-5 h-5 ml-2" />
                  تحميل البحث
                </a>
                <button
                  onClick={() => setShowQuestionDialog(true)}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 rounded-lg transition-colors hover:bg-yellow-50"
                  style={{ borderColor: "#BF965A", color: "#76424E" }}
                >
                  <MessageCircle className="w-5 h-5 ml-2" />
                  اطرح سؤالاً
                </button>
              </div>
            </div>

            <div className="lg:w-80">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border-2 border-yellow-200">
                <h3 className="font-bold text-gray-900 mb-3">اقتباس من البحث</h3>
                <blockquote className="text-gray-700 italic leading-relaxed">{paper.quote}</blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Abstract */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "#BF965A" }}
                >
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">ملخص البحث</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{paper.abstract}</p>
            </div>

            {/* Methodology */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">منهجية البحث</h2>
              <p className="text-gray-700 leading-relaxed">{paper.methodology}</p>
            </div>

            {/* Key Findings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">النتائج الرئيسية</h2>
              <div className="space-y-4">
                {paper.keyFindings.map((finding, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1"
                      style={{ backgroundColor: "#76424E" }}
                    >
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{finding}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resources */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">المصادر والمراجع</h3>
              <div className="space-y-3">
                {paper.resources.map((resource, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <ExternalLink className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-sm leading-relaxed">{resource}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Author Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">عن الباحث</h3>
              <div className="text-center">
                <img
                  src={paper.authorImage || "/placeholder.svg"}
                  alt={paper.author}
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 mx-auto mb-4"
                />
                <h4 className="font-bold text-gray-900 mb-2">{paper.author}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{paper.authorTitle}</p>
              </div>
            </div>

            {/* Related Papers */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">أبحاث ذات صلة</h3>
              <div className="space-y-3">
                {researchPapers
                  .filter((p) => p.id !== paper.id && p.category === paper.category)
                  .slice(0, 3)
                  .map((relatedPaper) => (
                    <a
                      key={relatedPaper.id}
                      href={`/research/${relatedPaper.slug}`}
                      className="block p-3 rounded-lg border border-gray-200 hover:border-yellow-600 hover:bg-yellow-50 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 text-sm mb-1">{relatedPaper.title}</h4>
                      <p className="text-gray-600 text-xs">{relatedPaper.author}</p>
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuestionDialog isOpen={showQuestionDialog} onClose={() => setShowQuestionDialog(false)} />
    </div>
  )
}

export default ResearchPaperPage

