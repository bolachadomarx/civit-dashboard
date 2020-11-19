import { CreateIncidentModel, IncidentModel } from './../_models/incident'
import { environment } from './../../environments/environment.prod'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserModel } from '../_models/user'

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

  create(incidentData: CreateIncidentModel) {
    console.log(incidentData)
    return this.http.post(`${this.url}/incidents`, incidentData)
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/incidents/${id}`)
  }
}
