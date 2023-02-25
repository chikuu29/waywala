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
@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    OtpComponent,
    CaseReviewComponent
  ],
  imports: [
    CommonModule,
    NgxUiLoaderModule,
    PrimengModule,
    FormsModule,
    MaterialModule,
    LoadingBarRouterModule,
    NgbModule,
    ReactiveFormsModule
    
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    OtpComponent,
    CaseReviewComponent,
    NgbModule
    
    

  ]
})
export class SharedModule { }
