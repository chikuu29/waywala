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
import { AgricultureProductPageComponent } from './agriculture-product-page/agriculture-product-page.component';
import { AgricultureProductPageCategoryComponent } from './agriculture-product-page-category/agriculture-product-page-category.component';
import { OfferComponent } from './offer/offer.component';
import { CategorySubcategoryProductComponent } from './category-subcategory-product/category-subcategory-product.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';

const routes: Routes = [

  {

    path:'',
    children:[

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
        path:'track-order/:order_id/:product_id',
        canActivate:[AuthenticationGuard],
        component:OrderDetailsComponent
      },
      {
        path:'category/:category',
        component:CategoryViewComponent
      },
      {
        path:'category/:category/subcategory/:subcategory',
        // pathMatch:'full',
        component:CategorySubcategoryProductComponent
      },
      {
        path:'search',
        component:SearchItemViewComponent
      },
      {
        path:'agriculture/product',
        component:AgricultureProductPageComponent
      },
      {
        path:'agriculture/product/:category',
        // pathMatch:'full',
        component:AgricultureProductPageCategoryComponent
      },
      {
        path:'my-offer',
        component:OfferComponent
    
      },
      {
        path:'checkout',
        canActivate:[AuthenticationGuard],
        component:OrderCheckoutComponent
    
      }
    ]

  }
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
