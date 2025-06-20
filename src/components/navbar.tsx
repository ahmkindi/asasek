"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Menu, X, Home, Calendar, FileText } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const researchPapers = [
    "الشيخ سليمان الكندي قاضياً وفقيهاً",
    "الحياة الاجتماعية للشيخ سليمان الكندي",
    "دراسة في شعر الشيخ سليمان الكندي",
    "الحجاج في الأحكام القضائية للشيخ سليمان الكندي",
    "الشيخ سليمان الكندي النشأة والتكوين",
    "الأثر التربوي للشيخ سليمان الكندي",
    "رسائل وقصائد الشيخ سليمان: دراسة فنية",
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" : "bg-white/90 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center ml-3 relative overflow-hidden"
              style={{ backgroundColor: "#76424E" }}
            >
              {/* Islamic geometric pattern */}
              <div className="w-8 h-8 border-2 border-white rounded-sm flex items-center justify-center relative z-10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Amiri, serif" }}>
                إرث سليمان
              </h1>
              <p className="text-xs text-gray-600" style={{ fontFamily: "Amiri, serif" }}>
                ندوة علمية
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <a
              href="#home"
              className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors relative group"
              style={{ fontFamily: "Amiri, serif" }}
            >
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent group-hover:w-full transition-all duration-300"></span>
            </a>

            <div className="relative group">
              <button
                className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors relative"
                style={{ fontFamily: "Amiri, serif" }}
                onMouseEnter={() => setDropdownOpen(true)}
              >
                <Calendar className="w-4 h-4 ml-2" />
                الجدول
                <ChevronDown className="w-4 h-4 mr-1 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent group-hover:w-full transition-all duration-300"></span>
              </button>

              <div
                className={`absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 transition-all duration-200 ${dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                  }`}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <h3
                    className="text-sm font-semibold text-gray-900 flex items-center"
                    style={{ fontFamily: "Amiri, serif" }}
                  >
                    <svg className="w-4 h-4 ml-2 opacity-60" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                    </svg>
                    الأوراق البحثية
                  </h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {researchPapers.map((paper, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-r-2 border-transparent hover:border-yellow-600"
                      style={{ fontFamily: "Amiri, serif" }}
                    >
                      <div className="flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-3 opacity-60"
                          style={{ backgroundColor: "#BF965A" }}
                        ></div>
                        {paper}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="#documents"
              className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors relative group"
              style={{ fontFamily: "Amiri, serif" }}
            >
              <FileText className="w-4 h-4 ml-2" />
              الوثائق
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-600 to-transparent group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#home"
              className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-3 rounded-md text-sm font-medium transition-colors"
              style={{ fontFamily: "Amiri, serif" }}
              onClick={() => setIsOpen(false)}
            >
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
            </a>

            <div className="px-3 py-2">
              <div
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2"
                style={{ fontFamily: "Amiri, serif" }}
              >
                الأوراق البحثية
              </div>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {researchPapers.slice(0, 5).map((paper, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-gray-600 hover:text-gray-900 py-2 text-sm border-r-2 border-transparent hover:border-yellow-600 pr-4 transition-colors"
                    style={{ fontFamily: "Amiri, serif" }}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <div
                        className="w-1.5 h-1.5 rounded-full mr-2 opacity-60"
                        style={{ backgroundColor: "#BF965A" }}
                      ></div>
                      {paper}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#documents"
              className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-3 rounded-md text-sm font-medium transition-colors"
              style={{ fontFamily: "Amiri, serif" }}
              onClick={() => setIsOpen(false)}
            >
              <FileText className="w-4 h-4 ml-2" />
              الوثائق
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
