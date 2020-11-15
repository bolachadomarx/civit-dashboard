import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { HttpClient } from '@angular/common/http'
import { Component, NgZone, OnInit, ViewChild } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, take } from 'rxjs/operators'

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css'],
})
export class CreateReportComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize
  files: any[] = []
  apiLoaded: Observable<boolean>

  constructor(private _ngZone: NgZone, httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyA84OFuKv7HzDEanwNnbwP2tF1GCTtBWLU', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false))
      )
  }

  ngOnInit(): void {}

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true))
  }

  updateFiles(event) {
    console.log(event)
  }
}
