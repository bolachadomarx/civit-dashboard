import { ReportsComponent } from './reports/reports.component'
import { CategoriesComponent } from './categories/categories.component'
import { NewsComponent } from './news/news.component'
import { CreateNewsComponent } from './create-news/create-news.component'
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
        path: 'noticias/manutencao',
        component: CreateNewsComponent,
      },
      {
        path: 'noticias/feed',
        component: NewsComponent,
      },
      {
        path: 'categorias/manutencao',
        component: CategoriesComponent,
      },
      {
        path: 'relatorios',
        component: ReportsComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
    ],
  },
]
