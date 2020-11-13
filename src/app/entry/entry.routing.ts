import { SigninComponent } from './signin/signin.component'
import { HeaderComponent } from './header/header.component'
import { SignupComponent } from './signup/signup.component'
import { Routes } from '@angular/router'
import { NavComponent } from '../dashboard/nav/nav.component'

export const EntryRoutes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'cadastro',
        component: SignupComponent,
      },
      {
        path: 'login',
        component: SigninComponent,
      },
    ],
  },
]
