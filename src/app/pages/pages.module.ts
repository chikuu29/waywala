import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { OtpComponent } from '../shared/otp/otp.component';
import { NoDataAvailableComponent } from './no-data-available/no-data-available.component';
import { ProfileComponent } from './profile/profile.component';
import { PrimengModule } from '../primeng/primeng.module';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    ErrorPageComponent,
    CommingSoonComponent,
    RegisterComponent,
    NoDataAvailableComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    // ToastrModule.forRoot(),
    NgxUiLoaderModule
    
  ],
  exports: [
    CommingSoonComponent,
    NoDataAvailableComponent
  ],
  providers:[],
  entryComponents:[OtpComponent]
})
export class PagesModule { }
