import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseReviewComponent } from './case-review/case-review.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoDataAvailbleComponent } from './no-data-availble/no-data-availble.component';
import { OtpComponent } from './otp/otp.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MaterialModule } from '../material/material.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    OtpComponent,
    CaseReviewComponent,
    NoDataAvailbleComponent,
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    PrimengModule,
    FormsModule,
    MaterialModule,
    LoadingBarRouterModule,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    OtpComponent,
    CaseReviewComponent,
    NoDataAvailbleComponent,
    

  ]
})
export class SharedModule { }
