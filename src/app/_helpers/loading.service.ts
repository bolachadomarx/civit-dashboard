import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false)

  setLoading(): void {
    this.loadingSubject.next(true)
  }

  clearLoading(): void {
    this.loadingSubject.next(false)
  }

  getLoadingObservable(): Observable<boolean> {
    return this.loadingSubject.asObservable()
  }
}
