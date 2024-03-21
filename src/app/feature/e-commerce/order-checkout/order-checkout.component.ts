import { Component, OnInit } from '@angular/core';
import { ECommerceServicesService } from '../services/e-commerce-services.service';
import { Product } from '../product-section/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AddressManagementComponent } from 'src/app/shared/address-management/address-management.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss']
})
export class OrderCheckoutComponent implements OnInit {

  public checkOutProductList: Product[] = []
  public activeStepperNumber: number = 1;

  imageURL: string = 'https://admin.waywala.com/api/shop/images/'
  constructor(
    private ecommerceServices: ECommerceServicesService,
    private router: Router,
    private app: AppService,
    private modalService: NgbModal
  ) {
    this.imageURL = this.app.getAdminApiPath() + "/shop/images/";
  }

  ngOnInit(): void {

    this.ecommerceServices.checkoutItemList.subscribe((checkOutProductList: Product[]) => {
      console.log("CheckOutProcutList", checkOutProductList);
      if (checkOutProductList.length > 0) {
        this.checkOutProductList = checkOutProductList
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

  activeStepper(index: any) {

    this.activeStepperNumber = index
    //  console.log();

    //   const ref = document.getElementById('wizard-checkout-form')
    //  console.log(ref);

  }


  next() {
    if (this.activeStepperNumber < 5) {
      this.activeStepperNumber += 1
    } else {
      this.activeStepperNumber = 1
    }
  }
  placeorder() {
    console.log("place Order");
    this.next()

  }

  addAddress() {

    const option = { size: 'xl', scrollable: true }
    const modalRef = this.modalService.open(AddressManagementComponent, option);
    // modalRef.componentInstance.modalTitle = res.name;
    // modalRef.componentInstance.OtpType = "Email",
    // modalRef.componentInstance.otpSendTo = res.email

    modalRef.result.then((modalInstance: any) => {
      if (modalInstance.success) {

        // this.firstFormGroup.setValue({ isAddressAvailble: 'yes' })
        // this.order_shipping_billing_address_details = JSON.parse(modalInstance.address.address_INFO)
        console.log(modalInstance);


      }
    }, (reason: any) => {
      // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
      console.log(reason);

    })
  }
}
