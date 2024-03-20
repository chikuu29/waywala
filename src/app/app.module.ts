import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { ApiService } from './services/api.service';
import { AppInitializationServiceServiceService } from './services/app-initialization-service-service.service';
import { AuthViewComponent } from './layout/auth-view/auth-view.component';
import { DefaultViewComponent } from './layout/default-view/default-view.component';
import { StoreViewComponent } from './layout/store-view/store-view.component';

export function initStartUpAPIConfiugration(AppInitializationServiceServiceService:AppInitializationServiceServiceService){
  return ()=>{
    return AppInitializationServiceServiceService.initStartUpAPIConfiugration()
  }
}

export function initStartAppConfiugration(AppInitializationServiceServiceService:AppInitializationServiceServiceService){
  return ()=>{
    return AppInitializationServiceServiceService.initStartAppConfiugration()
  }
}
@NgModule({
  declarations: [
    AppComponent,
    AuthViewComponent,
    DefaultViewComponent,
    StoreViewComponent
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
  providers: [
    AppService,
    ApiService,
    NgbActiveModal,
    Title,
    Meta,
    {
      provide: APP_INITIALIZER,
      useFactory: initStartUpAPIConfiugration,
      deps: [AppInitializationServiceServiceService],
      multi: true, // Indicates that there can be multiple APP_INITIALIZER functions
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initStartAppConfiugration,
      deps: [AppInitializationServiceServiceService],
      multi: true, // Indicates that there can be multiple APP_INITIALIZER functions
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
