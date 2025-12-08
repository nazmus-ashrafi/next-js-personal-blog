import Link from "next/link"
import { FileText } from "lucide-react"
import type { SubcategoryGroup as SubcategoryGroupType } from "@/types"
import moment from "moment"

interface Props {
    subcategoryGroup: SubcategoryGroupType
}

const SubcategoryGroup = ({ subcategoryGroup }: Props) => {
    return (
        <div className="relative flex flex-col gap-3 pl-8">
            {/* Timeline vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-stone-400 to-stone-300" />

            {/* Timeline node (circle) */}
            <div className="absolute left-[-8px] top-2 w-5 h-5 rounded-full bg-amber-500 border-[3px] border-stone-800 shadow-lg shadow-amber-500/30" />

            {/* Subcategory Title */}
            <h3 className="font-cormorantGaramond text-2xl text-stone-800 flex items-center gap-3 font-semibold">
                <FileText className="h-5 w-5 text-amber-600" />
                {subcategoryGroup.subcategory}
            </h3>

            {/* Articles in subcategory */}
            <div className="flex flex-col gap-2.5 ml-8 border-l-2 border-amber-200 pl-4">
                {subcategoryGroup.articles.map((article) => {
                    // Format the date
                    const formattedDate = moment(article.date, "DD-MM-YYYY").format("MMM D, YYYY")

                    return (
                        <div key={article.id} className="flex items-start gap-3 group">
                            {/* Arrow connector */}
                            <span className="text-amber-500 text-lg mt-0.5 group-hover:text-amber-600 transition-colors">→</span>

                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                {/* Article title */}
                                <Link
                                    href={`/${article.id}`}
                                    className="font-poppins text-lg text-neutral-900 hover:text-amber-700 hover:underline transition duration-150 flex-1"
                                >
                                    {article.title}
                                </Link>

                                {/* Date badge */}
                                <span className="font-poppins text-sm text-stone-500 whitespace-nowrap bg-stone-100 px-3 py-1 rounded-full border border-stone-200">
                                    {formattedDate}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SubcategoryGroup
