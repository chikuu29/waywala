import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgricultureComponent } from './agriculture/agriculture.component';
import { CheckStatusComponent } from './check-status/check-status.component';
import { MycaseComponent } from './mycase/mycase.component';

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
    path:'mycase',
    component:MycaseComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgricultureRoutingModule { }
