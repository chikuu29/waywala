import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../auth/authentication.guard';
import { AboutComponent } from './about/about.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
// import { RegisterComponent } from '../auth/register/register.component';
import { SellOnWaywalaComponent } from './sell-on-waywala/sell-on-waywala.component';
import { BecomeAgricultueInvestigratorComponent } from './become-agricultue-investigrator/become-agricultue-investigrator.component';
import { BecomeEducationTeacherComponent } from './become-education-teacher/become-education-teacher.component';
import { RefundPolicyComponent } from './refund-policy/refund-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsofserviceComponent } from './termsofservice/termsofservice.component';
import { MarketPlaceManagementComponent } from './market-place-management/market-place-management.component';
import { DetailsOfMarketInformationComponent } from './details-of-market-information/details-of-market-information.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { MyCoinZoneComponent } from '../shared/my-coin-zone/my-coin-zone.component';

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
    path: "profile",
    canActivate: [AuthenticationGuard],
    component: ProfileComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "sell-on-waywala",
    canActivate: [AuthenticationGuard],
    component: SellOnWaywalaComponent
  },

  {
    path: "become-agriculture-investigator",
    canActivate: [AuthenticationGuard],
    component: BecomeAgricultueInvestigratorComponent
  }
  , {
    path: "become-education-teacher",
    canActivate: [AuthenticationGuard],
    component: BecomeEducationTeacherComponent
  },
  {
    path: "refund-policy",
    component: RefundPolicyComponent
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicyComponent
  },
  {
    path: "termsofservice",
    component: TermsofserviceComponent
  },
  {
    path: "market_place_management",
    canActivate: [AuthenticationGuard],
    component: MarketPlaceManagementComponent
  },
  {
    path: 'details_of_market_price',
    component: DetailsOfMarketInformationComponent

  },
  {
    path: 'services',
    component: ServicesPageComponent

  },
  {
    path: 'mycoin',
    component: MyCoinZoneComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
