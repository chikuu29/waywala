import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: "auth",
    component: LoginComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "pages",
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path:"agriculture",
    loadChildren:()=>import ('./feature/agriculture/agriculture.module').then(m=>m.AgricultureModule)

  },
  {
    path:"education",
    loadChildren:()=>import ('./feature/education/education.module').then(m=>m.EducationModule)

  },
  {
    path:"e-commerce",
    loadChildren:()=>import ('./feature/e-commerce/e-commerce.module').then(m=>m.ECommerceModule)

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
