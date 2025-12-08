"use client"

import Link from "next/link"
import moment from "moment"
import type { HierarchicalArticles } from "@/types"
import {
    TreeProvider,
    TreeView,
    TreeNode,
    TreeNodeTrigger,
    TreeNodeContent,
    TreeExpander,
    TreeIcon,
    TreeLabel,
} from "@/components/kibo-ui/tree"
import { Folder, FolderOpen, FileText, Calendar } from "lucide-react"

interface Props {
    hierarchicalArticles: HierarchicalArticles
}

const CategoryTree = ({ hierarchicalArticles }: Props) => {
    // Get all category IDs for default expansion
    const defaultExpandedIds = hierarchicalArticles.map((cat) => cat.category)

    return (
        <TreeProvider
            defaultExpandedIds={defaultExpandedIds}
            showLines={true}
            showIcons={true}
            selectable={false}
            indent={24}
            animateExpand={true}
            className="w-full"
        >
            <TreeView className="rounded-xl border border-stone-700 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-6 shadow-2xl">
                {hierarchicalArticles.map((categoryData) => {
                    const hasContent =
                        categoryData.subcategories.length > 0 ||
                        categoryData.uncategorizedArticles.length > 0

                    return (
                        <TreeNode
                            key={categoryData.category}
                            nodeId={categoryData.category}
                            level={0}
                            isLast={false}
                        >
                            {/* Category Header */}
                            <TreeNodeTrigger>
                                <TreeExpander hasChildren={hasContent} />
                                <TreeIcon
                                    hasChildren={hasContent}
                                    icon={
                                        hasContent ? (
                                            <Folder className="h-6 w-6 text-amber-500" />
                                        ) : (
                                            <FolderOpen className="h-6 w-6 text-amber-500" />
                                        )
                                    }
                                />
                                <TreeLabel
                                    className="text-2xl font-semibold text-stone-100 tracking-tight"
                                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}
                                >
                                    {categoryData.category}
                                </TreeLabel>
                            </TreeNodeTrigger>

                            {/* Category Content */}
                            <TreeNodeContent hasChildren={hasContent}>
                                {/* Uncategorized articles */}
                                {categoryData.uncategorizedArticles.map((article, index) => {
                                    const formattedDate = moment(article.date, "DD-MM-YYYY").format(
                                        "MMM D, YYYY"
                                    )
                                    const isLast =
                                        index === categoryData.uncategorizedArticles.length - 1 &&
                                        categoryData.subcategories.length === 0

                                    return (
                                        <TreeNode
                                            key={article.id}
                                            nodeId={`article-${article.id}`}
                                            level={1}
                                            isLast={isLast}
                                        >
                                            <Link href={`/${article.id}`} className="block">
                                                <TreeNodeTrigger className="hover:bg-stone-700/50 transition-colors">
                                                    <TreeExpander hasChildren={false} />
                                                    <TreeIcon
                                                        hasChildren={false}
                                                        icon={<FileText className="h-4 w-4 text-stone-400" />}
                                                    />
                                                    <div className="flex flex-1 items-center justify-between gap-4">
                                                        <TreeLabel
                                                            className="text-base text-stone-200 hover:text-amber-400 transition-colors"
                                                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}
                                                        >
                                                            {article.title}
                                                        </TreeLabel>
                                                        <span
                                                            className="flex items-center gap-1.5 text-xs text-stone-500 whitespace-nowrap"
                                                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}
                                                        >
                                                            <Calendar className="h-3 w-3" />
                                                            {formattedDate}
                                                        </span>
                                                    </div>
                                                </TreeNodeTrigger>
                                            </Link>
                                        </TreeNode>
                                    )
                                })}

                                {/* Subcategories */}
                                {categoryData.subcategories.map((subcategoryGroup, subIndex) => {
                                    const isLastSubcategory =
                                        subIndex === categoryData.subcategories.length - 1

                                    return (
                                        <TreeNode
                                            key={subcategoryGroup.subcategory}
                                            nodeId={`${categoryData.category}-${subcategoryGroup.subcategory}`}
                                            level={1}
                                            isLast={isLastSubcategory}
                                        >
                                            {/* Subcategory Header */}
                                            <TreeNodeTrigger>
                                                <TreeExpander hasChildren={true} />
                                                <TreeIcon
                                                    hasChildren={true}
                                                    icon={<Folder className="h-4 w-4 text-amber-400" />}
                                                />
                                                <TreeLabel
                                                    className="text-lg font-medium text-stone-300"
                                                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif' }}
                                                >
                                                    {subcategoryGroup.subcategory}
                                                </TreeLabel>
                                            </TreeNodeTrigger>

                                            {/* Articles in subcategory */}
                                            <TreeNodeContent hasChildren={true}>
                                                {subcategoryGroup.articles.map((article, articleIndex) => {
                                                    const formattedDate = moment(
                                                        article.date,
                                                        "DD-MM-YYYY"
                                                    ).format("MMM D, YYYY")
                                                    const isLastArticle =
                                                        articleIndex === subcategoryGroup.articles.length - 1

                                                    return (
                                                        <TreeNode
                                                            key={article.id}
                                                            nodeId={`article-${article.id}`}
                                                            level={2}
                                                            isLast={isLastArticle}
                                                        >
                                                            <Link href={`/${article.id}`} className="block">
                                                                <TreeNodeTrigger className="hover:bg-stone-700/50 transition-colors">
                                                                    <TreeExpander hasChildren={false} />
                                                                    <TreeIcon
                                                                        hasChildren={false}
                                                                        icon={
                                                                            <FileText className="h-4 w-4 text-stone-400" />
                                                                        }
                                                                    />
                                                                    <div className="flex flex-1 items-center justify-between gap-4">
                                                                        <TreeLabel
                                                                            className="text-base text-stone-200 hover:text-amber-400 transition-colors"
                                                                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}
                                                                        >
                                                                            {article.title}
                                                                        </TreeLabel>
                                                                        <span
                                                                            className="flex items-center gap-1.5 text-xs text-stone-500 whitespace-nowrap"
                                                                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}
                                                                        >
                                                                            <Calendar className="h-3 w-3" />
                                                                            {formattedDate}
                                                                        </span>
                                                                    </div>
                                                                </TreeNodeTrigger>
                                                            </Link>
                                                        </TreeNode>
                                                    )
                                                })}
                                            </TreeNodeContent>
                                        </TreeNode>
                                    )
                                })}
                            </TreeNodeContent>
                        </TreeNode>
                    )
                })}
            </TreeView>
        </TreeProvider>
    )
}

export default CategoryTree
