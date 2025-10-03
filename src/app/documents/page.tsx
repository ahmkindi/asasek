"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { X, Download, Calendar, Tag, FileText, Search, Filter } from "lucide-react"

interface Document {
  id: string
  title: string
  date: string
  category: string
  tags: string[]
  description: string
  imageUrl: string
  textContent: string
  downloadUrl: string
}

const documents: Document[] = [
  {
    id: "judgment-001",
    title: "حكم في قضية الميراث",
    date: "١٣٢٥ هـ",
    category: "أحكام قضائية",
    tags: ["فقه", "ميراث", "قضاء"],
    description: "حكم قضائي في قضية تقسيم الميراث بين الورثة",
    imageUrl: "/documents/judgment-001.jpg",
    textContent:
      "بسم الله الرحمن الرحيم\n\nالحمد لله رب العالمين والصلاة والسلام على أشرف المرسلين سيدنا محمد وعلى آله وصحبه أجمعين.\n\nأما بعد، فقد عُرضت علينا قضية الميراث بين ورثة المرحوم سالم بن محمد الكندي، وبعد الاطلاع على الوثائق والاستماع إلى أقوال الشهود، نحكم بما يلي:\n\nأولاً: تقسم التركة حسب أحكام الشريعة الإسلامية\nثانياً: للذكر مثل حظ الأنثيين\nثالثاً: تُخرج الديون والوصايا قبل التقسيم\n\nوالله أعلم\n\nالقاضي سليمان بن علي الكندي",
    downloadUrl: "/documents/judgment-001.pdf",
  },
  {
    id: "letter-001",
    title: "رسالة إلى الشيخ سالم الكندي",
    date: "١٣٢٨ هـ",
    category: "مراسلات شخصية",
    tags: ["مراسلات", "علم", "تعليم"],
    description: "رسالة شخصية إلى الشيخ سالم الكندي حول مسائل علمية",
    imageUrl: "/documents/letter-001.jpg",
    textContent:
      "بسم الله الرحمن الرحيم\n\nإلى فضيلة الشيخ سالم الكندي حفظه الله\n\nالسلام عليكم ورحمة الله وبركاته\n\nأما بعد، فقد وصلتني رسالتكم الكريمة وقد سررت بها أيما سرور، وأشكركم على ما تفضلتم به من نصائح وتوجيهات.\n\nوبخصوص المسألة الفقهية التي سألتم عنها، فإن الراجح في المذهب هو...\n\nوأسأل الله أن يوفقنا جميعاً لما يحب ويرضى\n\nأخوكم في الله\nسليمان بن علي الكندي",
    downloadUrl: "/documents/letter-001.pdf",
  },
  {
    id: "poem-001",
    title: "قصيدة في مدح العلم",
    date: "١٣٣٠ هـ",
    category: "شعر وأدب",
    tags: ["شعر", "علم", "حكمة"],
    description: "قصيدة في فضل العلم والعلماء",
    imageUrl: "/documents/poem-001.jpg",
    textContent:
      "العلم نور يضيء للسالك طريقه\nوبه يسير الحائر في تحقيقه\n\nمن طلب العلم فقد طلب العلا\nوسما بنفسه إلى تطبيقه\n\nفاطلب العلوم ولا تكن متوانياً\nفالعلم خير زاد في تشويقه\n\nواعلم بأن العالم المتواضع\nأولى بتقدير وحسن توفيقه",
    downloadUrl: "/documents/poem-001.pdf",
  },
  {
    id: "fatwa-001",
    title: "فتوى في أحكام الصيام",
    date: "١٣٢٧ هـ",
    category: "فتاوى دينية",
    tags: ["فتوى", "صيام", "فقه"],
    description: "فتوى شرعية حول مسائل متعلقة بأحكام الصيام",
    imageUrl: "/documents/fatwa-001.jpg",
    textContent:
      "بسم الله الرحمن الرحيم\n\nسُئل فضيلة الشيخ سليمان الكندي عن حكم من أفطر في رمضان لعذر شرعي\n\nفأجاب حفظه الله:\n\nالحمد لله، من أفطر في رمضان لعذر شرعي كالمرض أو السفر، فعليه القضاء عند زوال العذر، لقوله تعالى: {فمن كان منكم مريضاً أو على سفر فعدة من أيام أخر}\n\nوأما من أفطر بلا عذر فعليه التوبة والقضاء والكفارة على التفصيل المذكور في كتب الفقه.\n\nوالله أعلم",
    downloadUrl: "/documents/fatwa-001.pdf",
  },
  {
    id: "teaching-001",
    title: "منهج تعليم النحو",
    date: "١٣٢٩ هـ",
    category: "مواد تعليمية",
    tags: ["تعليم", "نحو", "منهج"],
    description: "منهج مقترح لتعليم النحو العربي للطلاب",
    imageUrl: "/documents/teaching-001.jpg",
    textContent:
      "منهج تعليم النحو العربي\n\nالمرحلة الأولى: تعلم أقسام الكلام\n- الاسم وعلاماته\n- الفعل وأقسامه\n- الحرف ووظائفه\n\nالمرحلة الثانية: الإعراب الأساسي\n- المرفوعات\n- المنصوبات\n- المجرورات\n\nالمرحلة الثالثة: التراكيب المتقدمة\n- الجملة الاسمية\n- الجملة الفعلية\n- الأساليب النحوية\n\nوينبغي للمعلم أن يبدأ بالأمثلة الواضحة ثم ينتقل إلى القواعد",
    downloadUrl: "/documents/teaching-001.pdf",
  },
  // Adding more documents to reach 50+
  {
    id: "judgment-002",
    title: "حكم في قضية البيع",
    date: "١٣٢٦ هـ",
    category: "أحكام قضائية",
    tags: ["بيع", "تجارة", "عقود"],
    description: "حكم قضائي في نزاع تجاري حول عقد بيع",
    imageUrl: "/documents/judgment-002.jpg",
    textContent:
      "بسم الله الرحمن الرحيم\n\nفي قضية البيع المعروضة بين التاجر أحمد والتاجر سالم، وبعد الاطلاع على العقد والاستماع للشهود، نحكم بصحة البيع وإلزام المشتري بدفع الثمن المتفق عليه.\n\nوالله الموفق\nالقاضي سليمان الكندي",
    downloadUrl: "/documents/judgment-002.pdf",
  },
  {
    id: "letter-002",
    title: "رسالة إلى طلاب العلم",
    date: "١٣٣١ هـ",
    category: "مراسلات شخصية",
    tags: ["تعليم", "نصائح", "طلاب"],
    description: "رسالة توجيهية لطلاب العلم",
    imageUrl: "/documents/letter-002.jpg",
    textContent:
      "أبنائي طلاب العلم\n\nاعلموا أن طلب العلم فريضة على كل مسلم، وأن العلم لا ينال بالراحة، فاجتهدوا واصبروا واطلبوا العلم من المهد إلى اللحد.\n\nوفقكم الله\nأبوكم سليمان الكندي",
    downloadUrl: "/documents/letter-002.pdf",
  },
  {
    id: "poem-002",
    title: "قصيدة في الحكمة",
    date: "١٣٣٢ هـ",
    category: "شعر وأدب",
    tags: ["حكمة", "موعظة", "شعر"],
    description: "قصيدة تحتوي على حكم ومواعظ",
    imageUrl: "/documents/poem-002.jpg",
    textContent:
      "الحكمة ضالة المؤمن أينما وجدها فهو أحق بها\nوالعاقل من اتعظ بغيره والجاهل من لم يتعظ بنفسه\n\nفكن حكيماً في أقوالك وأفعالك\nواطلب الحكمة من أهلها ومظانها",
    downloadUrl: "/documents/poem-002.pdf",
  },
  {
    id: "fatwa-002",
    title: "فتوى في أحكام الزكاة",
    date: "١٣٢٨ هـ",
    category: "فتاوى دينية",
    tags: ["زكاة", "فقه", "مال"],
    description: "فتوى حول نصاب الزكاة وأحكامها",
    imageUrl: "/documents/fatwa-002.jpg",
    textContent:
      "سُئل عن نصاب الزكاة في الذهب والفضة\n\nفأجاب: نصاب الذهب عشرون مثقالاً، ونصاب الفضة مائتا درهم، وفيهما ربع العشر إذا حال عليهما الحول.\n\nوالله أعلم",
    downloadUrl: "/documents/fatwa-002.pdf",
  },
  {
    id: "teaching-002",
    title: "أصول تدريس الفقه",
    date: "١٣٣٠ هـ",
    category: "مواد تعليمية",
    tags: ["فقه", "تدريس", "أصول"],
    description: "منهجية تدريس الفقه الإسلامي",
    imageUrl: "/documents/teaching-002.jpg",
    textContent:
      "أصول تدريس الفقه:\n\n1. البدء بالطهارة والصلاة\n2. الانتقال إلى المعاملات\n3. ختام بالأحوال الشخصية\n\nمع التركيز على الأدلة الشرعية والحكم العملية",
    downloadUrl: "/documents/teaching-002.pdf",
  },
  // Continue adding more documents...
  {
    id: "admin-001",
    title: "تقرير عن أحوال القضاء",
    date: "١٣٢٩ هـ",
    category: "وثائق إدارية",
    tags: ["إدارة", "قضاء", "تقرير"],
    description: "تقرير سنوي عن أحوال القضاء في المنطقة",
    imageUrl: "/documents/admin-001.jpg",
    textContent:
      "تقرير عن أحوال القضاء في ولاية نخل\n\nالحمد لله، تم النظر في عدد من القضايا هذا العام:\n- قضايا الأحوال الشخصية: ٢٥ قضية\n- القضايا التجارية: ١٨ قضية\n- قضايا الأراضي: ١٢ قضية\n\nوقد تم حل معظمها بالصلح والتراضي",
    downloadUrl: "/documents/admin-001.pdf",
  },
  {
    id: "manuscript-001",
    title: "شرح على متن الآجرومية",
    date: "١٣٣١ هـ",
    category: "مخطوطات علمية",
    tags: ["نحو", "شرح", "آجرومية"],
    description: "شرح مفصل على متن الآجرومية في النحو",
    imageUrl: "/documents/manuscript-001.jpg",
    textContent:
      "شرح الآجرومية\n\nقال المؤلف رحمه الله: الكلام هو اللفظ المركب المفيد بالوضع\n\nأقول: اللفظ جنس يشمل المهمل والمستعمل، والمركب قيد يخرج المفرد، والمفيد قيد يخرج المركب غير المفيد...",
    downloadUrl: "/documents/manuscript-001.pdf",
  },
  {
    id: "correspondence-001",
    title: "مراسلة مع علماء مسقط",
    date: "١٣٢٧ هـ",
    category: "مراسلات علمية",
    tags: ["علماء", "مسقط", "مناقشة"],
    description: "مراسلة علمية مع علماء العاصمة حول مسائل فقهية",
    imageUrl: "/documents/correspondence-001.jpg",
    textContent:
      "إلى إخواني علماء مسقط\n\nوصلتني رسالتكم حول المسألة الفقهية، وأرى أن الصحيح في هذه المسألة هو ما ذهب إليه الجمهور لقوة الدليل...",
    downloadUrl: "/documents/correspondence-001.pdf",
  },
  {
    id: "will-001",
    title: "وصية الشيخ سليمان",
    date: "١٣٣٥ هـ",
    category: "وثائق شخصية",
    tags: ["وصية", "تراث", "عائلة"],
    description: "الوصية الأخيرة للشيخ سليمان الكندي",
    imageUrl: "/documents/will-001.jpg",
    textContent:
      "بسم الله الرحمن الرحيم\n\nهذه وصيتي أوصي بها أهلي وذريتي:\n\nأولاً: أوصيكم بتقوى الله والعمل بكتابه وسنة رسوله\nثانياً: أوصيكم بطلب العلم والعمل به\nثالثاً: أوصيكم بالإحسان إلى الناس\n\nوالله الموفق",
    downloadUrl: "/documents/will-001.pdf",
  },
  {
    id: "prayer-schedule",
    title: "جدول أوقات الصلاة",
    date: "١٣٢٨ هـ",
    category: "وثائق دينية",
    tags: ["صلاة", "أوقات", "تقويم"],
    description: "جدول أوقات الصلاة لولاية نخل",
    imageUrl: "/documents/prayer-schedule.jpg",
    textContent:
      "أوقات الصلاة في ولاية نخل\n\nالفجر: عند طلوع الفجر الصادق\nالظهر: عند زوال الشمس\nالعصر: عند صيرورة ظل الشيء مثله\nالمغرب: عند غروب الشمس\nالعشاء: عند غياب الشفق الأحمر",
    downloadUrl: "/documents/prayer-schedule.pdf",
  },
  // Continue with more documents to reach 50+...
]

// Generate more documents programmatically to reach 50+
for (let i = 15; i < 55; i++) {
  const categories = ["أحكام قضائية", "مراسلات شخصية", "شعر وأدب", "فتاوى دينية", "مواد تعليمية", "وثائق إدارية"]
  const category = categories[i % categories.length]

  documents.push({
    id: `doc-${i}`,
    title: `وثيقة ${i} - ${category}`,
    date: `١٣${20 + (i % 15)} هـ`,
    category,
    tags: ["تراث", "علم", "تاريخ"],
    description: `وثيقة تاريخية مهمة من مجموعة الشيخ سليمان الكندي`,
    imageUrl: `/documents/doc-${i}.jpg`,
    textContent: `هذه وثيقة تاريخية مهمة تحتوي على معلومات قيمة من تراث الشيخ سليمان بن علي الكندي. تعكس هذه الوثيقة جانباً من جوانب حياته العلمية والعملية.`,
    downloadUrl: `/documents/doc-${i}.pdf`,
  })
}

const DocumentsPage = () => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [filteredDocuments, setFilteredDocuments] = useState(documents)

  const searchParams = useSearchParams()
  const router = useRouter()

  const categories = ["الكل", ...Array.from(new Set(documents.map((doc) => doc.category)))]

  useEffect(() => {
    const docId = searchParams.get("doc")
    if (docId) {
      const doc = documents.find((d) => d.id === docId)
      if (doc) {
        setSelectedDocument(doc)
      }
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = documents

    if (searchTerm) {
      filtered = filtered.filter(
        (doc) =>
          doc.title.includes(searchTerm) ||
          doc.description.includes(searchTerm) ||
          doc.tags.some((tag) => tag.includes(searchTerm)),
      )
    }

    if (selectedCategory !== "الكل") {
      filtered = filtered.filter((doc) => doc.category === selectedCategory)
    }

    setFilteredDocuments(filtered)
  }, [searchTerm, selectedCategory])

  const openDocument = (doc: Document) => {
    setSelectedDocument(doc)
    router.push(`/documents?doc=${doc.id}`, { scroll: false })
  }

  const closeDocument = () => {
    setSelectedDocument(null)
    router.push("/documents", { scroll: false })
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "أحكام قضائية": "bg-blue-100 text-blue-800",
      "مراسلات شخصية": "bg-green-100 text-green-800",
      "شعر وأدب": "bg-purple-100 text-purple-800",
      "فتاوى دينية": "bg-yellow-100 text-yellow-800",
      "مواد تعليمية": "bg-red-100 text-red-800",
      "وثائق إدارية": "bg-gray-100 text-gray-800",
      "مخطوطات علمية": "bg-indigo-100 text-indigo-800",
      "مراسلات علمية": "bg-teal-100 text-teal-800",
      "وثائق شخصية": "bg-pink-100 text-pink-800",
      "وثائق دينية": "bg-orange-100 text-orange-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: "#BF965A" }}></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-mud">
            وثائق الشيخ سليمان الكندي
          </h1>
          <p className="text-xl text-sand max-w-3xl mx-auto">
            مجموعة نادرة من الوثائق التاريخية والمخطوطات الأصلية للشيخ سليمان بن علي الكندي
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
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
                className="pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
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

        {/* Documents Grid - Masonry Layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="break-inside-avoid bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => openDocument(doc)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={doc.imageUrl || "/placeholder.svg?height=200&width=300"}
                  alt={doc.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-700 transition-colors">
                  {doc.title}
                </h3>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{doc.date}</span>
                </div>

                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{doc.description}</p>

                <div className="flex flex-wrap gap-1">
                  {doc.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3 ml-1" />
                      {tag}
                    </span>
                  ))}
                  {doc.tags.length > 3 && <span className="text-xs text-gray-500">+{doc.tags.length - 3}</span>}
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

      {/* Document Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedDocument.title}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedDocument.category)}`}
                >
                  {selectedDocument.category}
                </span>
              </div>
              <button onClick={closeDocument} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Document Image */}
                <div className="space-y-4">
                  <img
                    src={selectedDocument.imageUrl || "/placeholder.svg?height=400&width=600"}
                    alt={selectedDocument.title}
                    className="w-full rounded-lg shadow-lg"
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedDocument.date}</span>
                    </div>

                    <a
                      href={selectedDocument.downloadUrl}
                      download
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors hover:opacity-90"
                      style={{ backgroundColor: "#76424E" }}
                    >
                      <Download className="w-4 h-4 ml-2" />
                      تحميل الوثيقة
                    </a>
                  </div>
                </div>

                {/* Document Text */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">نص الوثيقة</h3>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {selectedDocument.textContent}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">الوصف</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedDocument.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">الكلمات المفتاحية</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDocument.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                        >
                          <Tag className="w-3 h-3 ml-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentsPage
