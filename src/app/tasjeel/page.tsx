"use client"

import { useEffect } from 'react'

export default function TasjeelPage() {
  useEffect(() => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSc1jlwBPlTGCJ_ZpuG9ychcVaW1HlYxTfGVmXhVK1LaywGW9Q/viewform?usp=sharing&ouid=104324624653678721528'
  }, [])

  return (
    <div className="min-h-screen bg-mud flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sand mx-auto mb-4"></div>
        <p className="text-sand text-xl">يتم توجيهك إلى صفحة التسجيل...</p>
        <p className="text-[#D9A566] text-sm mt-2">
          إذا لم يتم التوجيه تلقائياً، 
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSc1jlwBPlTGCJ_ZpuG9ychcVaW1HlYxTfGVmXhVK1LaywGW9Q/viewform?usp=sharing&ouid=104324624653678721528"
            className="underline hover:text-sand transition-colors mr-1"
          >
            اضغط هنا
          </a>
        </p>
      </div>
    </div>
  )
}