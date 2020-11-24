import { ArticleService } from './../../../_services/article.service'
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ArticleModel } from 'src/app/_models/article'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.css'],
})
export class ArticlesTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('articles', { static: true }) table: ElementRef

  displayedColumns: string[] = ['createdAt', 'title', 'text']
  dataSource: MatTableDataSource<ArticleModel> = new MatTableDataSource()
  articles: ArticleModel[]

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.get().subscribe((res) => {
      this.articles = res
      this.dataSource.data = res
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement)
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Articles')

    const date = new Date().toLocaleString()

    XLSX.writeFile(wb, 'Articles-' + date + '.xlsx')
  }
}
