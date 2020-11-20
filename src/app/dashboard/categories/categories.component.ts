import { CategoryModel } from './../../_models/category'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { CategoriesService } from 'src/app/_services/categories.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  displayedColumns: string[] = ['name', 'description', 'edit', 'delete']
  dataSource: MatTableDataSource<CategoryModel> = new MatTableDataSource()

  categories: CategoryModel[]
  loading: boolean = false
  fb: FormBuilder = new FormBuilder()
  categoryForm: FormGroup
  idCategory: string
  editing: boolean

  constructor(private categoriesService: CategoriesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.categoriesService.get().subscribe((res) => {
      this.categories = res
      this.dataSource.data = res
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  create() {
    this.loading = true
    this.categoriesService.create(this.categoryForm.value).subscribe((res) => {
      this.toastr.success('Notícia atualizada com sucesso!')
      this.loading = false
      this.ngOnInit()
    })
  }

  delete(idCategory) {
    this.loading = true
    this.categoriesService.delete(idCategory).subscribe((res) => {
      this.toastr.success('Notícia deletada com sucesso!')
      this.loading = false
      this.ngOnInit()
    })
  }

  update() {
    this.loading = true
    this.categoriesService.update(this.idCategory, this.categoryForm.value).subscribe((res) => {
      this.toastr.success('Notícia atualizada com sucesso!')
      this.loading = false
      this.ngOnInit()
    })
  }

  edit(category: CategoryModel) {
    this.idCategory = category._id
    this.editing = true
    this.categoryForm.patchValue(category)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }
}
