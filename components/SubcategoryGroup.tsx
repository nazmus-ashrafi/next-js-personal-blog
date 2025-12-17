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
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-zinc-500 to-zinc-400" />

            {/* Timeline node (circle) */}
            <div className="absolute left-[-8px] top-2 w-5 h-5 rounded-full bg-sky-400 border-[3px] border-zinc-700 shadow-lg shadow-sky-400/30" />

            {/* Subcategory Title */}
            <h3 className="font-cormorantGaramond text-2xl text-sky-100 flex items-center gap-3 font-semibold">
                <FileText className="h-5 w-5 text-sky-400" />
                {subcategoryGroup.subcategory}
            </h3>

            {/* Articles in subcategory */}
            <div className="flex flex-col gap-2.5 ml-8 border-l-2 border-zinc-700 pl-4">
                {subcategoryGroup.articles.map((article) => {
                    // Format the date
                    const formattedDate = moment(article.date, "DD-MM-YYYY").format("MMM D, YYYY")

                    return (
                        <div key={article.id} className="flex items-start gap-3 group">
                            {/* Arrow connector */}
                            <span className="text-sky-400 text-lg mt-0.5 group-hover:text-sky-300 transition-colors">→</span>

                            <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                {/* Article title */}
                                <Link
                                    href={`/${article.id}`}
                                    className="font-poppins text-lg text-sky-100 hover:text-sky-300 hover:underline transition duration-150 flex-1"
                                >
                                    {article.title}
                                </Link>

                                {/* Date badge */}
                                <span className="font-poppins text-sm text-zinc-400 whitespace-nowrap bg-zinc-900 px-3 py-1 rounded-full border border-zinc-700">
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
