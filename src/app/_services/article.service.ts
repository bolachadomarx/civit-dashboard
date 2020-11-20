import { ArticleModel, CreateArticleModel } from './../_models/article'
import { CreateIncidentModel, IncidentModel } from './../_models/incident'
import { environment } from './../../environments/environment.prod'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserModel } from '../_models/user'

@Injectable({ providedIn: 'root' })
export class ArticleService {
  url = environment.api

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<ArticleModel[]>(`${this.url}/articles`)
  }

  getById(id: string) {
    return this.http.get<ArticleModel>(`${this.url}/articles/${id}`)
  }

  update(id: string, article: CreateArticleModel) {
    return this.http.put(`${this.url}/articles/${id}`, article)
  }

  create(incidentData: CreateArticleModel) {
    console.log(incidentData)
    return this.http.post(`${this.url}/articles`, incidentData)
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/articles/${id}`)
  }
}
