import { LoadingService } from './../../_helpers/loading.service'
import { CategoryModel } from './../../_models/category'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IncidentService } from './../../_services/incident.service'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { HttpClient } from '@angular/common/http'
import { Component, NgZone, OnInit, ViewChild } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, take } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'
import { CategoriesService } from 'src/app/_services/categories.service'

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
  image1: any
  image2: any
  image3: any

  constructor(
    private _ngZone: NgZone,
    private incidentService: IncidentService,
    private categoryService: CategoriesService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
    this.loadingService.setLoading()
    this.incidentForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      images: [''],
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

    this.categoryService.get().subscribe((res) => {
      this.categories = res
      this.loadingService.clearLoading()
    })
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
    let fileList: File[] = event
    if (fileList.length > 1 || this.files.length === 1) {
      this.toastr.warning('Não é possível adicionar mais de uma image', 'Ops')
      return false
    }
    this.files.push(fileList[0])
    console.log(this.files)

    this.processImages(this.files)
  }

  processImages(files: File[]) {
    files.map((file) => {
      const reader = new FileReader()
      reader.onload = this.handleFile.bind(this)
      reader.readAsBinaryString(file)
    })
  }

  handleFile(event) {
    var binaryString = event.target.result
    this.incidentForm.get('images').setValue({ image1: 'data:image/png;base64,' + btoa(binaryString) })
  }

  async save() {
    this.loading = true
    await this.processImages(this.files)
    const images = Object.assign({}, { image1: this.image1, image2: this.image2, image3: this.image3 })
    console.log(this.image1)

    const incident = this.incidentForm.value

    const createdIncident = this.incidentService.create(incident)
    if (createdIncident) {
      this.loading = false
      this.files = []
      this.toastr.success('Denúncia enviada para análise', 'Sucesso')
      this.incidentForm.reset()
      this.ngOnInit()
    }
  }
}
