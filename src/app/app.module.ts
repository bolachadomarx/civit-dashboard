import { MaterialModule } from './material.module'
import { BrowserModule } from '@angular/platform-browser'
import { LOCALE_ID, NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
import { DndDirective } from './_directives/dnd.directive'
import { ProgressComponent } from './_components/progress/progress.component'
import { DragndropComponent } from './_components/dragndrop/dragndrop.component'
import { registerLocaleData } from '@angular/common'
import ptBr from '@angular/common/locales/pt'

registerLocaleData(ptBr)
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
