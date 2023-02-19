import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/auth/authentication.guard';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { CheckStatusComponent } from './check-status/check-status.component';
import { KvksComponent } from './kvks/kvks.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { MycaseComponent } from './mycase/mycase.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

const routes: Routes = [
  { 
    path:'',
    component:AgricultureComponent
  },
  { 
    path:'check-status',
    component:CheckStatusComponent
  },
  {
    path:'check-status/:caseID',
    component:CheckStatusComponent

  },
  {
    path:'kvks',
    component:KvksComponent

  },
  { 
    path:'weather',
    component:WeatherForecastComponent
  },
  {
    path:'mycase',
    canActivate:[AuthenticationGuard],
    component:MycaseComponent

  },
  {
    path:'market-place',
    component:MarketPlaceComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgricultureRoutingModule { }
