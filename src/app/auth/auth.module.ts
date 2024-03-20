import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AuthService } from './auth.service';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
// import { ToastrModule, ToastrService } from 'ngx-toastr';
const routes: Routes = [
  {path:"login",component:LoginComponent,pathMatch:'full'},
  {path:"register",component:RegisterComponent},
  {path:"login:returnUrl",component:LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    SharedModule,
    RouterModule.forChild(routes),
    // ToastrModule.forRoot()
  ]
})
export class AuthModule { }
