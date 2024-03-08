import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MyCoinZoneComponent } from './shared/my-coin-zone/my-coin-zone.component';
import { AuthenticationGuard } from './auth/authentication.guard';
import { DefaultViewComponent } from './layout/default-view/default-view.component';
import { AuthViewComponent } from './layout/auth-view/auth-view.component';
import { StoreViewComponent } from './layout/store-view/store-view.component';
const routes: Routes = [
  {
    path: '',
    
    children:[
      {
        path:'',
        component:DefaultViewComponent,
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
      {
        path:"agriculture",
        component:DefaultViewComponent,
        loadChildren:()=>import ('./feature/agriculture/agriculture.module').then(m=>m.AgricultureModule)
    
      },
      {
        path: "auth",
        component: AuthViewComponent,
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path:"education",
        component:DefaultViewComponent,
        loadChildren:()=>import ('./feature/education/education.module').then(m=>m.EducationModule)
    
      },
      {
        path:"store",
        component:StoreViewComponent,
        loadChildren:()=>import ('./feature/e-commerce/e-commerce.module').then(m=>m.ECommerceModule)
    
      }
    ]
  },
  
  // {
  //   path: "pages",
  //   component:DefaultViewComponent,
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  // },
 
  
  {
    path:'mycoin',
    canActivate:[AuthenticationGuard],
    component:MyCoinZoneComponent
  },
  {
    path: "**",
    redirectTo:"/pages/error",
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
