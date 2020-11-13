import { MaterialModule } from './../material.module'
import { DashboardRoutes } from './dashboard.routing'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavComponent } from './nav/nav.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), MaterialModule],
})
export class DashboardModule {}
