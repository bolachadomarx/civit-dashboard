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
  zoom = 15
  @Input() markerOptions: google.maps.MarkerOptions
  markerPosition: google.maps.LatLngLiteral

  @Output()
  mark = new EventEmitter<google.maps.LatLngLiteral>()

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  addMarker(event: google.maps.MouseEvent) {
    this.markerPosition = event.latLng.toJSON()
    this.mark.emit(this.markerPosition)
  }
}
