import { Component, OnInit } from '@angular/core';
import { ECommerceServicesService } from '../services/e-commerce-services.service';
import { Product } from '../product-section/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AddressManagementComponent } from 'src/app/shared/address-management/address-management.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss'],
})
export class OrderCheckoutComponent implements OnInit {

  public checkOutProductList: Product[] = []
  public activeStepperNumber: number = 1;
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'

  order_shipping_billing_address_details: any = {}
  selectedAddress:any
  constructor(
    private ecommerceServices: ECommerceServicesService,
    private router: Router,
    private app: AppService,
    private modalService: NgbModal,
    private ApiParameterScript:ApiParameterScript
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

    if (this.app.authStatus) {

      this.ApiParameterScript.fetchDataFormQuery(`SELECT *  FROM user_address WHERE user_ID='${this.app.authStatus.email}'`).subscribe((res: any) => {
        if (res.success && res['data'].length > 0) {
          //  console.log("hi",res);
          this.order_shipping_billing_address_details = JSON.parse(res['data'][0]['address_INFO'])

          console.log("Selected Address");
          res['data'].map((address: any) => {
            var data = JSON.parse(address['address_INFO'])
            var temp = []
            temp.push(data['name']);
            temp.push(data['address']);
            temp.push(data['landmark']);
            temp.push(data['original_phone'] + ',' + data['alternative_phone']);
            temp.push(data['locality']);
            temp.push(data['city']);
            temp.push(data['pin_code']);
            temp.push(data['state'].name);
            temp.push(data['country']);
            address['display_address_INFO'] = temp.join(",\n")
          })
          this.selectedAddress= res['data'][0]

        } else {
          console.log("no Address Found");
          // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
        }
      })
     

    }
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

  editAddress(){

    const option = { size: 'xl', scrollable: true }
    const modalRef = this.modalService.open(AddressManagementComponent, option);
    modalRef.componentInstance.isDirectOpenEditMode =true
    modalRef.componentInstance.edit(this.selectedAddress)
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
