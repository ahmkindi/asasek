"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowRight, Calendar, FolderOpen } from "lucide-react"
import { documents, getDocumentById, getCategoryColor } from "../documentsData"
import { notFound } from "next/navigation"
import Image from "next/image"

export default function DocumentPage() {
  const params = useParams()
  const router = useRouter()
  const id = parseInt(params.id as string, 10)

  const document = getDocumentById(id)

  if (!document) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Back Button */}
        <button
          onClick={() => router.push("/documents")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
          <span>العودة إلى الوثائق</span>
        </button>

        {/* Document Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(document.category)}`}>
              <FolderOpen className="w-4 h-4 inline ml-1" />
              {document.category}
            </span>
            <span className="flex items-center gap-1 text-gray-600 text-sm">
              <Calendar className="w-4 h-4" />
              {document.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-relaxed">
            {document.title}
          </h1>
        </div>

        {/* Document Photos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">صور الوثيقة الأصلية</h2>
          <div className={`grid gap-4 ${
            document.photos.length === 1
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
                className="block overflow-hidden rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
              >
                <img
                  src={photo}
                  alt={`${document.title} - صورة ${index + 1}`}
                  className="w-full h-auto object-contain bg-gray-100"
                />
              </a>
            ))}
          </div>
          {document.photos.length > 1 && (
            <p className="text-sm text-gray-500 mt-3 text-center">
              اضغط على أي صورة لعرضها بالحجم الكامل
            </p>
          )}
        </div>

        {/* Document Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">نص الوثيقة</h2>
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <pre className="whitespace-pre-wrap text-gray-800 leading-loose font-sans text-base sm:text-lg">
              {document.content}
            </pre>
          </div>
        </div>

        {/* Navigation to other documents */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          {id > 1 ? (
            <button
              onClick={() => router.push(`/documents/${id - 1}`)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="hidden sm:inline">الوثيقة السابقة</span>
              <span className="sm:hidden">السابقة</span>
            </button>
          ) : (
            <div />
          )}

          {id < documents.length ? (
            <button
              onClick={() => router.push(`/documents/${id + 1}`)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="hidden sm:inline">الوثيقة التالية</span>
              <span className="sm:hidden">التالية</span>
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
