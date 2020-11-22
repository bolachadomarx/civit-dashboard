import { DndDirective } from './../_directives/dnd.directive'
import { ProgressComponent } from './../_components/progress/progress.component'
import { DragndropComponent } from './../_components/dragndrop/dragndrop.component'
import { MaterialModule } from './../material.module'
import { DashboardRoutes } from './dashboard.routing'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavComponent } from './nav/nav.component'
import { RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { CreateReportComponent } from './create-report/create-report.component'
import { ReportFeedComponent } from './report-feed/report-feed.component'
import { FaqComponent } from './faq/faq.component'
import { ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import { GoogleMapsModule } from '@angular/google-maps'
import { MapsComponent } from '../_components/maps/maps.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { NewsComponent } from './news/news.component';
import { CategoriesComponent } from './categories/categories.component';
import { ReportsComponent } from './reports/reports.component';
import { IncidentsTableComponent } from './reports/incidents-table/incidents-table.component';
import { ArticlesTableComponent } from './reports/articles-table/articles-table.component'

@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    CreateReportComponent,
    ReportFeedComponent,
    FaqComponent,
    DragndropComponent,
    ProgressComponent,
    MapsComponent,
    DndDirective,
    CreateNewsComponent,
    NewsComponent,
    CategoriesComponent,
    ReportsComponent,
    IncidentsTableComponent,
    ArticlesTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
})
export class DashboardModule {}
