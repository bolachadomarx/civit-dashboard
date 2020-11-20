import { CategoryModel, CreateCategoryModel } from './../_models/category'
import { environment } from './../../environments/environment.prod'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  url = environment.api

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<CategoryModel[]>(`${this.url}/categories`)
  }

  getById(id: string) {
    return this.http.get<CategoryModel>(`${this.url}/categories/${id}`)
  }

  update(id: string, categoria: CreateCategoryModel) {
    console.log(categoria)

    return this.http.put(`${this.url}/categories/${id}`, categoria)
  }

  create(categoria: CreateCategoryModel) {
    console.log(categoria)
    return this.http.post(`${this.url}/categories`, categoria)
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/categories/${id}`)
  }
}
