"use client"

import { useState } from "react"
import Link from "next/link"
import moment from "moment"
import { Folder, FolderOpen, FileText, Calendar, ChevronDown, ChevronRight, GraduationCap, ExternalLink, Github, Video } from "lucide-react"
import type { HierarchicalArticles } from "@/types"
import VideoModal from "./VideoModal"

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
    github?: string
    video?: string        // YouTube video URL
    // Paper-specific fields
    paper?: {
        pdf?: string          // Link to PDF
        arxiv?: string        // arXiv link
        doi?: string          // DOI link
        ieee?: string         // IEEE Xplore link
        venue?: string        // Conference/Journal name
        year?: number         // Publication year
        authors?: string[]    // Co-authors (full names)
        status?: 'published' | 'preprint' | 'under-review' | 'draft'
    }
}

const PROJECT_METADATA: Record<string, ProjectMetadata> = {
    // Project metadata mapping - keys should match project titles (case-insensitive partial match supported)
    "ProfEmail": {
        title: "ProfEmail",
        description: "Full-stack email assistant with OAuth2 multi-account authentication and AI-powered triage",
        tags: ["Python", "FastAPI", "React", "Next.js", "TypeScript", "LangGraph", "PostgreSQL"],
        image: "/proj1_profEmail_images/profemail.png",
        live: "https://ai-email-coach-web-app.vercel.app",
        github: "https://github.com/nazmus-ashrafi/AIEmailCoach-WebApp",
        video: "https://www.youtube.com/watch?v=BoGG3bLY-7A"
    },
    "Paper on LLM Code Generation": {
        title: "Enhancing LLM Code Generation: Multi-Agent Collaboration and Runtime Debugging",
        description: "An academic paper on systematic evaluation of multi-agent collaboration and runtime debugging for enhancing LLM code generation capabilities",
        tags: ["Paper", "Multi-Agent Systems", "LLMs", "Code Generation", "Runtime Debugging"],
        image: "/paper1_images/front.png",
        github: "https://github.com/nazmus-ashrafi/multiagent_vs_debugger",
        paper: {
            arxiv: "https://arxiv.org/abs/2505.02133",
            doi: "10.1109/AICT67988.2025.11268754",
            ieee: "https://ieeexplore.ieee.org/document/11268754",
            // venue: "IEEE International Conference on Artificial Intelligence and Communication Technologies (AICT)",
            // year: 2025,
            authors: ["N. Ashrafi", "S. Bouktif", "M. Mediani"],
            status: "published"
        }
    },
    "This Website": {
        title: "This Website",
        description: "Personal blog and portfolio built with modern web technologies",
        tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Markdown"],
        image: "/portfolio_images/portfolio.png",
        github: "https://github.com/nazmus-ashrafi/next-js-personal-blog"
    },
    "Multi-Agent Systems Blog": {
        title: "Multi-Agent Systems Blog",
        description: "Blog about multi-agent systems",
        tags: ["LLMs", "Multi-Agent LLM Systems", "Reasoning for LLMs"],
        image: "/multiagents_images/agent.png"
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
    const [videoUrl, setVideoUrl] = useState<string | null>(null)

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

    // Sort cards based on PROJECT_METADATA order
    // Cards with metadata appear in the order defined in PROJECT_METADATA
    // Cards without metadata appear last, maintaining their original order
    const metadataKeys = Object.keys(PROJECT_METADATA)
    const sortedProjectCards = [...projectCards].sort((a, b) => {
        const aMetadata = getMetadata(a.title)
        const bMetadata = getMetadata(b.title)

        // Find the index in PROJECT_METADATA for each card
        const aIndex = metadataKeys.findIndex(key =>
            a.title.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(a.title.toLowerCase())
        )
        const bIndex = metadataKeys.findIndex(key =>
            b.title.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(b.title.toLowerCase())
        )

        // If both have metadata, sort by their order in PROJECT_METADATA
        if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex
        }

        // Cards with metadata come before cards without
        if (aIndex !== -1) return -1
        if (bIndex !== -1) return 1

        // Both without metadata: maintain original order
        return 0
    })

    // Debug: Log all card IDs and their sort order
    console.log('Sorted project cards:', sortedProjectCards.map(p => ({ id: p.id, title: p.title })))

    return (
        <section className="px-4 py-8 md:px-0">
            {/* Header */}
            <div className="mb-8">
                <h2 className="flex items-center gap-3 text-2xl font-semibold text-sky-100 md:text-3xl">
                    <Folder size={28} className="text-sky-400" />
                    <span>Projects, Papers & Articles</span>
                </h2>
                <p className="mt-2 text-sky-200">
                    View projects, papers, and explore articles
                </p>
            </div>

            {/* Grid of Project Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
                {sortedProjectCards.map((project) => {
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
                                    <div className="flex items-center gap-2">
                                        {getMetadata(project.title)?.github && (
                                            <a
                                                href={getMetadata(project.title)?.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center justify-center rounded-full border border-zinc-500/30 bg-zinc-500/10 p-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-500/20"
                                                title="View on GitHub"
                                            >
                                                <Github className="h-3.5 w-3.5" />
                                            </a>
                                        )}
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
                                        {getMetadata(project.title)?.video && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setVideoUrl(getMetadata(project.title)?.video || null)
                                                }}
                                                className="inline-flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-400 transition-colors hover:bg-sky-500/20"
                                                title="Watch video"
                                            >
                                                {/* <Video className="h-3 w-3" /> */}
                                                Video
                                            </button>
                                        )}
                                    </div>
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

                                {/* Paper-specific metadata */}
                                {getMetadata(project.title)?.paper && (
                                    <div className="mt-4 space-y-3">
                                        {/* Venue and Year */}
                                        {(getMetadata(project.title)?.paper?.venue || getMetadata(project.title)?.paper?.year) && (
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-amber-400 flex-shrink-0" />
                                                <p className="text-sm text-amber-200/90 font-medium">
                                                    {getMetadata(project.title)?.paper?.venue}
                                                    {getMetadata(project.title)?.paper?.year && ` (${getMetadata(project.title)?.paper?.year})`}
                                                </p>
                                            </div>
                                        )}

                                        {/* Publication Links */}
                                        <div className="flex flex-wrap gap-2">
                                            {getMetadata(project.title)?.paper?.arxiv && (
                                                <a
                                                    href={getMetadata(project.title)?.paper?.arxiv}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300 transition-all hover:bg-purple-500/20 hover:border-purple-400/50"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    arXiv
                                                </a>
                                            )}
                                            {getMetadata(project.title)?.paper?.doi && (
                                                <a
                                                    href={`https://doi.org/${getMetadata(project.title)?.paper?.doi}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300 transition-all hover:bg-blue-500/20 hover:border-blue-400/50"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    DOI
                                                </a>
                                            )}
                                            {getMetadata(project.title)?.paper?.ieee && (
                                                <a
                                                    href={getMetadata(project.title)?.paper?.ieee}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-all hover:bg-indigo-500/20 hover:border-indigo-400/50"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    IEEE Xplore
                                                </a>
                                            )}
                                            {getMetadata(project.title)?.paper?.pdf && (
                                                <a
                                                    href={getMetadata(project.title)?.paper?.pdf}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition-all hover:bg-rose-500/20 hover:border-rose-400/50"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    PDF
                                                </a>
                                            )}
                                        </div>
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

            {/* Video Modal */}
            {videoUrl && (
                <VideoModal
                    url={videoUrl}
                    onClose={() => setVideoUrl(null)}
                />
            )}
        </section>
    )
}

export default ProjectCards
