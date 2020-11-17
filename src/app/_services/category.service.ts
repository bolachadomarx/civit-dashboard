import { CategoryModel, CreateCategoryModel } from './../_models/category'
import { environment } from './../../environments/environment.prod'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class CategoryService {
  url = environment.api

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<CategoryModel[]>(`${this.url}/categories`)
  }

  getById(id: string) {
    return this.http.get<CategoryModel>(`${this.url}/categories/${id}`)
  }

  update(id: string, status: string) {
    return this.http.put(`${this.url}/categories/${id}`, { status })
  }

  create(incidentData: CreateCategoryModel) {
    console.log(incidentData)

    return this.http.post(`${this.url}/categories`, incidentData)
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/categories/${id}`)
  }
}
