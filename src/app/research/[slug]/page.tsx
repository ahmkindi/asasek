import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPaperBySlug } from "../researchData"
import OrderBookButton from "./OrderBookButton"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ResearchPaperPage({ params }: PageProps) {
  const { slug } = await params
  const paper = getPaperBySlug(slug)

  if (!paper) {
    notFound()
  }

  const hasMultipleAuthors = paper.authors.length > 1

  return (
    <div className="inverted-nav relative min-h-screen bg-mud overflow-hidden" dir="rtl">
      {/* Background Image */}
      <Image
        src="/mud-bg.webp"
        alt=""
        fill
        className="object-cover object-[center_15%] z-0"
        priority
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pointer-events-auto">
        {/* Header */}
        <div className="rounded-lg p-8 mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-sand mb-6">{paper.title}</h1>

          <div className="flex w-full items-center justify-center gap-4 md:gap-8 mb-6">
            {paper.authors.map((author, index) => (
              <h3 key={index} className="text-xl text-wrap md:text-2xl font-bold text-sand">
                {author.name}
              </h3>
            ))}
          </div>
        </div>

        {/* Summary - respecting paragraphs */}
        <div className="space-y-6 mb-12">
          {paper.summary.map((paragraph, index) => (
            <p key={index} className="text-sand leading-10 md:leading-12 text-xl md:text-2xl text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Cards */}
        <div className={`flex flex-col ${hasMultipleAuthors ? 'md:flex-row' : ''} gap-6 mb-12`}>
          {paper.authors.map((author, index) => (
            <div key={index} className={`${hasMultipleAuthors ? 'flex-1' : 'w-full'} bg-mud rounded-lg p-6`}>
              <h4 className="text-xl md:text-2xl font-bold text-sand mb-4 text-center">{author.name}</h4>
              <p className="text-sand text-lg md:text-xl leading-relaxed text-justify">{author.summary}</p>
            </div>
          ))}
        </div>

        {/* Back to all research and Order Book buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/research"
            className="inline-flex items-center justify-center px-8 py-4 bg-sand text-mud rounded-full text-lg font-bold hover:opacity-90 transition-opacity cursor-pointer"
          >
            جميع البحوث العلمية
          </Link>
          <OrderBookButton />
        </div>
      </div>
    </div>
  )
}
