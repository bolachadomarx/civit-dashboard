import { FaqComponent } from './faq/faq.component'
import { ReportFeedComponent } from './report-feed/report-feed.component'
import { CreateReportComponent } from './create-report/create-report.component'
import { HomeComponent } from './home/home.component'
import { Routes } from '@angular/router'
import { NavComponent } from './nav/nav.component'

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'denuncia/enviar',
        component: CreateReportComponent,
      },
      {
        path: 'denuncia/feed',
        component: ReportFeedComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
    ],
  },
]
