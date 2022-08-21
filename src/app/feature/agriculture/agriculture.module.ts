import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgricultureRoutingModule } from './agriculture-routing.module';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { PagesModule } from 'src/app/pages/pages.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  declarations: [
    AgricultureComponent
  ],
  imports: [
    CommonModule,
    AgricultureRoutingModule,
    PagesModule,
    NgxUiLoaderModule
  ]
})
export class AgricultureModule { }
