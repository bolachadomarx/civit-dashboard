import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IncidentService } from './../../_services/incident.service'
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

  fb: FormBuilder = new FormBuilder()
  incidentForm: FormGroup
  categories = ['Tipo 01', 'Tipo 02', 'Tipo 03']

  images: any[] = []

  constructor(private _ngZone: NgZone, private incidentService: IncidentService) {
    this.incidentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      images: [Validators.required],
    })
  }

  ngOnInit(): void {}

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true))
  }

  mark(event) {
    this.incidentForm.get('latitude').setValue(event.lat)
    this.incidentForm.get('longitude').setValue(event.lng)
    this.incidentForm.updateValueAndValidity()
  }

  updateFiles(event) {
    let fileList = event
    for (var i = 0; i < fileList.length; i++) {
      this.files.push(fileList[i])
    }
  }

  processImages(files: File[]) {
    files.map(async (file) => {
      const reader = new FileReader()
      reader.onload = this.handleFile.bind(this)
      reader.readAsBinaryString(file)
    })
    console.log(String(this.images))
    console.log(this.images.toString())

    this.incidentForm.get('images').setValue(String(this.images))
    this.incidentForm.get('images').updateValueAndValidity()
  }

  handleFile(event) {
    var binaryString = event.target.result
    this.images.push(btoa(binaryString))
  }

  save() {
    this.processImages(this.files)
    const incident = this.incidentForm.value
    console.log(incident)

    return this.incidentService.create(incident).subscribe(
      (res) => {
        console.log(res)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
