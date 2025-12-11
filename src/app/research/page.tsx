"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, ArrowLeft, BookOpen } from "lucide-react"
import { researchPapers, getSummaryPreview } from "./researchData"
import OrderFormModal from "@/components/OrderFormModal"

export default function ResearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)

  // Check if order button should be hidden
  const hideOrderButton = process.env.NEXT_PUBLIC_HIDE_ORDER_BUTTON === "true"

  // Open form if query param is present
  useEffect(() => {
    if (searchParams.get("order") === "true" && !hideOrderButton) {
      setIsOrderFormOpen(true)
    }
  }, [searchParams, hideOrderButton])

  // Handle modal close - remove query param
  const handleCloseModal = () => {
    setIsOrderFormOpen(false)
    if (searchParams.get("order") === "true") {
      router.replace("/research", { scroll: false })
    }
  }

  return (
    <div className="inverted-nav relative min-h-screen bg-mud overflow-hidden" dir="rtl">
      {/* Background Image */}
      <Image
        src="/mud-bg.webp"
        alt=""
        fill
        className="object-cover object-[center_15%] z-0"
        priority
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pointer-events-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-sand">
            البحـــــوث العلميـــــة
          </h1>
          <p className="text-lg sm:text-xl text-sand max-w-3xl mx-auto mb-8">
            مجموعة من الأبحاث العلمية المحكمة حول حياة وتراث الشيخ سليمان بن علي الكندي
          </p>

          {/* Order Book Button */}
          {!hideOrderButton && (
            <button
              onClick={() => setIsOrderFormOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-sand text-mud rounded-full text-lg font-bold hover:opacity-90 transition-opacity cursor-pointer"
            >
              <BookOpen className="w-6 h-6" />
              <span>اطلب نسختك من الكتاب</span>
            </button>
          )}
        </div>

        {/* Research Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchPapers.map((paper) => (
            <Link
              key={paper.id}
              href={`/research/${paper.slug}`}
              className="relative bg-sand rounded-xl shadow-sm border border-mud hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col"
            >
              {/* Card Background Image */}
              <Image
                src="/sand-bg.webp"
                alt=""
                fill
                className="object-cover object-center z-0"
              />

              <div className="relative z-10 p-6 flex-1 flex flex-col pointer-events-auto">
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

      {/* Order Form Modal */}
      <OrderFormModal isOpen={isOrderFormOpen} onClose={handleCloseModal} />
    </div>
  )
}
