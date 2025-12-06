"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, FileText, Search, Filter } from "lucide-react"
import { documents, categories, getCategoryColor, type Document } from "./documentsData"
import Link from "next/link"

const DocumentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [filteredDocuments, setFilteredDocuments] = useState(documents)

  const router = useRouter()

  useEffect(() => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.includes(searchTerm) ||
          doc.content.includes(searchTerm) ||
          doc.category.includes(searchTerm),
      )
    }

    if (selectedCategory !== "الكل") {
      filtered = filtered.filter((doc) => doc.category === selectedCategory)
    }

    setFilteredDocuments(filtered)
  }, [searchTerm, selectedCategory])

  const openDocument = (doc: Document) => {
    router.push(`/documents/${doc.id}`)
  }

  return (
    <div className="inverted-nav min-h-screen bg-mud bg-cover bg-no-repeat" dir="rtl" style={{ backgroundImage: "url('/mud-bg.webp')", backgroundPosition: "center 15%" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-sand">
            وثائق الشيخ سليمان الكندي
          </h1>
          <p className="text-lg sm:text-xl text-sand max-w-3xl mx-auto">
            مجموعة نادرة من الوثائق التاريخية والمخطوطات الأصلية للشيخ سليمان بن علي الكندي
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sand w-5 h-5" />
              <input
                type="text"
                placeholder="البحث في الوثائق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-sand rounded-lg focus:ring-2 focus:ring-sand focus:border-transparent bg-mud text-sand placeholder:text-sand"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sand w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto pr-10 pl-8 py-3 border border-sand rounded-lg focus:ring-2 focus:ring-sand focus:border-transparent bg-mud text-sand appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-sand">
            عرض {filteredDocuments.length} من أصل {documents.length} وثيقة
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => (
            <Link
              key={doc.id}
              href={`documents/${doc.id}`}
            >
              <div
                className="bg-mud rounded-lg shadow-sm border border-sand hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={doc.photos[0]}
                    alt={doc.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                      {doc.category}
                    </span>
                  </div>
                  {doc.photos.length > 1 && (
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {doc.photos.length} صور
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sand mb-2 line-clamp-2 group-hover:text-sand transition-colors leading-relaxed">
                    {doc.title}
                  </h3>

                  <div className="inline-flex items-center gap-2 text-sm bg-sand text-mud px-3 py-1.5 rounded-full">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{doc.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-sand mx-auto mb-4" />
            <h3 className="text-lg font-medium text-sand mb-2">لا توجد وثائق</h3>
            <p className="text-sand">لم يتم العثور على وثائق تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentsPage
