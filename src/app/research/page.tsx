import Link from "next/link"
import { User, ArrowLeft } from "lucide-react"
import { researchPapers, getSummaryPreview } from "./researchData"

export default function ResearchPage() {
  return (
    <div className="inverted-nav min-h-screen bg-mud bg-cover bg-no-repeat" dir="rtl" style={{ backgroundImage: "url('/mud-bg.webp')", backgroundPosition: "center 15%" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-sand">
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
              className="bg-sand rounded-xl shadow-sm border border-mud hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/sand-bg.webp')" }}
            >
              <div className="p-6 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-xl font-bold text-mud mb-3 group-hover:text-mud transition-colors leading-relaxed">
                  {paper.title}
                </h3>

                {/* Authors */}
                <div className="flex items-start gap-2 mb-4 text-sm text-mud">
                  <User className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="line-clamp-2">
                    {paper.authors.map(a => a.name).join(" و ")}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-mud text-sm leading-relaxed mb-4 line-clamp-4 flex-1">
                  {getSummaryPreview(paper.summary)}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-end pt-4 border-t border-mud">
                  <div className="inline-flex items-center gap-1 text-sm font-medium bg-mud text-sand px-3 py-1.5 rounded-full group-hover:gap-2 transition-all cursor-pointer">
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
