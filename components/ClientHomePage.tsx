"use client"

import ArticleItemList from "@/components/ArticleListItem"
import { CopilotPopup } from "@copilotkit/react-ui"
import { useCopilotReadable } from "@copilotkit/react-core"
import "@copilotkit/react-ui/styles.css"
import type { ArticleItem } from "@/types"

type Props = {
  categorisedArticles: Record<string, ArticleItem[]>
  articleContents: Array<{
    id: string
    title: string
    category: string
    date: string
    contentHtml: string
    contentText: string
  }>
}

const ClientHomePage = ({ categorisedArticles, articleContents }: Props) => {
  // Make articles structure readable to Copilot
  useCopilotReadable({
    description: "The categorised articles structure with titles, dates, and categories",
    value: JSON.stringify(categorisedArticles, null, 2),
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
      categories: Object.keys(categorisedArticles),
      articlesByCategory: Object.fromEntries(
        Object.entries(categorisedArticles).map(([category, articles]) => [
          category,
          articles.length
        ])
      ),
      recentArticles: articleContents
        .slice(0, 5)
        .map(article => ({ title: article.title, category: article.category })),
    }, null, 2),
  });

  return (
    <>
      <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
        <header className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center">
          <h1>Nazmus Ashrafi</h1>
        </header>
        <p className="font-cormorantGaramond font-light text-neutral-900 text-center">
          {"Hi! 👋 I'm an AI researcher based in the UAE."}
          {"I'm currently pursuing at UAE University (UAEU), focusing on language models and code generation. My research interests deeply resonates with building reliable multi-agent systems that can coordinate effectively in real-world environments."}
        </p>
        <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
          {Object.keys(categorisedArticles).map((category) => (
            <ArticleItemList
              category={category}
              articles={categorisedArticles[category]}
              key={category}
            />
          ))}
        </section>
      </section>
      <CopilotPopup />
    </>
  )
}

export default ClientHomePage