import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';


@NgModule({
  declarations: [
    ErrorPageComponent,
    CommingSoonComponent
  ],
  exports: [
    CommingSoonComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
