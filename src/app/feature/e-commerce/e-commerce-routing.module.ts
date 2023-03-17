import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/auth/authentication.guard';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';

const routes: Routes = [
  { 
    path:'',
    component:ECommerceComponent
  },
  {
    path:'product/:productID',
    component:ProductDetailsPageComponent
  },
  {
    path:'my/bag',
    canActivate:[AuthenticationGuard],
    component:AddToCartComponent
  },
  {
    path:'my/order',
    canActivate:[AuthenticationGuard],
    component:MyOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
