import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './shared/home/home.component';
import { AppService } from './services/app.service';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';
import { OtpComponent } from './shared/otp/otp.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { PrimengModule } from './primeng/primeng.module';
import { CaseReviewComponent } from './shared/case-review/case-review.component';
import { FormsModule } from '@angular/forms';
import { AgricultureModule } from './feature/agriculture/agriculture.module';
import { BlockUIModule } from 'ng-block-ui';
import { NoDataAvailbleComponent } from './shared/no-data-availble/no-data-availble.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    AgricultureModule,
    MaterialModule,
    HttpClientModule,
    LoadingBarRouterModule,
    NgxUiLoaderModule,
    PrimengModule,
    FormsModule,
    SharedModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
   
  ],
 
  providers: [AppService],
  bootstrap: [AppComponent],

})
export class AppModule { }
