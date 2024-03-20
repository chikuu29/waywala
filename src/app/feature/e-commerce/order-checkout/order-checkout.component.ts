import { Component, OnInit } from '@angular/core';
import { ECommerceServicesService } from '../services/e-commerce-services.service';
import { Product } from '../product-section/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {

  public checkOutProductList:Product[]=[]
  constructor(private ecommerceServices: ECommerceServicesService, private router: Router) { }

  ngOnInit(): void {

    this.ecommerceServices.checkoutItemList.subscribe((checkOutProductList: Product[]) => {
      console.log("CheckOutProcutList", checkOutProductList);
      if (checkOutProductList.length > 0) {
        this.checkOutProductList=checkOutProductList
      } else {
        Swal.fire({
          title: "Something Went Wrong",
          icon: "error",
          confirmButtonText: "GO TO CART",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.router.navigateByUrl('/store/my/bag');
            // Swal.fire("Saved!", "", "success");
          }
        });

      }
    })
  }

}
