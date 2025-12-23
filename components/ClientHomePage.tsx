"use client"

import { CopilotPopup } from "@copilotkit/react-ui"
import { useCopilotReadable } from "@copilotkit/react-core"
import "@copilotkit/react-ui/styles.css"
import type { ArticleItem, HierarchicalArticles } from "@/types"
import ProjectCards from "@/components/ProjectCards"
import SocialLinks from "@/components/SocialLinks"


// Author information - single source of truth about author
const AUTHOR_INFO = {
  name: "Nazmus Ashrafi",
  role: "AI researcher",
  location: "UAE",
  university: "UAE University (UAEU)",
  researchFocus: ["language models", "code generation"],
  researchInterests: "building reliable multi-agent systems that can coordinate effectively in real-world environments",
  bio: "Hi! 👋 I am a software engineering graduate, educator and researcher with a strong interest in intelligent AI powered applications. I have a Master’s degree in Software Engineering. My research focuses on large language model (LLM) systems, automated code generation, and AI-driven knowledge work."
}

type Props = {
  hierarchicalArticles: HierarchicalArticles
  articleContents: Array<{
    id: string
    title: string
    category: string
    date: string
    contentHtml: string
    contentText: string
  }>
}

const ClientHomePage = ({ hierarchicalArticles, articleContents }: Props) => {

  // Make personal information readable to Copilot
  useCopilotReadable({
    description: "Information about the blog author and researcher",
    value: JSON.stringify(AUTHOR_INFO, null, 2),
  });

  // Make articles structure readable to Copilot
  useCopilotReadable({
    description: "The categorised articles structure with titles, dates, and categories",
    value: JSON.stringify(hierarchicalArticles, null, 2),
  });

  // Make article contents readable to Copilot
  useCopilotReadable({
    description: "The full content of all articles including titles, categories, dates, and text content",
    value: JSON.stringify(
      articleContents.map(article => ({
        id: article.id,
        title: article.title,
        category: article.category,
        date: article.date,
        content: article.contentText, // Plain text for better AI understanding
      })),
      null,
      2
    ),
  });

  // Also provide a summary for quick reference
  useCopilotReadable({
    description: "Summary of the blog: total articles, categories, and recent topics",
    value: JSON.stringify({
      totalArticles: articleContents.length,
      categories: Object.keys(hierarchicalArticles),
      articlesByCategory: Object.fromEntries(
        Object.entries(hierarchicalArticles).map(([category, articles]) => [
          category,
          articles.subcategories.length + articles.uncategorizedArticles.length
        ])
      ),
      recentArticles: articleContents
        .slice(0, 5)
        .map(article => ({ title: article.title, category: article.category })),
    }, null, 2),
  });

  return (
    <>
      <section className="mx-auto w-11/12 md:w-3/4 lg:w-2/3 mt-20 flex flex-col gap-16 mb-20">
        <header className="font-cormorantGaramond font-light text-6xl text-blue-100 text-center">
          <h1>{AUTHOR_INFO.name}</h1>
          <SocialLinks className="justify-center mt-4 text-blue-200" />
        </header>
        <p className="font-cormorantGaramond font-light text-blue-200 text-center text-2xl">
          {AUTHOR_INFO.bio}
        </p>

        {/* Project Cards - Expandable cards with embedded article trees */}
        <ProjectCards hierarchicalArticles={hierarchicalArticles} />
      </section>
      <CopilotPopup />
    </>
  )
}

export default ClientHomePage