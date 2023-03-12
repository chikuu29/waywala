import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

import { ECommerceComponent } from './e-commerce/e-commerce.component';
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
    path:'my-cart',
    component:AddToCartComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
