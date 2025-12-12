"use client"

import { useEffect } from "react"

export default function LivePage() {
  const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_LIVE_URL

  useEffect(() => {
    if (youtubeUrl) {
      window.location.href = youtubeUrl
    }
  }, [youtubeUrl])

  return (
    <div className="min-h-screen flex items-center justify-center bg-mud" dir="rtl">
      <div className="text-sand text-2xl">جاري التحويل...</div>
    </div>
  )
}
