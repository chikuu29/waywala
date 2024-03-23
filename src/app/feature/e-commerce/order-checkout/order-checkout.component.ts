import { Component, OnInit } from '@angular/core';
import { ECommerceServicesService } from '../services/e-commerce-services.service';
import { Product } from '../product-section/product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { AddressManagementComponent } from 'src/app/shared/address-management/address-management.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { CheckOutProductOrder, priceDetails } from 'src/app/appInterface/checkOutProductOrder';
import _, { isNumber } from 'lodash';

@Component({
  selector: 'app-order-checkout',
  templateUrl: './order-checkout.component.html',
  styleUrls: ['./order-checkout.component.scss'],
})
export class OrderCheckoutComponent implements OnInit {

  public checkOutProductList: any[] = []
  public activeStepperNumber: number = 1;
  imageURL: string = 'https://admin.waywala.com/api/shop/images/'

  order_shipping_billing_address_details: any = {}
  selectedAddress: any
  order_price_details: priceDetails = {
    total_price: 0,
    final_price: 0,
    total_copun_discount: 0,
    total_mrp_price: 0
  }
  private orderCheckOutInfo: CheckOutProductOrder = {}
  isAddressSelected: boolean = false
  constructor(
    private ecommerceServices: ECommerceServicesService,
    private router: Router,
    private app: AppService,
    private modalService: NgbModal,
    private api: ApiParameterScript
  ) {
    this.imageURL = this.app.getAdminApiPath() + "/shop/images/";
  }

  ngOnInit(): void {

    this.ecommerceServices.checkoutItemList.subscribe((product_id) => {
      console.log("CheckOutProcutList", product_id);
      // product_id = "fe01ce2a7fbac8fafaed7c982a04e2295441678284309"
      if (product_id && product_id != '') {
        // this.checkOutProductList = checkOutProductList
        // this.orderCheckOutInfo.order_product_inventory=checkOutProductList

        this.getProduct(product_id);
      } else {
        Swal.fire({
          title: "Something Went Wrong",
          icon: "error",
          confirmButtonText: "GO TO CART",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          // if (result.isConfirmed) {
            this.router.navigateByUrl('/store/my/bag');
            // Swal.fire("Saved!", "", "success");
          // }
        });

      }
    })

    if (this.app.authStatus) {

      this.api.fetchDataFormQuery(`SELECT *  FROM user_address WHERE user_ID='${this.app.authStatus.email}'`).subscribe((res: any) => {
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
          this.selectedAddress = res['data'][0]
          this.order_shipping_billing_address_details=JSON.parse(res['data'][0]['address_INFO'])
          this.orderCheckOutInfo.order_biling_address = JSON.parse(res['data'][0]['address_INFO'])
          this.orderCheckOutInfo.order_shipping_address = JSON.parse(res['data'][0]['address_INFO'])
          this.isAddressSelected = true
        } else {
          console.log("no Address Found");
          this.isAddressSelected = false
          // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
        }
      })


    }
  }


  getProduct(product_id: string) {
    var query = `SELECT p.product_Shipped_Pincode,p.product_Has_Own_Delivery,p.product_Id,p.product_Name,p.product_Description,p.product_Mrp_Price,p.product_Selling_Price,p.product_Discoute_Percentage,p.product_Category,p.product_Quantity_Available,p.product_Seller_ID,p.product_Images,p.product_Expires,p.product_Created_Date,p.product_Live_Status, CAST(COALESCE(AVG(pr.product_Rating),0)AS INTEGER) AS product_AVG_Rating,COUNT(pr.product_Rating) AS product_Total_Rating FROM (SELECT * FROM e_commerce_product WHERE e_commerce_product.product_Live_Status='active' AND e_commerce_product.product_Id='${product_id}') p LEFT JOIN e_commerce_product_rating pr ON p.product_Id = pr.product_Id GROUP BY p.product_Id, p.product_name;`;

    this.api.fetchDataFormQuery(query).subscribe((res: any) => {
      if (res.success && res['data'].length > 0) {
        console.log(res);

        res.data.map((data: any) => {
          data['product_Images'] = data.product_Images.split(',');
        })

        this.checkOutProductList = res['data']
        this.createOrderCheckOutInfo();


      } else {

      }



    })

  }


  createOrderCheckOutInfo() {

    // const product=this.checkOutProductList
    this.orderCheckOutInfo['order_product_inventory'] = this.generateProductInventory(this.checkOutProductList)
    this.orderCheckOutInfo['order_price_details'] = this.calculateTotalProductPrice(this.checkOutProductList)
    this.orderCheckOutInfo['order_offer_details'] = this.generateOffer()
    console.log("final", this.orderCheckOutInfo);
    this.order_price_details = this.orderCheckOutInfo['order_price_details']
  }

  generateProductInventory(productList: any[]): any[] {
    _.map(productList, (product) => {

      product['order_quantity'] = product['order_quantity'] ? product['order_quantity'] : 1

    })

    return productList
  }


  appyCopun() {

    this.orderCheckOutInfo.order_copun_details = {
      copun_code: 'TEXT',
      copun_discount_price: 10
    }
    console.log("apply", this.orderCheckOutInfo);

    // const totalPrice = this.order_price_details.total_price ? this.order_price_details.total_price : 0
    this.order_price_details.total_copun_discount = 10
    // this.order_price_details.final_price = totalPrice - this.order_price_details.total_copun_discount
    // this.createOrderCheckOutInfo()
    this.updatePrice()
  }


  updatePrice() {

    try {
      var total_copun_discount = 0
      if (this.orderCheckOutInfo.order_copun_details) {
        total_copun_discount = isNumber(this.orderCheckOutInfo.order_copun_details.copun_discount_price) ? this.orderCheckOutInfo.order_copun_details.copun_discount_price : 0
      }
      var total_price = _.sumBy(this.checkOutProductList, (product: any) => product.product_Selling_Price * product.order_quantity)
      // var final_price = _.sumBy(productList, (product: any) => product.product_Selling_Price * product.order_quantity)
      console.log(total_copun_discount);
      var updatedPrice: priceDetails = {
        total_mrp_price: _.sumBy(this.checkOutProductList, (product: any) => product.product_Mrp_Price * product.order_quantity),
        total_copun_discount: total_copun_discount,
        total_price: isNumber(total_price) ? total_price : 0,
        final_price: total_price - total_copun_discount
      };
      this.order_price_details = updatedPrice
      this.orderCheckOutInfo.order_price_details = updatedPrice
    } catch (error) {
      console.log(error);

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
    console.log("place Order", this.orderCheckOutInfo);

    try {
      this.next()
    } catch (error) {
      console.log(error);

    }


  }

  confirmOrder() {
    console.log("confrimOrder", this.orderCheckOutInfo);

    if (this.isAddressSelected) {
        this.next()
    } else {
      Swal.fire('Warning', 'Please Select Address', 'warning')
    }

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
        this.selectedAddress=modalInstance.address
        this.order_shipping_billing_address_details=JSON.parse(modalInstance.address.address_INFO)
        this.orderCheckOutInfo.order_biling_address = JSON.parse(modalInstance.address.address_INFO)
        this.orderCheckOutInfo.order_shipping_address = JSON.parse(modalInstance.address.address_INFO)
        // console.log(modalInstance);
        this.isAddressSelected=true
      }
    }, (reason: any) => {
      this.isAddressSelected=false
      // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
      console.log(reason);

    })
  }

  editAddress() {

    const option = { size: 'xl', scrollable: true }
    const modalRef = this.modalService.open(AddressManagementComponent, option);
    modalRef.componentInstance.isDirectOpenEditMode = true
    modalRef.componentInstance.edit(this.selectedAddress)
    // modalRef.componentInstance.OtpType = "Email",
    // modalRef.componentInstance.otpSendTo = res.email
    modalRef.result.then((modalInstance: any) => {
      if (modalInstance.success) {

        // this.firstFormGroup.setValue({ isAddressAvailble: 'yes' })
        // this.order_shipping_billing_address_details = JSON.parse(modalInstance.address.address_INFO)
        // console.log(modalInstance);
        this.selectedAddress=modalInstance.address
        this.order_shipping_billing_address_details=JSON.parse(modalInstance.address.address_INFO)
        this.orderCheckOutInfo.order_biling_address = JSON.parse(modalInstance.address.address_INFO)
        this.orderCheckOutInfo.order_shipping_address = JSON.parse(modalInstance.address.address_INFO)
        // console.log(modalInstance);
        this.isAddressSelected=true


      }
    }, (reason: any) => {
      // this.firstFormGroup.setValue({ isAddressAvailble: 'no' })
      console.log(reason);

    })
  }


  stepUp(index: number) {


    if (this.checkOutProductList[index].product_Quantity_Available > this.checkOutProductList[index].order_quantity) {
      this.checkOutProductList[index].order_quantity += 1;
      this.updatePrice()
    }

  }
  stepDown(index: number) {
    if (1 < this.checkOutProductList[index].order_quantity) {
      this.checkOutProductList[index].order_quantity -= 1
      this.updatePrice()
    }

  }
  onChangeQuantity(event: any, index: number) {
    console.log("onChangeQuantity", this.checkOutProductList[index].order_quantity);
    try {


      if (this.checkOutProductList[index].order_quantity && this.checkOutProductList[index].order_quantity <= this.checkOutProductList[index].product_Quantity_Available) {


      } else {
        this.checkOutProductList[index].order_quantity = this.checkOutProductList[index].product_Quantity_Available
      }
      this.updatePrice()
    } catch (error) {
      console.log(error);

    }


  }



  private calculateTotalProductPrice(productList: Product[]): priceDetails {
    // console.log("calculasteTotalProductPrice", this.checkOutProductList);
    var total_copun_discount = 0
    if (this.orderCheckOutInfo.order_copun_details) {
      total_copun_discount = isNumber(this.orderCheckOutInfo.order_copun_details.copun_discount_price) ? this.orderCheckOutInfo.order_copun_details.copun_discount_price : 0
    }

    var total_price = _.sumBy(productList, (product: any) => product.product_Selling_Price * product.order_quantity)
    // var final_price = _.sumBy(productList, (product: any) => product.product_Selling_Price * product.order_quantity)

    return {
      total_mrp_price: _.sumBy(productList, (product: any) => product.product_Mrp_Price * product.order_quantity),
      total_copun_discount: total_copun_discount,
      total_price: isNumber(total_price) ? total_price : 0,
      final_price: total_price - total_copun_discount
    };

  }

  private generateOffer() {
    return {}
  }
  private generateOrderID() {
    const prefix = 'WORD';
    const date = new Date().toLocaleDateString('en-GB').replace(/\//g, ''); // Get today's date in ddmmyyyy format
    const randomNumber = Math.floor(Math.random() * new Date().getTime()); // Generate a 10-digit random number
    return prefix + date + randomNumber;
  }

  pay(payment_mode:string){
    console.log(payment_mode);
    if(this.isAddressSelected){

    }else{
      Swal.fire('Warning', 'Please Select Address', 'warning')
    }
    
  }
}
