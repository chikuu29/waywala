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
import { ProfileComponent } from './profile/profile.component';
import { PrimengModule } from '../primeng/primeng.module';
import { AboutComponent } from './about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { ECommerceModule } from '../feature/e-commerce/e-commerce.module';
import { AgricultureModule } from '../feature/agriculture/agriculture.module';
import { SharedModule } from '../shared/shared.module';
import { SellOnWaywalaComponent } from './sell-on-waywala/sell-on-waywala.component';
import { BecomeAgricultueInvestigratorComponent } from './become-agricultue-investigrator/become-agricultue-investigrator.component';
import { BecomeEducationTeacherComponent } from './become-education-teacher/become-education-teacher.component';
import { TermsofserviceComponent } from './termsofservice/termsofservice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ErrorPageComponent,
    CommingSoonComponent,
    RegisterComponent,
    ProfileComponent,
    AboutComponent,
    HomeComponent,
    SellOnWaywalaComponent,
    BecomeAgricultueInvestigratorComponent,
    BecomeEducationTeacherComponent,
    TermsofserviceComponent,
    PrivacyPolicyComponent,
    RefundPolicyComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    NgbModule,
    NgxUiLoaderModule,
    ECommerceModule,
    AgricultureModule,
    SharedModule,
    CarouselModule
  ],
  exports: [
    CommingSoonComponent
  
  ],
  providers:[MessageService],
  entryComponents:[OtpComponent]
})
export class PagesModule { }
