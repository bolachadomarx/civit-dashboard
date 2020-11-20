export interface ArticleModel {
  _id: string
  title: string
  featuredImage: string
  text: string
  __v: number
}

export interface CreateArticleModel {
  title: string
  featuredImage: string
  text: string
}
