"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Calendar, FileText, Search, Filter, FolderOpen } from "lucide-react"
import { documents, categories, getCategoryColor, type Document } from "./documentsData"

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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: "#BF965A" }}></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-mud">
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
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث في الوثائق..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto pr-10 pl-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            عرض {filteredDocuments.length} من أصل {documents.length} وثيقة
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => openDocument(doc)}
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
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-700 transition-colors leading-relaxed">
                  {doc.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{doc.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد وثائق</h3>
            <p className="text-gray-600">لم يتم العثور على وثائق تطابق معايير البحث</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentsPage
