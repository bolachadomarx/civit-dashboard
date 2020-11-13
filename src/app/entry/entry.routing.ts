import { Routes } from '@angular/router'
import { NavComponent } from '../dashboard/nav/nav.component'

export const EntryRoutes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
]
