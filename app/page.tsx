import ArticleItemList from "@/components/ArticleListItem"
import { getCategorisedArticles } from "@/lib/articles"

const HomePage = () => {
  const articles = getCategorisedArticles()

  console.log(articles)
  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">
      <header className="font-cormorantGaramond font-light text-6xl text-neutral-900 text-center">
        <h1>Nazmus Ashrafi</h1>
      </header>
      <p className="font-cormorantGaramond font-light text-neutral-900 text-center">
        {"Hi! 👋 I'm an AI researcher based in the UAE."}

  {"I'm currently pursuing at UAE University (UAEU), focusing on language models and code generation. My research interests deeply resonates with building reliable multi-agent systems that can coordinate effectively in real-world environments."}
      </p>
      <section className="md:grid md:grid-cols-2 flex flex-col gap-10">
        {articles !== null &&
          Object.keys(articles).map((article) => (
            <ArticleItemList
              category={article}
              articles={articles[article]}
              key={article}
            />
          ))}
      </section>
    </section>
  )
}

export default HomePage
