"use client"

import { X } from "lucide-react"

interface OrderFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function OrderFormModal({ isOpen, onClose }: OrderFormModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-sand rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 rounded-full bg-mud text-sand hover:opacity-80 transition-opacity cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="bg-mud text-sand py-4 px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold">اطلـــــب نسختـــــك من الكتـــــاب</h2>
        </div>

        {/* Google Form iframe */}
        <div className="w-full overflow-y-auto" style={{ height: 'calc(90vh - 80px)' }}>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd0hQOTi5NFQfksPMS0VOrE2GRvOdWWpR9WyaXlGmNxC3yo_A/viewform?embedded=true&hl=ar"
            width="100%"
            height="890"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="w-full min-h-[800px]"
          >
            جاري التحميل...
          </iframe>
        </div>
      </div>
    </div>
  )
}
