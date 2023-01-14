import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ECommerceComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    PrimengModule,
    FormsModule
  ]
})
export class ECommerceModule { }
