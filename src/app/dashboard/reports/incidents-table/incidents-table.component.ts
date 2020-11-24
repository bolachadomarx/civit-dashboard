import { IncidentService } from './../../../_services/incident.service'
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { IncidentModel } from 'src/app/_models/incident'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-incidents-table',
  templateUrl: './incidents-table.component.html',
  styleUrls: ['./incidents-table.component.css'],
})
export class IncidentsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild('incidents', { static: true }) table: ElementRef

  displayedColumns: string[] = ['createdAt', 'title', 'status', 'latitude', 'longitude', 'category', 'description']
  dataSource: MatTableDataSource<IncidentModel> = new MatTableDataSource()
  incidents: IncidentModel[]

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentService.get().subscribe((res) => {
      this.incidents = res
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
    XLSX.utils.book_append_sheet(wb, ws, 'Incidents')

    const date = new Date().toLocaleString()

    XLSX.writeFile(wb, 'Incidents-' + date + '.xlsx')
  }
}
