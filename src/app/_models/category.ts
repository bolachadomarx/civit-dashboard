export interface CategoryModel {
  _id: string
  name: string
  description: string
  __v: number
}

export interface CreateCategoryModel {
  name: string
  description: string
}
