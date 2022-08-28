import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
// import { ToastrModule, ToastrService } from 'ngx-toastr';
const routes: Routes = [
  {path:"login",component:LoginComponent,pathMatch:'full'},
  {path:"login:returnUrl",component:LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes),
    // ToastrModule.forRoot()
  ],
  providers:[]
})
export class AuthModule { }
