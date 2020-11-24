import { AuthenticationService } from 'src/app/_services/authentication.service';
import { myFile } from './file'
import { LoadingService } from './../../_helpers/loading.service'
import { IncidentService } from './../../_services/incident.service'
import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { IncidentModel } from 'src/app/_models/incident'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-report-feed',
  templateUrl: './report-feed.component.html',
  styleUrls: ['./report-feed.component.css'],
})
export class ReportFeedComponent implements OnInit {
  incidents$: Subscription
  incidents: IncidentModel[]
  image = myFile
  loading: boolean = false
  user: import("f:/faculdade/dev/civit-dashboard/src/app/_models/user").UserModel;

  constructor(private incidentService: IncidentService, private loadingService: LoadingService, private toastr: ToastrService, private authenticationService: AuthenticationService) {
    this.loadingService.setLoading()
    this.user = this.authenticationService.currentUserValue
  }

  update(id: string, status: string) {
    this.loading = true
    this.incidentService.update(id, status).subscribe((res) => {
      this.toastr.success('Ocorrência atualizada com sucesso!')
      this.loading = false
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.incidentService.get().subscribe((incidents) => {
      this.incidents = incidents
      this.loadingService.clearLoading()
    })
  }
}
