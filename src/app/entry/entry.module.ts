import { EntryRoutes } from './entry.routing'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(EntryRoutes)],
})
export class EntryModule {}
