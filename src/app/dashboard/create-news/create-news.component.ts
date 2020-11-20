import { AuthenticationService } from './../../_services/authentication.service'
import { ArticleModel } from './../../_models/article'
import { ArticleService } from './../../_services/article.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CdkTextareaAutosize } from '@angular/cdk/text-field'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent implements OnInit, AfterViewInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  files: File[] = []
  fb: FormBuilder = new FormBuilder()
  articleForm: FormGroup

  images: any[] = []

  displayedColumns: string[] = ['title', 'text', 'edit', 'delete']
  dataSource: MatTableDataSource<ArticleModel> = new MatTableDataSource()
  articles: ArticleModel[]
  loading: boolean = false
  idArtcile: string
  editing: boolean = false

  constructor(
    private toastr: ToastrService,
    private articleService: ArticleService,
    private authenticationService: AuthenticationService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      featuredImage: ['', Validators.required],
      text: ['', [Validators.required, Validators.maxLength(1000)]],
    })
  }

  ngOnInit(): void {
    this.articleService.get().subscribe((res) => {
      this.articles = res
      this.dataSource.data = res
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
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
    this.articleForm.get('featuredImage').setValue('data:image/png;base64,' + btoa(binaryString))
  }

  save() {
    this.loading = true
    this.articleService
      .create({ ...this.articleForm.value, userId: this.authenticationService.currentUserValue.id })
      .subscribe((res) => {
        this.toastr.success('Notícia criada com sucesso!')
        this.loading = false
        this.articleForm.reset()
        this.images = []
        this.files = []
        this.ngOnInit()
      })
  }

  update() {
    this.loading = true
    this.articleService.update(this.idArtcile, this.articleForm.value).subscribe((res) => {
      this.toastr.success('Notícia atualizada com sucesso!')
      this.loading = false
      this.editing = false
      this.articleForm.reset()
      this.images = []
      this.files = []
      this.ngOnInit()
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  edit(article: ArticleModel) {
    this.idArtcile = article._id
    this.editing = true
    this.articleForm.patchValue(article)
  }

  delete(idArticle: string) {
    this.articleService.delete(idArticle).subscribe((res) => {
      this.toastr.success('Notícia deletada com sucesso!')
      this.articleForm.reset()
      this.images = []
      this.files = []
      this.ngOnInit()
    })
  }
}
