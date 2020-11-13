import { environment } from './../../environments/environment.prod'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { UserModel } from '../_models/user'

type UserAddModel = Omit<UserModel, 'id'>

@Injectable({ providedIn: 'root' })
export class UserService {
  url = environment.api

  constructor(private http: HttpClient) {}

  signup(userData: UserAddModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.url}/users`, userData)
  }
}
