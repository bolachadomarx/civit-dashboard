import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements OnInit {
  apiLoaded: Observable<boolean>

  @Input() center: google.maps.LatLngLiteral
  @Input() zoom: number

  mapOptions: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  markerPosition: google.maps.LatLngLiteral

  @Input() height: number

  @Output()
  mark = new EventEmitter<google.maps.LatLngLiteral>()

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  addMarker(event: google.maps.MouseEvent) {
    this.markerPosition = event.latLng.toJSON()
    this.mark.emit(this.markerPosition)
  }
}
