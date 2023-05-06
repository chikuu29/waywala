import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { AboutComponent } from './about/about.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SellOnWaywalaComponent } from './sell-on-waywala/sell-on-waywala.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "error",
    component: ErrorPageComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "profile",
    canActivate:[AuthenticationGuard],
    component: ProfileComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "sell-on-waywala",
    component: SellOnWaywalaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
