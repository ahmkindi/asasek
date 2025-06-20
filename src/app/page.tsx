"use client"

import Pattern from "@/components/pattern"

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle Islamic pattern background */}
        <Pattern />

        {/* Overlay geometric border elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Corner decorative elements */}
          <svg className="absolute top-0 left-0 w-32 h-32" viewBox="0 0 100 100">
            <g transform="translate(50,50)">
              <polygon
                points="0,-35 10,-10 35,0 10,10 0,35 -10,10 -35,0 -10,-10"
                fill="none"
                stroke="#8B4513"
                strokeWidth="2"
                opacity="0.4"
              />
              <circle cx="0" cy="0" r="15" fill="none" stroke="#CD853F" strokeWidth="1.5" opacity="0.5" />
            </g>
          </svg>

          <svg className="absolute top-0 right-0 w-32 h-32" viewBox="0 0 100 100">
            <g transform="translate(50,50) rotate(90)">
              <polygon
                points="0,-35 10,-10 35,0 10,10 0,35 -10,10 -35,0 -10,-10"
                fill="none"
                stroke="#8B4513"
                strokeWidth="2"
                opacity="0.4"
              />
              <circle cx="0" cy="0" r="15" fill="none" stroke="#CD853F" strokeWidth="1.5" opacity="0.5" />
            </g>
          </svg>

          <svg className="absolute bottom-0 left-0 w-32 h-32" viewBox="0 0 100 100">
            <g transform="translate(50,50) rotate(270)">
              <polygon
                points="0,-35 10,-10 35,0 10,10 0,35 -10,10 -35,0 -10,-10"
                fill="none"
                stroke="#8B4513"
                strokeWidth="2"
                opacity="0.4"
              />
              <circle cx="0" cy="0" r="15" fill="none" stroke="#CD853F" strokeWidth="1.5" opacity="0.5" />
            </g>
          </svg>

          <svg className="absolute bottom-0 right-0 w-32 h-32" viewBox="0 0 100 100">
            <g transform="translate(50,50) rotate(180)">
              <polygon
                points="0,-35 10,-10 35,0 10,10 0,35 -10,10 -35,0 -10,-10"
                fill="none"
                stroke="#8B4513"
                strokeWidth="2"
                opacity="0.4"
              />
              <circle cx="0" cy="0" r="15" fill="none" stroke="#CD853F" strokeWidth="1.5" opacity="0.5" />
            </g>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center py-12 sm:py-20">
            {/* Islamic decorative border */}
            <div className="flex items-center justify-center mb-8">
              <svg className="w-8 h-8 text-yellow-600 opacity-60" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
              <div className="w-32 h-1 mx-4" style={{ backgroundColor: "#BF965A" }}></div>
              <svg className="w-8 h-8 text-yellow-600 opacity-60" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
            </div>

            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4"
              style={{ color: "#76424E" }}
            >
              إرث سليمان
            </h1>

            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-1" style={{ backgroundColor: "#BF965A" }}></div>
              <svg className="w-6 h-6 mx-4 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 10v6m11-7h-6m-10 0H1m15.5-6.5l-4.24 4.24M7.76 7.76L3.52 3.52m12.96 12.96l-4.24-4.24M7.76 16.24L3.52 20.48" />
              </svg>
              <div className="w-16 h-1" style={{ backgroundColor: "#BF965A" }}></div>
            </div>

            <h2
              className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-8 font-medium"
            >
              ندوة الشيخ سليمان بن علي الكندي
            </h2>

            <p
              className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed px-4"
            >
              ندوة علمية تهدف إلى توثيق سيرة الشيخ سليمان بن علي الكندي وإبراز إسهاماته العلمية والاجتماعية والإصلاحية
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-base sm:text-lg">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
                <span className="font-semibold text-gray-800">
                  قلعة نخل، سلطنة عُمان
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
                <span className="font-semibold text-gray-800">
                  ديسمبر ٢٠٢٥
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="w-16 h-1 mb-6" style={{ backgroundColor: "#BF965A" }}></div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ color: "#76424E" }}
              >
                المقدمة
              </h2>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  الشيخ القاضي والأستاذ المربي سليمان بن علي بن سليمان بن محمد بن سعيد بن محمد بن سعيد بن محمد الكندي،
                  شخصية مهمة لها باعها الطويل ومكانتها العلمية والاجتماعية الثقافية، خلّف إرثاً يُفخر به ومخزوناً حضارياً
                  يُنقل من جيل إلى آخر.
                </p>

                <p>
                  توزيع مجالات البحث بين الباحثين سيساعد على إثراء النقاش وفتح آفاق بحثية جديدة، لضمان تحقيق مستوى يليق
                  بهذه الشخصية الفريدة.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=450&fit=crop"
                  alt="قلعة نخل التاريخية"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-white rounded-lg shadow-lg"
                style={{ backgroundColor: "#76424E" }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: "#BF965A" }}></div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ color: "#76424E" }}
            >
              أهداف الندوة
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                number: "01",
                title: "توثيق الحياة العلمية",
                description: "توثيق الحياة العلمية والعملية للشيخ سليمان بن علي الكندي",
              },
              {
                number: "02",
                title: "تعريف المجتمع",
                description: "تعريف المجتمع به كنموذج ملهم في طلب العلم والتعليم",
              },
              {
                number: "03",
                title: "إحياء الموروث الثقافي",
                description: "إحياء الموروث الثقافي والأخلاقي والعلمي",
              },
              {
                number: "04",
                title: "زيادة الوعي",
                description: "زيادة الوعي بأهمية الاتجاهات الإصلاحية والتطوعية",
              },
              {
                number: "05",
                title: "إبراز الحياة الفكرية",
                description: "إبراز طبيعة الحياة الفكرية والاجتماعية في عصره",
              },
              {
                number: "06",
                title: "تأكيد رؤية ٢٠٤٠",
                description: "تأكيد وترسيخ محاور وأهداف رؤية عُمان ٢٠٤٠",
              },
            ].map((objective, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 relative overflow-hidden"
                    style={{ backgroundColor: "#76424E" }}
                  >
                    {/* Islamic star pattern */}
                    <Pattern />
                    <span className="text-white font-bold text-sm relative z-10">
                      {objective.number}
                    </span>
                  </div>
                  <div
                    className="w-6 sm:w-8 h-1 group-hover:w-12 transition-all duration-300"
                    style={{ backgroundColor: "#BF965A" }}
                  ></div>
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold mb-3"
                  style={{ color: "#76424E" }}
                >
                  {objective.title}
                </h3>
                <p
                  className="text-gray-700 leading-relaxed text-sm sm:text-base"
                >
                  {objective.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-1 mx-auto mb-6" style={{ backgroundColor: "#BF965A" }}></div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-8"
              style={{ color: "#76424E" }}
            >
              محاور الندوة
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              أربعة محاور أساسية تشمل جميع جوانب حياة الشيخ العلمية والعملية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "القضاء والفقه",
                description: "دراسات في المسار القضائي والفقهي للشيخ وإسهاماته في علم الفقه",
              },
              {
                title: "المحور التربوي",
                description: "إسهاماته في التعليم والتربية ونشر العلم بين الناس",
              },
              {
                title: "الأدب والشعر",
                description: "أعماله الشعرية والأدبية ومساهماته في الأدب العربي",
              },
              {
                title: "مسارات الحياة",
                description: "الجهود العلمية ومحطات حياته من النشأة إلى الوفاة",
              },
            ].map((area, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-1 mb-6" style={{ backgroundColor: "#BF965A" }}></div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "#76424E" }}>
                  {area.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ backgroundColor: "#76424E" }}
      >
        {/* Islamic pattern background */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 200 200"> <defs>
            <pattern id="footerPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="33 13,23 5,15 15,15" fill="white" />
            </pattern>
          </defs>
            <rect width="100%" height="100%" fill="url(#footerPattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-lg mx-auto mb-6 flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: "#BF965A" }}
            >
              {/* Islamic geometric pattern */}
              <Pattern />
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              إرث سليمان
            </h3>

            <p className="text-lg text-gray-300 mb-6">
              ندوة الشيخ سليمان بن علي الكندي
            </p>

            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-1" style={{ backgroundColor: "#BF965A" }}></div>
              <Pattern />
              <div className="w-16 h-1" style={{ backgroundColor: "#BF965A" }}></div>
            </div>

            <p className="text-gray-300 text-base sm:text-lg mb-8">
              قلعة نخل، سلطنة عُمان • ديسمبر ٢٠٢٥
            </p>

            <div className="border-t border-gray-600 pt-8">
              <p className="text-gray-400 text-sm sm:text-base">
                © ٢٠٢٥ إرث سليمان • جميع الحقوق محفوظة
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
