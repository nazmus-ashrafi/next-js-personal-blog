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
                className="relative flex items-center gap-4 text-left group w-full px-6 py-5 bg-gradient-to-br from-stone-700 via-stone-800 to-stone-900 border-2 border-stone-600 hover:border-stone-500 transition-all duration-200"
            >
                {/* Decorative rivets */}
                <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-gradient-radial from-stone-500 to-stone-700 shadow-inner" />
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-gradient-radial from-stone-500 to-stone-700 shadow-inner" />
                <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-gradient-radial from-stone-500 to-stone-700 shadow-inner" />
                <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-gradient-radial from-stone-500 to-stone-700 shadow-inner" />

                {/* Folder icon */}
                {isExpanded ? (
                    <FolderOpen className="h-7 w-7 text-amber-500 drop-shadow-lg" />
                ) : (
                    <Folder className="h-7 w-7 text-stone-400 group-hover:text-amber-500 transition-colors" />
                )}

                {/* Category title */}
                <h2 className="flex-1 font-bold text-3xl tracking-wider uppercase text-stone-100 drop-shadow-md group-hover:text-amber-100 transition-colors" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                    {categoryData.category}
                </h2>

                {/* Expand/collapse chevron */}
                {isExpanded ? (
                    <ChevronDown className="h-6 w-6 text-stone-300" />
                ) : (
                    <ChevronRight className="h-6 w-6 text-stone-400" />
                )}
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="flex flex-col gap-8 px-6 py-6 bg-white border-2 border-stone-200">
                    {/* Uncategorized articles (no subcategory) */}
                    {categoryData.uncategorizedArticles.length > 0 && (
                        <div className="flex flex-col gap-3 pl-4 border-l-2 border-stone-300">
                            {categoryData.uncategorizedArticles.map((article) => {
                                const formattedDate = moment(article.date, "DD-MM-YYYY").format("MMM D, YYYY")

                                return (
                                    <div key={article.id} className="flex items-start gap-3 group">
                                        <span className="text-stone-400 text-lg mt-0.5 group-hover:text-amber-600 transition-colors">→</span>

                                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                            <Link
                                                href={`/${article.id}`}
                                                className="font-poppins text-lg text-neutral-900 hover:text-amber-700 hover:underline transition duration-150 flex-1"
                                            >
                                                {article.title}
                                            </Link>

                                            <span className="font-poppins text-sm text-stone-500 whitespace-nowrap bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
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
