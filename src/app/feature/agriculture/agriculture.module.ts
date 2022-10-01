import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgricultureRoutingModule } from './agriculture-routing.module';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { PagesModule } from 'src/app/pages/pages.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MaterialModule } from 'src/app/material/material.module';
import { GenerateQueryComponent } from './generate-query/generate-query.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CheckStatusComponent } from './check-status/check-status.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { AuthService } from 'src/app/auth/auth.service';




@NgModule({
  declarations: [
    AgricultureComponent,
    GenerateQueryComponent,
    CheckStatusComponent
  ],
  imports: [
    CommonModule,
    AgricultureRoutingModule,
    PagesModule,
    NgxUiLoaderModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    PrimengModule
  ]

})
export class AgricultureModule { }
