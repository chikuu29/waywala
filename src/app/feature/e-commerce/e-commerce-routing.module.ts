import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/auth/authentication.guard';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { CategoryViewComponent } from './category-view/category-view.component';
import { SearchItemViewComponent } from './search-item-view/search-item-view.component';

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
  {
    path:'order/confirmation/status/:orderID',
    canActivate:[AuthenticationGuard],
    component:OrderConfirmationComponent
  },
  {
    path:'order-details/:order_id/:product_id',
    canActivate:[AuthenticationGuard],
    component:OrderDetailsComponent
  },
  {
    path:'category/:category',
    component:CategoryViewComponent
  },
  {
    path:'search',
    component:SearchItemViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
