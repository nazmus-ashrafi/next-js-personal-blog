"use client"

import Link from "next/link"
import moment from "moment"
import { Calendar, ArrowRight } from "lucide-react"
import type { ArticleItem } from "@/types"

interface ArticleCardProps {
    article: ArticleItem
    imageSrc?: string
    imageAlt?: string
}

const ArticleCard = ({ article, imageSrc, imageAlt }: ArticleCardProps) => {
    const formattedDate = moment(article.date, "DD-MM-YYYY").format("MMM D, YYYY")

    return (
        <Link
            href={`/${article.id}`}
            className="group block overflow-hidden rounded-xl border border-zinc-600 bg-zinc-800 shadow-lg transition-all duration-300 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-400/20 focus:outline-none focus-visible:border-sky-400"
        >
            {/* Image Section - Optional */}
            {imageSrc && (
                <div className="overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={imageAlt || article.title}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            )}

            {/* Content Section */}
            <div className="space-y-3 p-5">
                {/* Title */}
                <h3 className="text-xl font-semibold text-sky-100 transition-colors group-hover:text-sky-400">
                    {article.title}
                </h3>

                {/* Category & Subcategory Tags */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium text-sky-400 border border-zinc-600">
                        {article.category}
                    </span>
                    {article.subcategory && (
                        <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-400 border border-zinc-600">
                            {article.subcategory}
                        </span>
                    )}
                </div>

                {/* Date */}
                <div className="flex items-center justify-between pt-1">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Calendar className="h-3 w-3" />
                        {formattedDate}
                    </span>
                    <ArrowRight className="h-4 w-4 text-sky-400 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
            </div>
        </Link>
    )
}

export default ArticleCard
