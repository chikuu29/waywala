import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
    path: "**",
    redirectTo:"/pages/error",
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
