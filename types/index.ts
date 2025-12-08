// TypeScript Data Structures

export type ArticleItem = {
  id: string
  title: string
  date: string
  category: string
  subcategory?: string  // Optional subcategory
}

// Group of articles within a subcategory
export interface SubcategoryGroup {
  subcategory: string
  articles: ArticleItem[]
}

// Category with all its subcategories
export interface CategoryWithSubcategories {
  category: string
  subcategories: SubcategoryGroup[]
  uncategorizedArticles: ArticleItem[]  // Articles without subcategory
}
// Array of all categories
export type HierarchicalArticles = CategoryWithSubcategories[]
