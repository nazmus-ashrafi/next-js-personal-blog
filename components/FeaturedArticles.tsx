"use client"

import { Star, ArrowRight } from "lucide-react"
import ArticleCard from "./ArticleCard"
import type { ArticleItem } from "@/types"

interface FeaturedArticlesProps {
    articles: ArticleItem[]
    maxArticles?: number
    title?: string
}

const FeaturedArticles = ({
    articles,
    maxArticles = 6,
    title = "Featured Articles"
}: FeaturedArticlesProps) => {
    // Limit articles to maxArticles
    const displayedArticles = articles.slice(0, maxArticles)

    if (displayedArticles.length === 0) {
        return null
    }

    return (
        <section className="px-4 py-8 md:px-0">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
                <h2 className="flex items-center gap-3 text-2xl font-semibold text-sky-100 md:text-3xl">
                    <Star size={28} className="text-sky-400" />
                    <span>{title}</span>
                </h2>
                <a
                    href="#all-articles"
                    className="group hidden items-center gap-1 text-sm text-sky-400/90 hover:text-sky-300 sm:inline-flex"
                >
                    <span>View all</span>
                    <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                </a>
            </div>

            {/* Grid of Article Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>

            {/* Mobile "View all" link */}
            <div className="mt-6 text-center sm:hidden">
                <a
                    href="#all-articles"
                    className="group inline-flex items-center gap-1 text-sm text-sky-400 hover:underline"
                >
                    <span>View all articles</span>
                    <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                </a>
            </div>
        </section>
    )
}

export default FeaturedArticles
