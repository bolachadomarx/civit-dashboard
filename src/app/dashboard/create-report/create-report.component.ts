import { CategoryModel } from './../../_models/category'
import { CategoryService } from './../../_services/category.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IncidentService } from './../../_services/incident.service'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { HttpClient } from '@angular/common/http'
import { Component, NgZone, OnInit, ViewChild } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, take } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'

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
  categories: CategoryModel[]

  images: any[] = []
  center: { lat: number; lng: number }
  loading: boolean

  constructor(
    private _ngZone: NgZone,
    private incidentService: IncidentService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.incidentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      images: [Validators.required],
    })
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)

      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    this.categoryService.get().subscribe((res) => (this.categories = res))
  }

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

    this.incidentForm.get('images').setValue(String(this.images))
    this.incidentForm.get('images').updateValueAndValidity()
  }

  handleFile(event) {
    var binaryString = event.target.result
    this.images.push('data:image/png;base64,' + btoa(binaryString))
  }

  save() {
    this.loading = true
    this.processImages(this.files)
    const incident = this.incidentForm.value

    return this.incidentService.create(incident).subscribe(
      (res) => {
        this.loading = false
        this.toastr.success('Denúncia enviada para análise', 'Sucesso')
        this.incidentForm.reset()
        this.ngOnInit()
      },
      (error) => {
        this.loading = false
        this.toastr.warning('Falha ao enviar denúncia', 'Erro')
        this.incidentForm.reset()
        this.ngOnInit()
      }
    )
  }
}
