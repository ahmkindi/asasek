import Link from "next/link"
import { ArrowRight, Calendar, FolderOpen } from "lucide-react"
import { documents, getDocumentById } from "../documentsData"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function DocumentPage({ params }: PageProps) {
  const { id: idParam } = await params
  const id = parseInt(idParam, 10)

  const document = getDocumentById(id)

  if (!document) {
    notFound()
  }

  return (
    <div className="inverted-nav min-h-screen bg-mud bg-cover bg-no-repeat" dir="rtl" style={{ backgroundImage: "url('/mud-bg.webp')", backgroundPosition: "center 15%" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Document Header */}
        <div className="mb-6 text-center pt-12">
          <h1 className="text-4xl md:text-6xl font-bold text-sand leading-relaxed mb-4">
            {document.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-sand text-mud">
              <FolderOpen className="w-4 h-4 inline ml-1" />
              {document.category}
            </span>
            <span className="inline-flex items-center gap-1 bg-sand text-mud text-sm px-3 py-1.5 rounded-full">
              <Calendar className="w-4 h-4" />
              {document.date}
            </span>
          </div>
        </div>

        {/* Document Content */}
        <div className="bg-mud rounded-xl border border-sand py-6 px-3 mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-sand mb-2">نص الوثيقة</h2>
          <p className="text-sand leading-10 md:leading-12 text-xl md:text-2xl">
            {document.content}
          </p>
        </div>

        {/* Document Photos */}
        <div className={`grid gap-4 mb-6 ${document.photos.length === 1
          ? "grid-cols-1"
          : document.photos.length === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}>
          {document.photos.map((photo, index) => (
            <a
              key={index}
              href={photo}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border border-sand hover:opacity-90 transition-all cursor-pointer"
            >
              <img
                src={photo}
                alt={`${document.title} - صورة ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </a>
          ))}
        </div>
        {document.photos.length > 1 && (
          <p className="text-sm text-sand mb-6 text-center">
            اضغط على أي صورة لعرضها بالحجم الكامل
          </p>
        )}

        {/* Navigation to other documents */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-sand">
          {id > 1 ? (
            <Link
              href={`/documents/${id - 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sand text-mud rounded-full transition-colors cursor-pointer hover:opacity-90"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="hidden sm:inline">الوثيقة السابقة</span>
              <span className="sm:hidden">السابقة</span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/documents"
            className="inline-flex items-center px-4 py-2 bg-sand text-mud rounded-full transition-colors cursor-pointer hover:opacity-90"
          >
            <span>العودة إلى الوثائق</span>
          </Link>

          {id < documents.length ? (
            <Link
              href={`/documents/${id + 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sand text-mud rounded-full transition-colors cursor-pointer hover:opacity-90"
            >
              <span className="hidden sm:inline">الوثيقة التالية</span>
              <span className="sm:hidden">التالية</span>
              <ArrowRight className="w-5 h-5 rotate-180" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
