import { MaterialModule } from './../material.module'
import { DashboardRoutes } from './dashboard.routing'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavComponent } from './nav/nav.component'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { ReportFeedComponent } from './report-feed/report-feed.component';
import { FaqComponent } from './faq/faq.component'

@NgModule({
  declarations: [NavComponent, HomeComponent, CreateReportComponent, ReportFeedComponent, FaqComponent],
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), MaterialModule],
})
export class DashboardModule {}
