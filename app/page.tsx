import { getCategorisedArticles, getArticleData, getHierarchicalArticles } from "@/lib/articles"
import ClientHomePage from "../components/ClientHomePage"
import { CopilotKit } from "@copilotkit/react-core"
import Footer from "@/components/Footer"

const HomePage = async () => {
  // Your existing data fetching code
  const hierarchicalArticles = getHierarchicalArticles()

  // Flatten to get all articles for content fetching
  const allArticles = hierarchicalArticles.flatMap(cat => [
    ...cat.uncategorizedArticles,
    ...cat.subcategories.flatMap(sub => sub.articles)
  ])

  const articleContents = await Promise.all(
    allArticles.map(async (article) => {
      const articleData = await getArticleData(article.id)
      return {
        id: articleData.id,
        title: articleData.title,
        category: articleData.category,
        date: articleData.date,
        contentHtml: articleData.contentHtml,
        contentText: articleData.contentHtml.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
      }
    })
  )

  return (
    <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOTKIT_API_KEY}>
      <div className="App min-h-screen">
        <ClientHomePage
          hierarchicalArticles={hierarchicalArticles}
          articleContents={articleContents}
        />
        <Footer />
      </div>

    </CopilotKit>
  )
}

export default HomePage
