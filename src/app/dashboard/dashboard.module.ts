import { MaterialModule } from './../material.module'
import { DashboardRoutes } from './dashboard.routing'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavComponent } from './nav/nav.component'
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [NavComponent, HomeComponent],
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), MaterialModule],
})
export class DashboardModule {}
