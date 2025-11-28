import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"

interface ResearchPaper {
  id: string
  slug: string
  title: string
  author: string
  date: string
  category: string
  summary: string
}

const researchPapers: ResearchPaper[] = [
  {
    id: "formation-achievement",
    slug: "formation-achievement",
    title: "التكوين والإنجاز",
    author: "د. خالد بن سليمان بن مهنا الكندي و د. أفلح بن أحمد بن سليمان الكندي",
    date: "١٠/٢٠٢٥",
    category: "النشأة والتكوين",
    summary: "يُقدِّم هذا البحث دراسة وافية عن الشيخ سليمان بن علي الكندي، أحد أبرز أعلام ولاية نخل في القرن الرابع عشر الهجري، من خلال تحليل تكوينه العلمي ومسيرته المهنية والاجتماعية. وُلد في العامرات، ونشأ يتيم الأب، ثم انتقل إلى نخل سنة 1350هـ الموافق 1931م، حيث بدأ مسيرة علمية طويلة جمع فيها بين التعليم والقضاء والإصلاح الاجتماعي.",
  },
  {
    id: "sheikh-sulaiman-judge-faqih",
    slug: "sheikh-sulaiman-judge-faqih",
    title: "الشيخ سليمان بن علي الكندي فقيهًا وقاضيًا",
    author: "فضيلة الشيخ القاضي/ عبدالله بن راشد السيابي",
    date: "١٠/٢٠٢٥",
    category: "القضاء والفقه",
    summary: "يتناول البحث سيرة الشيخ سليمان بن علي الكندي، أحد القضاة العمانيين الذين جمعوا بين الفقه والقضاء، مبرزًا مكانته العلمية ومنهجه في تطبيق الشريعة، ويوضّح الباحث أن القضاء في الإسلام من أشرف المناصب، وهو مهنة الأنبياء والمرسلين، يقوم على إقامة العدل ورفع الظلم.",
  },
  {
    id: "argumentation-judicial-rulings",
    slug: "argumentation-judicial-rulings",
    title: "الحجاج في الأحكام القضائية للشيخ سليمان بن علي الكندي",
    author: "الدكتور عبد الرحمن طعمة حسن",
    date: "١٠/٢٠٢٥",
    category: "القضاء والفقه",
    summary: "يقع هذا البحث ضمن الدراسات اللسانية الحجاجية، التي تحاول فهم الخطاب اللغوي في ضوء أسس الحجاج والجدل، واشتغالاته على مستوى الانفعالات، وعلى مستوى التمظهرات اللسانية التواصلية، في سياق انفتاح نسق اللغة على الأنساق التصورية المختلفة.",
  },
  {
    id: "structural-semantic-patterns",
    slug: "structural-semantic-patterns",
    title: "الأنساق البنائية والدلالية في شعر الشيخ الكندي، مقاربة نصيّة",
    author: "د. محمد مصطفى حسانين",
    date: "١٠/٢٠٢٥",
    category: "الدراسات اللغوية والأدبية",
    summary: "يتناول هذا البحث تجربة الشيخ سليمان بن علي الكندي الذي جمع بين الفقه والشعر، وجعل من الكلمة أداةً للتعبير عن رؤيته الفكرية والدينية والاجتماعية. فقد تميزت شخصيته بالثراء العلمي، والانفتاح على دوائر البيان والوجدان.",
  },
  {
    id: "letters-poems-artistic-study",
    slug: "letters-poems-artistic-study",
    title: "رسائل الشيخ سليمان بن علي الكندي وقصائده: دراسة فنية",
    author: "أ. النضر بن سليمان بن ناصر الخنجري",
    date: "١٠/٢٠٢٥",
    category: "الدراسات اللغوية والأدبية",
    summary: "تناول البحث الرسائل التي كتبها الشيخ موجهة إلى أبنائه إبان كانوا خارج عمان، ونتاجه الشعري المتمثل في بعض القصائد ذات الطابع العلمي وأخرى تحمل معاني الإصلاح والتوجيه. اعتمدت الدراسة المنهج الوصفي التحليلي، مركزة على الجانب الموضوعي والفني.",
  },
  {
    id: "educational-methodology",
    slug: "educational-methodology",
    title: "المنهج التربوي للشيخ سليمان بن علي بن سليمان الكندي: القِيَم والطرائق",
    author: "أ.تسنيم بنت أحمد بن سليمان الكندية و أ.بصائر بنت أحمد بن سليمان الكندية",
    date: "١٠/٢٠٢٥",
    category: "المنهج التربوي",
    summary: "يأتي هذا البحث ليقف عند الأثر التربوي للشيخ سليمان بن علي الكندي؛ حيث يسلط الضوء على الأبعاد التربوية العميقة في سيرته، من خلال رصد ما اتّسمت به شخصيّته من قيم راسخة، واستجلاء ما انتهجه من طرائق عمليّة.",
  },
]

function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    "النشأة والتكوين": "bg-blue-100 text-blue-800",
    "القضاء والفقه": "bg-green-100 text-green-800",
    "الدراسات اللغوية والأدبية": "bg-purple-100 text-purple-800",
    "المنهج التربوي": "bg-amber-100 text-amber-800",
  }
  return colors[category] || "bg-gray-100 text-gray-800"
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: "#BF965A" }}></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-mud">
            البحوث العلمية
          </h1>
          <p className="text-lg sm:text-xl text-sand max-w-3xl mx-auto">
            مجموعة من الأبحاث العلمية المحكمة حول حياة وتراث الشيخ سليمان بن علي الكندي
          </p>
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchPapers.map((paper) => (
            <Link
              key={paper.id}
              href={`/research/${paper.slug}`}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(paper.category)}`}>
                    {paper.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#76424E] transition-colors leading-relaxed">
                  {paper.title}
                </h3>

                {/* Author */}
                <div className="flex items-start gap-2 mb-4 text-sm text-gray-600">
                  <User className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{paper.author}</span>
                </div>

                {/* Summary */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4 flex-1">
                  {paper.summary}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{paper.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-[#76424E] group-hover:gap-2 transition-all">
                    <span>قراءة المزيد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
