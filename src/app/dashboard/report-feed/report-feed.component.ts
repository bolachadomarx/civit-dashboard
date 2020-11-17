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

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentService.get().subscribe((incidents) => (this.incidents = incidents))
  }
}
