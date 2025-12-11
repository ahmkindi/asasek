"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import OrderFormModal from "@/components/OrderFormModal"

export default function OrderBookButton() {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)

  // Check if order button should be hidden
  const hideOrderButton = process.env.NEXT_PUBLIC_HIDE_ORDER_BUTTON === "true"

  if (hideOrderButton) return null

  return (
    <>
      <button
        onClick={() => setIsOrderFormOpen(true)}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sand text-mud rounded-full text-lg font-bold hover:opacity-90 transition-opacity cursor-pointer"
      >
        <BookOpen className="w-6 h-6" />
        <span>اطلب نسختك من الكتاب</span>
      </button>

      <OrderFormModal isOpen={isOrderFormOpen} onClose={() => setIsOrderFormOpen(false)} />
    </>
  )
}
