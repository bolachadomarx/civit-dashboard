import { CreateIncidentModel, IncidentModel } from './../_models/incident'
import { environment } from './../../environments/environment.prod'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserModel } from '../_models/user'
import axios from 'axios'
@Injectable({ providedIn: 'root' })
export class IncidentService {
  url = environment.api

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<IncidentModel[]>(`${this.url}/incidents`)
  }

  getById(id: string) {
    return this.http.get<IncidentModel>(`${this.url}/incidents/${id}`)
  }

  update(id: string, status: string) {
    return this.http.put(`${this.url}/incidents/${id}`, { status })
  }

  async create(incidentData: CreateIncidentModel) {
    axios({
      url: `${this.url}/incidents/`,
      method: 'post',
      data: incidentData,
    })
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/incidents/${id}`)
  }
}
