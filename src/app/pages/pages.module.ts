import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
@NgModule({
  declarations: [
    ErrorPageComponent,
    CommingSoonComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // ToastrModule.forRoot(),
    NgxUiLoaderModule
    
  ],
  exports: [
    CommingSoonComponent
  ],
  providers:[]
})
export class PagesModule { }
