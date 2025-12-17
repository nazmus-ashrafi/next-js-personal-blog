"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Folder, FolderOpen } from "lucide-react"
import SubcategoryGroup from "./SubcategoryGroup"
import type { CategoryWithSubcategories } from "@/types"
import Link from "next/link"
import moment from "moment"

interface Props {
    categoryData: CategoryWithSubcategories
    defaultExpanded?: boolean
}

const CategorySection = ({ categoryData, defaultExpanded = true }: Props) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded)

    return (
        <div className="flex flex-col gap-4 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Industrial Metal Header */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="relative flex items-center gap-4 text-left group w-full px-6 py-5 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 border-2 border-zinc-600 hover:border-zinc-500 transition-all duration-200"
            >
                {/* Decorative rivets */}
                <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gradient-radial from-zinc-500 to-zinc-700 shadow-inner" />
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-radial from-zinc-500 to-zinc-700 shadow-inner" />
                <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-gradient-radial from-zinc-500 to-zinc-700 shadow-inner" />
                <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-gradient-radial from-zinc-500 to-zinc-700 shadow-inner" />

                {/* Folder icon */}
                {isExpanded ? (
                    <FolderOpen className="h-7 w-7 text-sky-400 drop-shadow-lg" />
                ) : (
                    <Folder className="h-7 w-7 text-zinc-400 group-hover:text-sky-400 transition-colors" />
                )}

                {/* Category title */}
                <h2 className="flex-1 font-bold text-3xl tracking-wider uppercase text-sky-100 drop-shadow-md group-hover:text-sky-200 transition-colors" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                    {categoryData.category}
                </h2>

                {/* Expand/collapse chevron */}
                {isExpanded ? (
                    <ChevronDown className="h-6 w-6 text-zinc-300" />
                ) : (
                    <ChevronRight className="h-6 w-6 text-zinc-400" />
                )}
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="flex flex-col gap-8 px-6 py-6 bg-zinc-800 border-2 border-zinc-600">
                    {/* Uncategorized articles (no subcategory) */}
                    {categoryData.uncategorizedArticles.length > 0 && (
                        <div className="flex flex-col gap-3 pl-4 border-l-2 border-zinc-600">
                            {categoryData.uncategorizedArticles.map((article) => {
                                const formattedDate = moment(article.date, "DD-MM-YYYY").format("MMM D, YYYY")

                                return (
                                    <div key={article.id} className="flex items-start gap-3 group">
                                        <span className="text-sky-500 text-lg mt-0.5 group-hover:text-sky-300 transition-colors">→</span>

                                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                            <Link
                                                href={`/${article.id}`}
                                                className="font-poppins text-lg text-sky-100 hover:text-sky-300 hover:underline transition duration-150 flex-1"
                                            >
                                                {article.title}
                                            </Link>

                                            <span className="font-poppins text-sm text-zinc-400 whitespace-nowrap bg-zinc-900 px-3 py-1 rounded-full border border-zinc-700">
                                                {formattedDate}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Subcategories with timeline */}
                    {categoryData.subcategories.map((subcategoryGroup) => (
                        <SubcategoryGroup
                            key={subcategoryGroup.subcategory}
                            subcategoryGroup={subcategoryGroup}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategorySection
