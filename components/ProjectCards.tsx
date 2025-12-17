"use client"

import { useState } from "react"
import Link from "next/link"
import moment from "moment"
import { Folder, FolderOpen, FileText, Calendar, ChevronDown, ChevronRight } from "lucide-react"
import type { HierarchicalArticles } from "@/types"

interface ProjectCardsProps {
    hierarchicalArticles: HierarchicalArticles
}

interface ProjectCard {
    id: string
    title: string
    category: string
    articles: Array<{
        id: string
        title: string
        date: string
        category: string
        subcategory?: string
    }>
    type: 'category' | 'subcategory'
}


interface ProjectMetadata {
    title: string
    description: string
    tags: string[]
    image?: string
    live?: string
}

const PROJECT_METADATA: Record<string, ProjectMetadata> = {
    // Project metadata mapping - keys should match project titles (case-insensitive partial match supported)
    "ProfEmail": {
        title: "ProfEmail",
        description: "Full-stack email assistant with OAuth2 multi-account authentication and AI-powered triage",
        tags: ["Python", "FastAPI", "React", "Next.js", "TypeScript", "LangGraph", "PostgreSQL"],
        image: "/proj1_profEmail_images/profemail.png",
        live: "https://ai-email-coach-web-app.vercel.app"
    },
    "Multi-Agent Systems Blog": {
        title: "Multi-Agent Systems Blog",
        description: "Blog about multi-agent systems",
        tags: ["LLMs", "Multi-Agent LLM Systems", "Reasoning for LLMs"],
        image: "/multiagents_images/agent.png"
    },
    "This Website": {
        title: "This Website",
        description: "Personal blog and portfolio built with modern web technologies",
        tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Markdown"],
        image: "/portfolio_images/portfolio.png"
    }
}

const getMetadata = (title: string): ProjectMetadata | undefined => {
    // Exact match
    if (PROJECT_METADATA[title]) return PROJECT_METADATA[title]

    // Case-insensitive match
    const lowerTitle = title.toLowerCase()
    const key = Object.keys(PROJECT_METADATA).find(k => lowerTitle.includes(k.toLowerCase()))
    return key ? PROJECT_METADATA[key] : undefined
}

const ProjectCards = ({ hierarchicalArticles }: ProjectCardsProps) => {
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

    const toggleCard = (cardId: string) => {
        console.log('Toggling card:', cardId)
        setExpandedCards((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(cardId)) {
                newSet.delete(cardId)
            } else {
                newSet.add(cardId)
            }
            console.log('Expanded cards:', Array.from(newSet))
            return newSet
        })
    }

    // Flatten the hierarchical structure into project cards
    const projectCards: ProjectCard[] = hierarchicalArticles.flatMap((categoryData, categoryIndex) => {
        const cards: ProjectCard[] = []

        // Add subcategories as individual project cards
        categoryData.subcategories.forEach((subcategoryGroup, subIndex) => {
            // Use metadata title if available, otherwise use subcategory name
            const metadata = getMetadata(subcategoryGroup.subcategory)
            const displayTitle = metadata?.title || subcategoryGroup.subcategory

            cards.push({
                id: `cat-${categoryIndex}-sub-${subIndex}`,
                title: displayTitle,
                category: categoryData.category,
                articles: subcategoryGroup.articles,
                type: 'subcategory' as const,
            })
        })

        // Add uncategorized articles under the category itself
        if (categoryData.uncategorizedArticles.length > 0) {
            cards.push({
                id: `cat-${categoryIndex}-uncat`,
                title: categoryData.category,
                category: categoryData.category,
                articles: categoryData.uncategorizedArticles,
                type: 'category' as const,
            })
        }

        return cards
    })

    // Debug: Log all card IDs
    console.log('All project card IDs:', projectCards.map(p => ({ id: p.id, title: p.title })))

    return (
        <section className="px-4 py-8 md:px-0">
            {/* Header */}
            <div className="mb-8">
                <h2 className="flex items-center gap-3 text-2xl font-semibold text-sky-100 md:text-3xl">
                    <Folder size={28} className="text-sky-400" />
                    <span>Projects & Articles</span>
                </h2>
                <p className="mt-2 text-sky-200">
                    Click on any project to explore its articles
                </p>
            </div>

            {/* Grid of Project Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
                {projectCards.map((project) => {
                    const isExpanded = expandedCards.has(project.id)
                    const articleCount = project.articles.length

                    return (
                        <div
                            key={project.id}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-600 bg-zinc-800 shadow-xl transition-all duration-300 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-400/20"
                        >
                            {/* Card Content */}

                            {/* Top Image/Gradient Section */}
                            <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
                                {getMetadata(project.title)?.image ? (
                                    <img
                                        src={getMetadata(project.title)!.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 relative">
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute inset-0" style={{
                                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)',
                                                backgroundSize: '32px 32px'
                                            }} />
                                        </div>
                                        <div className="flex h-full items-center justify-center">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-500 shadow-lg shadow-sky-400/30">
                                                {isExpanded ? (
                                                    <FolderOpen className="h-8 w-8 text-white" />
                                                ) : (
                                                    <Folder className="h-8 w-8 text-white" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Body Content */}
                            <div className="flex flex-col gap-3 p-6 bg-zinc-800 border-b border-zinc-700">
                                {/* Title */}
                                {/* Title and Live Button */}
                                <div className="flex items-center justify-between gap-2">
                                    <h3
                                        className="text-xl font-bold text-sky-100"
                                        style={{
                                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                                        }}
                                    >
                                        {project.title}
                                    </h3>
                                    {getMetadata(project.title)?.live && (
                                        <a
                                            href={getMetadata(project.title)?.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                                        >
                                            Live
                                        </a>
                                    )}
                                </div>

                                {/* Description */}
                                {getMetadata(project.title)?.description && (
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        {getMetadata(project.title)?.description}
                                    </p>
                                )}

                                {/* Tags */}
                                {getMetadata(project.title)?.tags && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {getMetadata(project.title)?.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center rounded-md bg-zinc-700/50 px-2 py-1 text-xs font-medium text-sky-200 ring-1 ring-inset ring-zinc-700/50"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Fallback for no description: Show category if subcategory */}
                                {!getMetadata(project.title)?.description && project.type === 'subcategory' && (
                                    <p className="text-sm text-zinc-500">
                                        {project.category}
                                    </p>
                                )}
                            </div>

                            {/* Bottom Section - Description & Expandable Articles */}
                            <div className="bg-zinc-800/80 backdrop-blur-sm mt-auto">
                                {/* Click to expand button */}
                                <button
                                    onClick={() => toggleCard(project.id)}
                                    className="w-full border-b border-zinc-700 p-6 text-left transition-all duration-200 hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-inset"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <p className="text-sm text-zinc-400">
                                                {isExpanded ? 'Hide articles' : 'View articles'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="rounded-full bg-sky-900/30 px-3 py-1 text-xs font-semibold text-sky-400 border border-sky-800/50">
                                                {articleCount}
                                            </span>
                                            {isExpanded ? (
                                                <ChevronDown className="h-5 w-5 text-sky-500 transition-transform duration-200" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-zinc-500 transition-transform duration-200 group-hover:text-sky-500" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Expandable Article List */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="p-4 space-y-2">
                                        {project.articles.map((article) => {
                                            const formattedDate = moment(article.date, "DD-MM-YYYY").format(
                                                "MMM D, YYYY"
                                            )

                                            return (
                                                <Link
                                                    key={article.id}
                                                    href={`/${article.id}`}
                                                    className="group/article flex items-start gap-3 rounded-lg border border-zinc-700 bg-zinc-700/50 p-3 transition-all duration-200 hover:border-sky-500/50 hover:bg-sky-900/20 hover:shadow-md"
                                                >
                                                    <FileText className="h-4 w-4 text-zinc-500 flex-shrink-0 mt-0.5 transition-colors group-hover/article:text-sky-400" />
                                                    <div className="flex-1 min-w-0">
                                                        <p
                                                            className="text-sm font-medium text-sky-100 transition-colors group-hover/article:text-sky-300 line-clamp-2"
                                                            style={{
                                                                fontFamily:
                                                                    '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
                                                            }}
                                                        >
                                                            {article.title}
                                                        </p>
                                                        <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
                                                            <Calendar className="h-3 w-3" />
                                                            {formattedDate}
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default ProjectCards
