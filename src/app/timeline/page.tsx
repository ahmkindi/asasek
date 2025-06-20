"use client"

import type React from "react"
import { Suspense } from "react"
import TimelineContent from "./timeline-content"

const TimelineLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Skeleton */}
        <div className="text-center mb-12 md:mb-20 px-4">
          <div className="w-16 md:w-20 h-1 mx-auto mb-6 md:mb-8 bg-gray-300 animate-pulse"></div>
          <div className="h-12 md:h-16 bg-gray-300 animate-pulse rounded-lg mb-6 md:mb-8 max-w-2xl mx-auto"></div>
          <div className="h-6 md:h-8 bg-gray-200 animate-pulse rounded-lg max-w-4xl mx-auto"></div>
        </div>

        {/* Quick Navigation Skeleton */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 md:p-8 mb-8 md:mb-16">
          <div className="h-6 md:h-8 bg-gray-300 animate-pulse rounded-lg mb-4 md:mb-6 max-w-xs mx-auto"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-16 md:h-20 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Timeline Items Skeleton */}
        <div className="space-y-8 md:space-y-16">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-20 h-12 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="w-4 h-4 bg-gray-400 animate-pulse rounded-full mt-3"></div>
              <div className="flex-1 bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <div className="h-6 bg-gray-300 animate-pulse rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const TimelinePage = () => {
  return (
    <Suspense fallback={<TimelineLoading />}>
      <TimelineContent />
    </Suspense>
  )
}

export default TimelinePage
