import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseReviewComponent } from './case-review/case-review.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OtpComponent } from './otp/otp.component';
import { PrimengModule } from '../primeng/primeng.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { MaterialModule } from '../material/material.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NoDataAvailableComponent } from './no-data-available/no-data-available.component';
import { CoustomAlertMaterialUiComponent } from './coustom-alert-material-ui/coustom-alert-material-ui.component';
import { AddressManagementComponent } from './address-management/address-management.component';
import { MyCoinZoneComponent } from './my-coin-zone/my-coin-zone.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NewsComponent } from './news/news.component';
import { CustomPipeModule } from '../customPipe/custom-pipe.module';
import { GenericOtpVerificationComponent } from './generic-otp-verification/generic-otp-verification.component';
import { TakeFeedbackComponent } from './take-feedback/take-feedback.component';
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    OtpComponent,
    CaseReviewComponent,
    NoDataAvailableComponent,
    CoustomAlertMaterialUiComponent,
    AddressManagementComponent,
    MyCoinZoneComponent,
    FileUploadComponent,
    NewsComponent,
    GenericOtpVerificationComponent,
    TakeFeedbackComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    PrimengModule,
    FormsModule,
    MaterialModule,
    LoadingBarRouterModule,
    NgbModule,
    ReactiveFormsModule,
    CustomPipeModule
    
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    OtpComponent,
    CaseReviewComponent,
    NoDataAvailableComponent,
    AddressManagementComponent,
    FileUploadComponent,
    NewsComponent,
    GenericOtpVerificationComponent

  ]
})
export class SharedModule { }
