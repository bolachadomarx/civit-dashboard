import { myFile } from './file'
import { LoadingService } from './../../_helpers/loading.service'
import { IncidentService } from './../../_services/incident.service'
import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { IncidentModel } from 'src/app/_models/incident'

@Component({
  selector: 'app-report-feed',
  templateUrl: './report-feed.component.html',
  styleUrls: ['./report-feed.component.css'],
})
export class ReportFeedComponent implements OnInit {
  incidents$: Subscription
  incidents: IncidentModel[]
  image = myFile
  constructor(private incidentService: IncidentService, private loadingService: LoadingService) {
    this.loadingService.setLoading()
  }

  t

  ngOnInit(): void {
    this.incidentService.get().subscribe((incidents) => {
      this.incidents = incidents
      this.loadingService.clearLoading()
    })
  }
}
