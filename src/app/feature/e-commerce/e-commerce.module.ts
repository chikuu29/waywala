import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductService } from './all-product-list/productservice';
import { AllProductListComponent } from './all-product-list/all-product-list.component';
import { ProductDetailsPageComponent } from './product-details-page/product-details-page.component';
import { CupponDetailsComponent } from './cuppon-details/cuppon-details.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { ProductSectionComponent } from './product-section/product-section.component';
import { ECommerceServicesService } from './services/e-commerce-services.service';
import { EmptyCartComponent } from './empty-cart/empty-cart.component';
import { MyOrderComponent } from './my-order/my-order.component';


@NgModule({
  declarations: [
    ECommerceComponent,
    SearchBarComponent,
    AllProductListComponent,
    ProductDetailsPageComponent,
    CupponDetailsComponent,
    AddToCartComponent,
    ProductSectionComponent,
    EmptyCartComponent,
    MyOrderComponent
  ],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    PrimengModule,
    FormsModule,
    MaterialModule
  ],
  exports:[
    AllProductListComponent,
    ProductSectionComponent
  ],
  providers:[ProductService]
})
export class ECommerceModule { }
