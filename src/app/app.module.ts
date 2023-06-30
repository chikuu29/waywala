import { NgModule } from '@angular/core';
import { BrowserModule,Title,Meta  } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './services/app.service';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { SharedModule } from './shared/shared.module';
import { BlockUiCustomTemplateComponent } from './block-ui-custom-template.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    LoadingBarRouterModule,
    NgxUiLoaderModule,
    PrimengModule,
    FormsModule,
    SharedModule,
    BlockUIModule.forRoot(
      {
        template: BlockUiCustomTemplateComponent
      }
    ),
    ToastrModule.forRoot(),
   
  ],
  providers: [AppService,NgbActiveModal,Title,Meta],
  bootstrap: [AppComponent],

})
export class AppModule { }
