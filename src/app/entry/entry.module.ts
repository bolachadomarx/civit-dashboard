import { UserService } from './../_services/user.service'
import { MaterialModule } from './../material.module'
import { EntryRoutes } from './entry.routing'
import { RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SignupComponent } from './signup/signup.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { HeaderComponent } from './header/header.component'
import { SigninComponent } from './signin/signin.component'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [SignupComponent, HeaderComponent, SigninComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(EntryRoutes),
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class EntryModule {}
