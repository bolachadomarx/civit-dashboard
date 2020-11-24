import { AfterViewInit, Component, OnInit } from '@angular/core'
import { tap } from 'rxjs/operators'
import { IncidentService } from 'src/app/_services/incident.service.js'
import * as CanvasJS from '../../../assets/canvasjs.min.js'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit, AfterViewInit {
  data: any = []
  constructor(private incidentsService: IncidentService) {}

  ngOnInit() {
    this.incidentsService.all().subscribe((incidents) => {
      this.data = incidents
      this.processArray()
      let chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Número de ocorrências por categoria',
        },
        data: [
          {
            type: 'column',
            dataPoints: this.data,
          },
        ],
      })

      chart.render()
    })
  }

  ngAfterViewInit() {}

  processArray() {
    this.data = this.data.map((element) => {
      console.log(element)
      return { y: element.count, label: element._id.category }
    })
    console.log(this.data)
  }
}
