import { getCategorisedArticles, getArticleData } from "@/lib/articles"
import ClientHomePage from "../components/ClientHomePage"
import { CopilotKit } from "@copilotkit/react-core"
import Footer from "@/components/Footer"

const HomePage = async () => {
  // Your existing data fetching code
  const categorisedArticles = getCategorisedArticles()
  
  const allArticles = Object.values(categorisedArticles).flat()
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
      <div className="App">
        <ClientHomePage 
        categorisedArticles={categorisedArticles}
        articleContents={articleContents}
        />
        <Footer/>
      </div>
      
    </CopilotKit>
  )
}

export default HomePage
